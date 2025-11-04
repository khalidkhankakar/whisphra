import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import messagesTable from "./message.model";

const messageAttachmentsTable = pgTable('messageAttachments', {
    id: uuid('id').primaryKey().defaultRandom(),
    messageId: uuid('messageId').notNull().references(() => messagesTable.id, { onDelete: 'cascade' }),
    fileName: varchar('fileName', { length: 255 }).notNull(),
    fileUrl: varchar('fileUrl').notNull(),
    fileType: varchar('fileType', { length: 100 }),
    fileSize: integer('fileSize'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const messageAttachmentsRelations = relations(messageAttachmentsTable, ({ one }) => ({
    message: one(messagesTable, {
        fields: [messageAttachmentsTable.messageId],
        references: [messagesTable.id],
    }),
}));


export default messageAttachmentsTable;