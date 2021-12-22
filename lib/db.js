import mysql from 'serverless-mysql'

export const db = mysql({
    config: {
        host: "eztit-mysql.mysql.database.azure.com",
        port: '3306',
        database: "EZTitles",
        user: "eztit",
        password: "Papagal1"
    },
})

export async function query(q, values=[]) {
    try {
        const results = await db.query(q, values)
        await db.end()
        return results
    } catch (e) {
        throw Error(e.message)
    }
}
