import React from 'react'

interface Props {
    params: Promise<{ id: string }>
}

const page = async ({ params }: Props) => {

    const { id } = await params;

    return (
        <div className="h-full w-full flex items-center justify-center">
            user chat {id}
        </div>
    )
}

export default page
