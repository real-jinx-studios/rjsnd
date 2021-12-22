import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

export default async function Handler(req, res){
    const customer = req.body
    try {

        const results = await query(
            `
                insert into customers (first_name, last_name, email, street_address, street_address_2, postcode, phone_num, city, country, company_name, vat, type)
                VALUES (?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,?)
            `,
            [customer.first_name, customer.last_name, customer.email, customer.street_address, customer.street_address_2, customer.postcode, customer.phone_num, customer.city, customer.country, customer.company_name, customer.vat, customer.type]
        )


        return res.json(results)
    } catch (e) {
       // res.status(500).json({ message: e.message })
        console.log(e,'s2')
    }
}
