import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import type { Category, Variant } from "@prisma/client";
export const productRouter = createTRPCRouter({
  addProduct: protectedProcedure
    .input(
      z.object({
        title: z.string().optional().nullish(),
        image: z.string().optional().nullish(),
        description: z.string().optional().nullish(),
        price: z.number().optional().nullish(),
        variant: z.any().optional(),
        category: z.any().optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, image, description, price, variant, category, published } =
        input;
      const result = await ctx.prisma.product.create({
        data: {
          title,
          image,
          description,
          price,
          published,
          user: {
            connect: {
              id: ctx?.session?.user.id,
            },
          },
          variants: {
            create: variant?.map(
              ({
                color,
                size,
                image,
                colorCode,
                storage,
                price,
                totalQty,
                brand,
              }: Variant) => {
                return {
                  color,
                  colorCode,
                  storage,
                  size,
                  image,
                  price,
                  totalQty,
                  brand,
                };
              }
            ),
          },
          category: {
            connectOrCreate: category?.map(({ name }: Category) => {
              return {
                create: {
                  name,
                },
                where: {
                  name,
                },
              };
            }),
          },
        },
      });

      return result;
    }),
  removePost: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const item = await ctx.prisma.product.delete({
        where: {
          id,
        },
      });
      return item;
    }),
  getProduct: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.product.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    return result;
  }),
  getDetailsProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.prisma.product.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          price: true,
          image: true,
          description: true,
          published: true,
          category: true,
          variants: {
            select: {
              id: true,
              color: true,
              colorCode: true,
              image: true,
              size: true,
              storage: true,
              price: true,
              totalQty: true,
              brand: true,
            },
          },
        },
      });
    }),
  getSingleProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.prisma.product.findUnique({
        where: {
          id,
        },
      });
    }),
  updateSingleProduct: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        title: z.string().optional().nullish(),
        description: z.string().optional().nullish(),
        price: z.number().optional().nullish(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, title, description, price, published } = input;
      return await ctx.prisma.product.update({
        where: {
          id,
        },
        data: { title, description, price, published },
      });
    }),
  getLatestProduct: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.product.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 13,
    });
    return result;
  }),
  getPageProduct: publicProcedure
    .input(
      z.object({
        page: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page } = input;
      const take = 10;
      const data = await ctx.prisma.product.findMany({
        take,
        skip: (+page - 1 || 0) * take,
        orderBy: {
          createdAt: "desc",
        },
      });
      const total = await ctx.prisma.product.count();
      const meta = {
        currentPage: Number(page),
        total,
        totalPage: Math.ceil(total / take),
      };
      return { data, meta };
    }),
});
