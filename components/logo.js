import MyImage from "./myImage";

export default function Logo(props){

    const logos=[{
        url:'/images/icons/BBC.svg'
    },{
        url:'/images/icons/Dolby.svg'
        },{
        url:'/images/icons/HBO.svg'
    },{
        url:'/images/icons/Microsoft.svg'
    },{
        url:'/images/icons/Netflix.svg'
    },{
        url:'/images/icons/Sony.svg'
    },{
        url:'/images/icons/tv5monde.svg'
    },{
        url:'/images/icons/HBO.svg'
    },{
        url:'/images/EA.svg'
    },{
        url:'/images/FOX.svg'
    },{
        url:'/images/M6.svg'
    },{
        url:'/images/NASA.svg'
    },{
        url:'/images/ProSieben.svg'
    },{
        url:'/images/Sky.svg'
    },{
        url:'/images/ViaSat.svg'
    },{
        url:'/images/ZDF.svg'
    },{
        url: '/images/EA.svg'
    },{
        url: '/images/icons/001_MS.png'
    },{
        url: '/images/icons/002_NBC_last.png'
    },{
        url: '/images/icons/004_Dolby_last.png'
    },{
        url: '/images/icons/005_Sony_last.png'
    },{
        url: '/images/icons/018_BBC_last.png'
    },{
        url: '/images/icons/016_FOX_last.png'
    },{
        url: '/images/icons/019_OOONA_last.png'
    },{
        url: '/images/icons/021_Trion_last.png'
    },{
        url: '/images/icons/002_NBC_last.png'
    },{
        url: '/images/icons/007_Technicolor.png'
    },{
        url: '/images/icons/008_Discovery.png'
    },{
        url: '/images/icons/009_MTv_last.png'
    },{
        url: '/images/icons/010_UbiSoft_last.png'
    },{
        url: '/images/icons/011_Disney_last.png'
    },{
        url: '/images/icons/012_NASA_last.png'
    },{
        url: '/images/icons/015_Vodafone_last.png'
    },{
        url: '/images/icons/020_TITRATVS_last.png'
    },{
        url: '/images/icons/023_TVibe_last.png'
    },{
        url: '/images/icons/027_AFP_last.png'
    },{
        url: '/images/icons/028_FranceTV_last.png'
    },{
        url: '/images/icons/029_Viasat_last.png'
    },{
        url: '/images/icons/030_Sky_last.png'
    },{
        url: '/images/icons/031_AlJaz_last.png'
    },{
        url: '/images/icons/032_BTI_last.png'
    },{
        url: '/images/icons/033_Maori_last.png'
    },{
        url: '/images/icons/034_RoyalOperaHouse_last.png'
    },{
        url: '/images/icons/036_MarieHaps_last.png'
    },{
        url: '/images/icons/037_UniverHelsinki.png'
    },{
        url: '/images/icons/038_UniverWurzburg.png'
    },{
        url: '/images/icons/039_UniverSaarLanders.png'
    },{
        url: '/images/icons/041_UniverWarshava.png'
    },{
        url: '/images/icons/042_UniverLille.png'
    },{
        url: '/images/icons/043_UniverValladolid.png'
    },{
        url: '/images/icons/044_UniverHeidelberg.png'
    },{
        url: '/images/icons/045_UniverTrieste.png'
    },{
        url: '/images/icons/046_UniverLeipzig.png'
    },{
        url: '/images/icons/047_Univermacerata.png'
    },{
        url: '/images/icons/048_ComTranslations_last.png'
    },{
        url: '/images/icons/049_Saani_last.png'
    },{
        url: '/images/icons/050_SDI_last.png'
    },{
        url: '/images/icons/051_NorthStar_last.png'
    }
        ]

    let containers=logos.map((x,i)=><div key={i} className={props.img}><MyImage src={x.url} width={260} height={50}/></div>)
    if(props.reverse==-1){
        containers.reverse()
    }
    if(props.part==1){
        containers=containers.slice(0, 12)
    }else if(props.part==2){
        containers=containers.slice(12,24)
    }else if(props.part==3){
        containers=containers.slice(24,36)
    }else if(props.part==4){
        containers=containers.slice(36,48)
    }else if(props.part==5){
        containers=containers.slice(48)
    }



    return (<div className={props.class}>{containers}</div>);
};
