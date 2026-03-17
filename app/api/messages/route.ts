import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prisma";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { message, image, conversationId } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                sender: true,
                seen: true,
            }
        })
        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        });
        await pusherServer.trigger(conversationId, 'messages:new', newMessage);

        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

        await Promise.all(updatedConversation.users.map(async (user) => {
            if (!user.email) {
                return null;
            }

            return pusherServer.trigger(user.email, 'conversation:update', {
                ...updatedConversation,
                messages: [lastMessage]
            });
        }));



        return NextResponse.json(newMessage);

    } catch (error: any) {
        console.error('MESSAGES_POST_ERROR:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}