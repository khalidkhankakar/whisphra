import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import chatsTable from "./chat.model";
import usersTable from "./user.model";



const participantRoleEnum = pgEnum('participantRole', ['admin', 'member']);

const chatParticipantsTable = pgTable('chatParticipants', {
    id: uuid('id').primaryKey().defaultRandom(),
    chatId: uuid('chatId').notNull().references(() => chatsTable.id, { onDelete: 'cascade' }),
    userId: uuid('userId').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
    participantRole: participantRoleEnum('participantRole').default('member'),
    joinedAt: timestamp('joinedAt').defaultNow().notNull(),
    lastReadAt: timestamp('lastReadAt'),
    isMuted: boolean('isMuted').default(false),
    isArchived: boolean('isArchived').default(false),
});


export const chatParticipantsRelations = relations(chatParticipantsTable, ({ one }) => ({
    chat: one(chatsTable, {
        fields: [chatParticipantsTable.chatId],
        references: [chatsTable.id],
    }),
    user: one(usersTable, {
        fields: [chatParticipantsTable.userId],
        references: [usersTable.id],
    }),
}));

export default chatParticipantsTable;
