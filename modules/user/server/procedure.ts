import { TRPCError } from "@trpc/server";

import { usersTable } from "@/drizzle/models";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const userRouter = createTRPCRouter({

  getAllUsers: baseProcedure.query(async ({ ctx }) => {
    try {
      const users = await ctx.db.select().from(usersTable);
      return users;
    }
    catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
      });
    }
  }),

});
