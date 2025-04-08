import { mutation, internalMutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// User(s)
export const createUser = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("This TypeScript function is running on the server.");
    await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      clerkId: args.clerkId,
      imageUrl: args.imageUrl,
    });
  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});


// Cloth(es)
export const uploadCloth = mutation({
  args: {
    alt: v.string(),
    description: v.string(),
    price: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("This TypeScript function is running on the server.");
    await ctx.db.insert("clothes", {
      alt: args.alt,
      body: args.description,
      price: args.price,
      image: args.image,
    });
  },
});
