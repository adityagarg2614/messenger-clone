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

    const socketId = req.body.socket_id;
    const channelName = req.body.channel_name;
    const data = {
        user_id: session.user.email
    }
    const authResponse = pusherServer.authorizeChannel(socketId, channelName, data);

    return res.send(authResponse);
}
