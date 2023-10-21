import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    // return ctx.db.query.post.findMany({ orderBy: desc(schema.post.id) });
    return [
      {
        id: 1,
        title: "title",
        content: "content",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.post)
      //   .where(eq(schema.post.id, input.id));

      // return ctx.db.query.post.findFirst({
      //   where: eq(schema.post.id, input.id),
      // });
      return {
        id: 1,
        title: "title",
        content: "content",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return {
        id: 1,
        title: "title",
        content: "content",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      // return ctx.db.insert(schema.post).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return {
      id: 1,
      title: "title",
      content: "content",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // return ctx.db.delete(schema.post).where(eq(schema.post.id, input));
  }),
});
