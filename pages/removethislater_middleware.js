/*import {validateToken} from "../lib/validateToken";
import {NextResponse} from "next/server";


export function middleware(req, event){
    const token=req.headers
    const isLoggedIn=validateToken(token['Authorization'])
    if(isLoggedIn){
        console.log('logged the fuck in')
        //return new Response('logged in buddy')
    }else{
        console.log('not logged the fuck in')
        return event.respondWith(NextResponse.redirect('/login'))
    }
    console.log(token, token['Authorization'],'middlewaer shit')
}*/
