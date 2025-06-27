import { mutation } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

export const create = mutation({
  args: {
    image: v.id("_storage"),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized! You must be logged in to create a special request. 😒");
    }
    await ctx.db.insert("specialRequests", {
      image: args.image,
      description: args.description,
      requestedBy: user._id,
      status: "pending",
    });
  }
})