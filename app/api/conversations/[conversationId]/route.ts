import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    conversationId: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true
            }
        });
        if (!existingConversation) {
            return new NextResponse("Conversation not found", { status: 404 });
        }
        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });
        return NextResponse.json(deletedConversation);
    } catch (error: any) {
        console.error("Error deleting conversation:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}