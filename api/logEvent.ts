import type { NextApiRequest, NextApiResponse } from 'next'
import { logEvent } from "@/api/logging";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body
        try {
            await logEvent(data)
            res.status(200).json({ message: 'Logged event' })
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while logging the event' })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}