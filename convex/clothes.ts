import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutations
export const uploadCloth = mutation({
  args: {
    alt: v.string(),
    description: v.string(),
    price: v.string(),
    image: v.string(),
    storageId: v.id("_storage"),
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

// Queries
export const getClothes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clothes").collect();
  },
});
