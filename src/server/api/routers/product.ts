import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import type { ColorType, StorageType } from "@/types";
export const productRouter = createTRPCRouter({
  addProduct: protectedProcedure
    .input(
      z.object({
        title: z.string().optional().nullish(),
        image: z.string().optional().nullish(),
        brand: z.string().optional().nullish(),
        description: z.string().optional().nullish(),
        price: z.number().optional().nullish(),
        storage: z
          .object({
            storage: z.string().nullable(),
            price: z.number().nullable(),
            totalQty: z.number().nullable(),
          })
          .array(),
        color: z
          .object({
            color: z.string().nullable(),
            colorCode: z.string().nullable(),
            image: z.string().nullable(),
            price: z.number().nullable(),
            totalQty: z.number().nullable(),
          })
          .array(),
        category: z
          .object({
            name: z.string(),
          })
          .array(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        title,
        image,
        description,
        price,
        brand,
        storage,
        color,
        category,
        published,
      } = input;
      const result = await ctx.prisma.product.create({
        data: {
          title,
          image,
          description,
          price,
          brand,
          published,
          user: {
            connect: {
              id: ctx?.session?.user.id,
            },
          },
          storage: {
            create: storage?.map(
              ({ storage, price, totalQty }: StorageType) => {
                return {
                  storage,
                  price,
                  totalQty,
                };
              }
            ),
          },
          color: {
            create: color?.map(
              ({ color, colorCode, image, price, totalQty }: ColorType) => {
                return { color, colorCode, image, price, totalQty };
              }
            ),
          },
          category: {
            connectOrCreate: category?.map(({ name }: { name: string }) => {
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
          brand: true,
          price: true,
          image: true,
          description: true,
          published: true,
          category: true,
          color: true,
          storage: true,
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
      select: {
        id: true,
        title: true,
        price: true,
        image: true,
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 13,
    });
    return result;
  }),
  getRecrentProduct: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.product.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        title: true,
        price: true,
        image: true,
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
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
