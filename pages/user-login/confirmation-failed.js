import {useRouter} from 'next/router'

export default function UserProfile(){
    const router=useRouter();
    const time=router.query
    return(
        <div style={{"background":"#A81703", "marginTop":"180px"}}><h1 style={{"margin": "auto", "textAlign": "center"}}>SOMETHING WENT WRONG WITH CONFIRMATION! still gg tho.</h1><small>{JSON.stringify(time)}</small></div>
    )
}

