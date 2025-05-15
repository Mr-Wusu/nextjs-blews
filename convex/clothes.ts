import { v} from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "@/convex/_generated/dataModel";

// Mutations
export const uploadCloth = mutation({
  args: {
    alt: v.string(),
    description: v.string(),
    price: v.number(),
    image: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    console.log("This TypeScript function is running on the server.");
    await ctx.db.insert("clothes", {
      alt: args.alt,
      description: args.description,
      price: args.price,
      image: args.image,
    });
  },
});

export const deleteFile = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.storageId);
  },
});

// In clothes.ts
export const updateCloth = mutation({
    args: {
        _id: v.id("clothes"),
        alt: v.optional(v.string()),
        description: v.optional(v.string()),
        price: v.optional(v.number()),
        image: v.optional(v.id("_storage")),
        oldImageStorageId: v.optional(v.id("_storage")), // Add this
    },
    handler: async (ctx, args) => {
        const { _id, oldImageStorageId, image, ...rest } = args;

        const updates: {
            alt?: string;
            description?: string;
            price?: number;
            image?: Id<"_storage">;
        } = { ...rest };

        if (image) {
            updates.image = image;
        }

        await ctx.db.patch(_id, updates);

        if (oldImageStorageId) {
            try {
                await ctx.storage.delete(oldImageStorageId);
            } catch (error) {
                console.error("Error deleting old image:", error);
                //  Handle the error appropriately (e.g., log it, but don't crash the update)
            }
        }
    },
});



// Queries

export const getClothes = query({
    args: {},
    handler: async (ctx) => {
        const clothes = await ctx.db.query("clothes").collect();
        return Promise.all(
            clothes.map(async (cloth) => ({
                ...cloth,
                imageUrl: await ctx.storage.getUrl(cloth.image),
                storageId: cloth.image, //  Include the storageId here
            }))
        );
    },
});