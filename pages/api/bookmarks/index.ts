import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb'; // Assurez-vous que le chemin est correct
import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { postId, userId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== 'string') {
      return res.status(400).json({ error: 'Invalid postId' });
    }

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    
    // Get the username of the connected user
    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id
      }
    });

    if (!user) {
      throw new Error("Invalid user");
    }

    if (req.method === 'POST') {
      const bookmark = await prisma.bookmarks.create({
        data: {
          postId,
          userId,
        },
      });

      return res.status(200).json(bookmark);
    }

    if (req.method === 'DELETE') {
      await prisma.bookmarks.deleteMany({
        where: {
          postId,
          userId,
        },
      });

      return res.status(200).json({ message: 'Bookmark removed' });
    }

    if (req.method === 'GET') {
      const bookmark = await prisma.bookmarks.findFirst({
        where: {
          postId,
          userId,
        },
      });

      return res.status(200).json({ bookmarked: !!bookmark });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
