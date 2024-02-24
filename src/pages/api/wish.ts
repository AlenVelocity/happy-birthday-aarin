import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Wish } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ error: string } | { id: string } | { wishes: Wish[] } | { wish: Wish }>
) {
    if (req.method === 'POST') {
        const { wish, from, image = '/0.png' } = req.body
        try {
            const savedWish = await prisma.wish.create({
                data: {
                    wish,
                    from,
                    image
                }
            })

            return res.status(200).json({ wish: savedWish })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Couldn't save the wish" })
        }
    }

    if (req.method === 'DELETE') {
        const { id } = req.body

        try {
            await prisma.wish.delete({
                where: {
                    id
                }
            })

            return res.status(200).json({ id })
        } catch (error) {
            return res.status(500).json({ error: "Couldn't delete the wish" })
        }
    }

    if (req.method === 'GET') {
        const wishes = await prisma.wish.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        res.status(200).json({ wishes })
    }
}
