import {query} from "../../../lib/db";
const { performance } = require('perf_hooks');
export default async function handler(req, res) {
    const {email, new_pass, old_pass} = req.body

    try {
        let start = performance.now()

        const results = await query('UPDATE users SET password = ? WHERE username = ? && password = ?', [new_pass,email,old_pass])

        let end = performance.now()
        //return res.json([results, {time: end - start}])
        if (results.affectedRows == 1 && results.changedRows == 1) {
            return res.status(200)
        }
        return res.status(400)
    } catch (e) {
        res.status(500).json({message: e.message})

    }


}

