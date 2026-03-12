'use client'


import { FullConversationType } from "@/app/types"



interface ConversationListProps {
    initialItems: FullConversationType[]
}
const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
    return (
        <div>
            <div className="px-5">
                <div className="flex justify-between mb-4 pt-4">
                    <div className="text-2xl font-bold text-neutral-800">
                        Messages
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationList