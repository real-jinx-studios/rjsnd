import {useRouter} from "next/router";


export default function RegisterSuccess(){
    const router=useRouter();
    const time=router.query
    return(
        <div style={{"background":"#2e77bb", "marginTop":"180px"}}><h1 style={{"margin": "auto", "textAlign": "center"}}>YOU REGISTERED SUCCESSFULLY! wp</h1><small>{JSON.stringify(time)}</small></div>
    )
}

