'use client'

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {

    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { conversationId } = useConversation();
    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
            .catch((error) => {
                console.log(error);
            })
    }, [conversationId]);

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });

        pusherClient.bind('messages:new', (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`)
            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current;
                }
                return [...current, message];
            });
            bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
        })

        pusherClient.bind('message:update', (message: FullMessageType) => {
            setMessages((current) => current.map((m) => m.id === message.id ? message : m));
        })

        return () => {
            pusherClient.unbind('messages:new');
            pusherClient.unbind('message:update');
            pusherClient.unsubscribe(conversationId);
        }
    }, [conversationId]);

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox
                    key={message.id}
                    data={message}
                    isLast={i === messages.length - 1}
                />
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
    )
}

export default Body