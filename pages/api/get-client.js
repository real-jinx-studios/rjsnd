import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
const { performance } = require('perf_hooks');
export default async function NextApiHandler3(req, res) {
    const { id } = req.query
    try {
        let start= performance.now()
        console.log(id)

        const results = await query('SELECT * FROM customers WHERE email = ?', [id])

        let end=performance.now()
        return res.json([...results, {time: end-start}])
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}
