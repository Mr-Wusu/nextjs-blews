import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  clothes: defineTable({
    description: v.string(),
    price: v.number(),
    alt: v.string(),
    image: v.id("_storage"), // Stores the image in Convex storage
  }),
});

