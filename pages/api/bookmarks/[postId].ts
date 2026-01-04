import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse,) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const { postId } = req.query
        const { currentUser } = await serverAuth(req, res);

        if (!postId || typeof postId !== "string") {
            return res.status(400).json({ error: 'Invalid postId' });
        }

        const bookmarks = await prisma.bookmarks.findFirst({
            where: {
                postId: postId as string,
                userId: currentUser.id,
            },
        });

        return res.status(200).json({ bookmarked: !!bookmarks });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
}
