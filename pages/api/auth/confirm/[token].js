import {query} from "../../../../lib/db";
const { performance } = require('perf_hooks');
export default async function handler(req, res) {
    const {token} = req.query

    try {
        let start = performance.now()

        const results = await query('UPDATE users SET verified = true, confirmation="confirmed" WHERE confirmation = ?', [token])

        let end = performance.now()
        //return res.json([results, {time: end - start}])
        if (results.affectedRows == 1 && results.changedRows == 1) {
            return res.redirect('/user-login')
        }
        return res.redirect('/user-login/confirmation-failed')
    } catch (e) {
        //res.status(500).json({message: e.message})
        return res.redirect('/user-login/confirmation-failed')

    }


}

