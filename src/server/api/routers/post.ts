import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const posts = await ctx.db.post.findMany();
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Unable to fetch posts during SSR");
    }
  }),
  test: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany();
  }),
   getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany();
  }),
});
