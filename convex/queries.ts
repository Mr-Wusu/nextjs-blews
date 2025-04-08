import { query } from "./_generated/server";


// User(s)
export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});


// Clothes
export const getClothes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clothes").collect();
  },
});

