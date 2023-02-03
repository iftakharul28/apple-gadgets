import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { encodePassword } from "@/lib/bcrypt";
export const userRouter = createTRPCRouter({
  Adduser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        passWord: z.string().min(4).max(12),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, passWord } = input;
      const password = await encodePassword(passWord);
      const result = await ctx.prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      return result;
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().optional().nullish(),
        email: z.string().email().optional().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, id, email } = input;
      const result = await ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
        },
      });

      return result;
    }),
  getSingleUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return await ctx.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    }),
});
