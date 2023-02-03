import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { productRouter } from "./routers/product";
import { categoryRouter } from "./routers/category";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  product: productRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
