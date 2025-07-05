import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { getCurrentUserOrThrow, requireAdmin } from "./users";
import { Doc, Id } from "./_generated/dataModel";

type EnrichedSpecialRequest = Omit<
  Doc<"specialRequests">,
  "requestedBy" | "image"
> & {
  image: string; // This will be the image URL, not the storage ID
  description: string;
  status: "pending" | "approved" | "rejected";
  requestedBy: {
    _id: Id<"users">;
    name: string;
    email: string;
    imageUrl: string;
  };
};

export const create = mutation({
  args: {
    image: v.id("_storage"),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    if (!user) {
      throw new ConvexError(
        "Unauthorized! You must be logged in to create a special request. 😒"
      );
    }
    await ctx.db.insert("specialRequests", {
      image: args.image,
      description: args.description,
      requestedBy: user._id,
      status: "pending",
    });
  },
});

export const getEnrichedSpecialRequest = query({
  args: {
    requestId: v.id("specialRequests"),
  },
  handler: async (ctx, args): Promise<EnrichedSpecialRequest> => {
    // Get the current user
    const user = await getCurrentUserOrThrow(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized! You must be logged in to view this special request.");
    }

    // Fetch the special request
    const specialRequest = await ctx.db.get(args.requestId);
    if (!specialRequest) {
      throw new ConvexError("Special request not found.");
    }

    // Verify the user is authorized to view this request
    if (specialRequest.requestedBy !== user._id) {
      throw new ConvexError(
        "Unauthorized: You can only view your own special requests."
      );
    }

    // Fetch the user details for the request
    const requestUser = await ctx.db.get(specialRequest.requestedBy);
    if (!requestUser) {
      throw new ConvexError("User associated with this request not found.");
    }

    // Fetch the image URL from storage
    const imageUrl = await ctx.storage.getUrl(specialRequest.image);
    if (!imageUrl) {
      throw new ConvexError("Image not found in storage.");
    }

    // Construct and return the enriched special request
    return {
      _id: specialRequest._id,
      _creationTime: specialRequest._creationTime,
      image: imageUrl,
      description: specialRequest.description,
      status: specialRequest.status,
      requestedBy: {
        _id: requestUser._id,
        name: requestUser.name,
        email: requestUser.email,
        imageUrl: requestUser.imageUrl,
      },
    };
  },
});

export const getMyEnrichedSpecialRequests = query({
  args: {},
  handler: async (ctx): Promise<EnrichedSpecialRequest[]> => {
    // Get the current user
    const user = await getCurrentUserOrThrow(ctx);


    // Fetch all special requests for the user using the index
    const specialRequests = await ctx.db
      .query("specialRequests")
      .withIndex("byRequestedBy", (q) => q.eq("requestedBy", user._id))
      .collect();

    // Map over the requests to enrich them with user data and image URLs
    const enrichedRequests = await Promise.all(
      specialRequests.map(async (request) => {
        // Fetch the user details
        const requestUser = await ctx.db.get(request.requestedBy);
        if (!requestUser) {
          throw new ConvexError(`User not found for request ${request._id}`);
        }

        // Fetch the image URL from storage
        const imageUrl = await ctx.storage.getUrl(request.image);
        if (!imageUrl) {
          throw new ConvexError(`Image not found for request ${request._id}`);
        }

        return {
          _id: request._id,
          _creationTime: request._creationTime,
          image: imageUrl,
          description: request.description,
          status: request.status,
          requestedBy: {
            _id: requestUser._id,
            name: requestUser.name,
            email: requestUser.email,
            imageUrl: requestUser.imageUrl,
          },
        };
      })
    );

    return enrichedRequests;
  },
});

export const getAllEnrichedSpecialRequests = query({
  args: {},
  handler: async (ctx): Promise<EnrichedSpecialRequest[]> => {
    // 1. Authorize the user as an admin first.
    // If the user is not an admin, this will throw an error and stop execution.
    await requireAdmin(ctx);

    // 2. Fetch all special requests from the database.
    const specialRequests = await ctx.db.query("specialRequests").collect();

    // 3. Enrich the requests with user details and image URLs.
    // This logic is similar to your getMyEnrichedSpecialRequests function.
    const enrichedRequests = await Promise.all(
      specialRequests.map(async (request) => {
        // Fetch the user who made the request
        const requestUser = await ctx.db.get(request.requestedBy);
        if (!requestUser) {
          // It's good practice to handle cases where a user might have been deleted
          throw new ConvexError(`User not found for request ${request._id}`);
        }

        // Fetch the image URL from storage
        const imageUrl = await ctx.storage.getUrl(request.image);
        if (!imageUrl) {
          throw new ConvexError(`Image not found for request ${request._id}`);
        }

        // Construct the enriched object
        return {
          _id: request._id,
          _creationTime: request._creationTime,
          image: imageUrl,
          description: request.description,
          status: request.status,
          requestedBy: {
            _id: requestUser._id,
            name: requestUser.name,
            email: requestUser.email,
            imageUrl: requestUser.imageUrl,
          },
        };
      })
    );

    return enrichedRequests;
  },
});

export const getUserIdentity = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated: No user identity found.");
    }
    return identity;
  },  
})