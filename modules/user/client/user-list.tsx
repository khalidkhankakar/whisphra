'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import UserChatCard from './user-chat-cart';


const UserList = ({ }) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.user.getAllUsers.queryOptions());
    return (
        <div className="flex flex-col gap-y-2">

            {data.map((user) => (
                // Todo fix all types
                <UserChatCard key={user.id} id={user.id} name={user.name || ""} email={user.email || ""} image={user.image} />
            ))}

        </div>
    )
}

export default UserList


// user loading skeleton
export const UserListSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-x-2 p-2 rounded-md bg-slate-300 dark:bg-gray-700"
                >
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col gap-y-1">
                        <Skeleton className="w-32 h-4 rounded" />
                        <Skeleton className="w-24 h-3 rounded" />
                    </div>
                </div>
            ))}
        </div>
    )
}