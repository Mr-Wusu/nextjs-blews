import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  if (!event) {
    console.error("Invalid webhook request");
    return new Response("Invalid request", { status: 400 });
  }

  console.log(`Received webhook event: ${event.type}`, {
    clerkId: event.data.id,
  });

  try {
    switch (event.type) {
      case "user.created":
        const firstName = event.data.first_name || "";
        const lastName = event.data.last_name || "";
        await ctx.runMutation(internal.users.createUser, {
          clerkId: event.data.id,
          email: event.data.email_addresses[0]?.email_address || "",
          imageUrl: event.data.image_url || "",
          name: `${firstName} ${lastName}`.trim() || "Unknown User",
        });
        break;
      case "user.deleted":
        await ctx.runMutation(internal.users.deleteUser, {
          clerkId: event.data.id as string,
        });
        break;
      default:
        console.warn(`Unhandled webhook event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`Error processing webhook event ${event.type}:`, error);
    // Return 200 to prevent Clerk from retrying, as the error is logged
    return new Response(null, { status: 200 });
  }

  return new Response(null, { status: 200 });
});

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: handleClerkWebhook,
});

const validateRequest = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("CLERK_WEBHOOK_SECRET is not defined");
    throw new Error("CLERK_WEBHOOK_SECRET is not defined");
  }

  const payloadString = await req.text();
  const headerPayload = req.headers;
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id") || "",
    "svix-timestamp": headerPayload.get("svix-timestamp") || "",
    "svix-signature": headerPayload.get("svix-signature") || "",
  };

  // Check for missing headers
  if (
    !svixHeaders["svix-id"] ||
    !svixHeaders["svix-timestamp"] ||
    !svixHeaders["svix-signature"]
  ) {
    console.error("Missing Svix headers", svixHeaders);
    return undefined;
  }

  try {
    const wh = new Webhook(webhookSecret);
    const event = wh.verify(
      payloadString,
      svixHeaders
    ) as unknown as WebhookEvent;
    if (!event.data.id) {
      console.error("Webhook event missing clerkId", event);
      return undefined;
    }
    return event;
  } catch (error) {
    console.error("Error verifying webhook signature:", error);
    return undefined;
  }
};

export default http;