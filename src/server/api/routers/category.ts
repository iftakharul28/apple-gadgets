import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  addCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      return await ctx.prisma.category.create({
        data: { name },
      });
    }),
  getCategory: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany();
  }),
  getCategoryPost: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        product: {
          orderBy: {
            createdAt: "desc",
          },
          where: {
            published: true,
          },
        },
      },
    });
  }),
  getSingleCategory: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.prisma.category.findFirst({
        where: {
          id,
        },
      });
    }),
  updateCategory: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name } = input;
      return await ctx.prisma.category.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }),
  getListPost: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.prisma.category.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          product: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
    }),
  removeCategory: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const item = await ctx.prisma.category.delete({
        where: {
          id,
        },
      });
      return item;
    }),

  getPageCategory: publicProcedure
    .input(
      z.object({
        page: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page } = input;
      const take = 10;
      const data = await ctx.prisma.category.findMany({
        take,
        skip: (+page - 1 || 0) * take,
        orderBy: {
          createdAt: "desc",
        },
      });
      const total = await ctx.prisma.category.count();
      const meta = {
        currentPage: Number(page),
        total,
        totalPage: Math.ceil(total / take),
      };
      return { data, meta };
    }),
});
