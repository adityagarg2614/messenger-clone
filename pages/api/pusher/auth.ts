import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/app/libs/pusher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method not allowed');
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        return res.status(401).end('Unauthorized');
    }

    const { socket_id, channel_name } = req.body;

    const data = JSON.parse(req.body);
    const { presence_key } = data;

    const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, {
        user_id: session.user.email,
        user_info: {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
        },
    });

    return res.send(authResponse);
}