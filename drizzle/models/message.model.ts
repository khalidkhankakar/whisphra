import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import chatsTable from "./chat.model";
import messageAttachmentsTable from "./message-attachments.model";
import usersTable from "./user.model";


const messageTypeEnum = pgEnum('messageType', ['text', 'image', 'file', 'audio', 'video', 'system']);



const messagesTable = pgTable('messages', {
    id: uuid('id').primaryKey().defaultRandom(),
    chatId: uuid('chatId').notNull().references(() => chatsTable.id, { onDelete: 'cascade' }),
    senderId: uuid('senderId').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    content: varchar('content'),
    messageType: messageTypeEnum('messageType').default('text'),
    isEdited: boolean('isEdited').default(false),
    isDeleted: boolean('isDeleted').default(false),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});

export const messagesRelations = relations(messagesTable, ({ one, many }) => ({
    chat: one(chatsTable, {
        fields: [messagesTable.chatId],
        references: [chatsTable.id],
    }),
    sender: one(usersTable, {
        fields: [messagesTable.senderId],
        references: [usersTable.id],
    }),
    attachments: many(messageAttachmentsTable),
}));

export default messagesTable;