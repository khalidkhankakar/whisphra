import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import chatParticipantsTable from "./chat-participants.model";
import chatsTable from "./chat.model";
import messagesTable from "./message.model";

const usersTable = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name"),
  email: varchar("email").unique(),
  password: varchar("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image"),
  provider: varchar("provider").notNull(),
  providerAccountId: varchar("providerAccountId").notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  sentMessages: many(messagesTable),
  chatParticipants: many(chatParticipantsTable),
  createdChats: many(chatsTable),
}));


// export type UserType = typeof usersTable.$inferSelect;

export default usersTable;
