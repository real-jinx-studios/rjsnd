import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
const { performance } = require('perf_hooks');

export default async function Handler(req, res){
    const { username, password } = req.body
    try {
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: '`username` and `password` are both required' })
        }

        let start= performance.now()

        const results = await query(
            `
                INSERT INTO users (username, password)
                VALUES (?, ?)
            `,
            [username, password]
        )
        let end=performance.now()
        results.message=end-start
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
