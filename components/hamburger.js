import * as DropdownMenu from '@radix-ui/react-dropdown-menu';


export default function Hamburger({scroll}){
    const bobs_burgers={
        borderRadius:'50%',
        width:48,
        height:48,
        border:'1px solid #fefefe00',
        backgroundColor:'#fefefe00',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
    }
    const bobs_dark_burgers={
        borderRadius:'50%',
        width:48,
        height:48,
        border:'1px solid #1F1F1F00',
        backgroundColor:'#1F1F1F3900',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
    }

    return(
        <DropdownMenu.Root>
            <DropdownMenu.Trigger style={scroll?bobs_dark_burgers:bobs_burgers}>
                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill={scroll?"#1F1F1F":"#FFFFFF"}><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/></svg>
                <DropdownMenu.Content>
                    <DropdownMenu.Item>Subtitle</DropdownMenu.Item>
                    <DropdownMenu.Item>Convert</DropdownMenu.Item>
                    <DropdownMenu.Item>Go 3D</DropdownMenu.Item>
                    <DropdownMenu.Item>SubAss</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Trigger>
        </DropdownMenu.Root>
    )

}
