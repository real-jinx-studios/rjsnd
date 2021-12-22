import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
const { performance } = require('perf_hooks');
export default async function NextApiHandler3(req, res) {
    const { email, password } = req.body
    try {
        let start= performance.now()

        const results = await query('SELECT * FROM users WHERE username = ? && password = ?', [email, password])

        let end=performance.now()
        return res.json([...results, {time: end-start}])
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}
