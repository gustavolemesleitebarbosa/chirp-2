import { clerkClient, type User } from "@clerk/nextjs/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    imageUrl: user.imageUrl,
  };
};

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
    });
    const client = await clerkClient();
    const users = await client.users
      .getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
      })
      .then((users) => users.data.map(filterUserForClient));
    return posts.map((post) => ({
      post,
      author: users.find((user) => user.id === post.authorId),
    }));
  }),
});
