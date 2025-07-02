import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    externalId: v.string(), // Clerk's user ID
  })
    .index("byExternalId", ["externalId"])
    .index("byName", ["name"]),

  clothes: defineTable({
    description: v.string(),
    price: v.number(),
    alt: v.string(),
    image: v.id("_storage"), // Stores the image in Convex storage
  }),

  cart: defineTable({
    orderedBy: v.id("users"),
    items: v.array(
      v.object({
        itemId: v.id("clothes"),
        quantity: v.number(),
        status: v.union(
          v.literal("pending"),
          v.literal("paid"),
          v.literal("shipped"),
          v.literal("delivered"),
          v.literal("cancelled")
        ),
      })
    ),

    totalPrice: v.number(),
  }).index("byOrderedBy", ["orderedBy"]),
  allOrders: defineTable({
    orderId: v.id("cart"),
  }),

  specialRequest: defineTable({
    image: v.id("_storage"), 
    description: v.string(),
    requestedBy: v.id("users"),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    ),
  })
    .index("byRequestedBy", ["requestedBy"])
    .index("byStatus", ["status"]),
});
