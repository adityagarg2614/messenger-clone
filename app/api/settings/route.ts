import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function POST(
    request: Request
) {

    try {
        const body = await request.json();
        const { name, image } = body;
        const currentUser = await getCurrentUser();
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name: name,
                image: image,
            }
        });
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}