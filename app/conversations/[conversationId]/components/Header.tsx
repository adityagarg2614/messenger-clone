'use client'

import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useMemo } from "react";
import Avatar from "@/app/components/Avatar";
import Link from "next/link";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);
    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }
        return 'Active';
    }, [conversation])
    return (
        <div className="bg-white w-full flex border-b sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
                <Link href="/conversations" className="lg:hidden hover:text-sky-500 transition cursor-pointer">
                    <HiChevronLeft size={32} />
                </Link>
                <Avatar user={otherUser} />
                <div className="flex flex-col">
                    <div className="text-lg font-semibold text-neutral-800">
                        {conversation.name || otherUser.name}
                    </div>
                    <div className="text-sm font-light text-neutral-500">
                        {statusText}
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal size={32} onClick={() => { }} className="text-sky-500 cursor-pointer hover:text-sky-600 transition" />
        </div>
    )
}

export default Header;