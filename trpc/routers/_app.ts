import { authRouter } from "@/modules/auth/server/procedure";
import { userRouter } from "@/modules/user/server/procedure";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
