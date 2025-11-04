import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import chatParticipantsTable from "./chat-participants.model";
import messagesTable from "./message.model";
import usersTable from "./user.model";


const chatTypeEnum = pgEnum('chatType', ['DIRECT', 'GROUP'])

const chatsTable = pgTable('chats', {
    id: uuid('id').primaryKey().defaultRandom(),
    chatType: chatTypeEnum('chatType').notNull().default('DIRECT'),
    name: varchar('name', { length: 100 }),
    avatarUrl: varchar('avatarUrl'),
    createdBy: uuid('createdBy').references(() => usersTable.id, { onDelete: 'set null' }),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
})

export const chatsRelations = relations(chatsTable, ({ one, many }) => ({
    creator: one(usersTable, {
        fields: [chatsTable.createdBy],
        references: [usersTable.id],
    }),
    participants: many(chatParticipantsTable),
    messages: many(messagesTable)
}));



export default chatsTable;