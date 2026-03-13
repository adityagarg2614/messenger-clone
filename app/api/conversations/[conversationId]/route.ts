import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

interface IParams {
    conversationId: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { conversationId } = params;
        const conversation = await prisma.conversation.delete({
            where: {
                id: conversationId,
            }
        });
        return NextResponse.json(conversation);
    } catch (error: any) {
        console.error("Error deleting conversation:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}