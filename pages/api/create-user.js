import { NextApiHandler } from 'next'
import { query } from '../../lib/db'
const { performance } = require('perf_hooks');
let nodemailer = require("nodemailer");
let aws = require("@aws-sdk/client-ses");
export default async function Handler(req, res){
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    const pass=makeid(8)
    const confirmation=makeid(32)
    const {email} = req.query

    let transporter=nodemailer.createTransport({
        host:"email-smtp.eu-central-1.amazonaws.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: "AKIAUE4LVMWRBOJQKQ7T",
            pass: "BNefYeh8TtzjURa9e7XX85LpThCjco902Z5uijJA5+N+",
        },
    });


    let message = {
        from: "real.martin.zannato@gmail.com",
        //to: email,
        to: "real.jinx.studios@gmail.com",
        subject: "Account creation on EZTitles",
        text: "Username: "+email+" // Password: "+pass,
        html: `Username: ${email} // Password: ${pass}<br>Please confirm your account by clicking the link http://localhost:3000/api/auth/confirm/${confirmation}`
    };
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error, 's5');
        } else {
            console.log("Server is ready to take our messages");
            transporter.sendMail(message)
        }
    });



    try {

        let start= performance.now()

        const results = await query(
            `
                INSERT INTO users (username, password, confirmation)
                VALUES (?, ?, ?)
            `,
            [email, pass, confirmation]
        )
        let end=performance.now()
        results.message=end-start
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
