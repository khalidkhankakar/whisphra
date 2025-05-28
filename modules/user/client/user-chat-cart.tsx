import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserType } from '@/drizzle/models/user.model'
import Link from 'next/link'
import React from 'react'

interface Props {
    id: string
    name: string
    email: string
    image?: string | null
}
// Todo fix all types
const UserChatCard = ({ id, name, email, image }: Props) => {
    return (
        <Link href={`/chat/${id}`} className="flex items-center gap-x-2 p-2 bg-slate-200 rounded-2xl  hover:bg-slate-100 cursor-pointer">
            {/* Avatar */}
            <Avatar>
                <AvatarImage src={image || ''} alt={name || 'user'} />
                <AvatarFallback >{name?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-semibold">{name}</span>
                <span className="text-sm text-gray-500">{email}</span>
            </div>
        </Link>
    )
}

export default UserChatCard
