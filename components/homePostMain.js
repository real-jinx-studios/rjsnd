import styles from './homeMain.module.css'
import MyImage from "./myImage"
import Link from 'next/link'
import Logo from "./logo";

export default function HomePostMain(){
    const actualArray=[
        {
            title:'Subtitling Assistant',
            description:'Recognizes spoken text from the audio and automatically generates captions/featuress in the same language.',
            icon_url:'/images/int.png',
            link_url:'/features'
        },
        {
            title:'Macros',
            description:'Record little programs which can automate frequently repeated operations. Group commands and actions and execute with one click.',
            icon_url:'/images/miright.png',
            link_url:'/features'
        },{
            title:'Backup',
            description:'Never lose your work with Auto Recovery, File History, Unsaved Projects and File Overwrite Protection.',
            icon_url:'/images/backupi.png',
            link_url:'/features'
        },{
            title:'Closed Captions',
            description:'SMPTE-TT with tunnel CEA-608 data, Scenarist Closed Captions for DVD authoring, CAP, CIN, TDS, ULT, MCC CEA-708 captions (.mcc) and many more.',
            icon_url:'/images/cc.png',
            link_url:'/features'
        },{
            title:'Subtitle Digital Cinema',
            description:'EZTitles covers the full range of the DC subtitle specifications and supports ruby characters and vertical text.',
            icon_url:'/images/digital.png',
            link_url:'/features'
        },{
            title:'Convert Subtitles',
            description:'Use automated assistants — the Workflows, the Watch Folder, the Command Line utility and the Quality checks to convert subtitle files of any type into the one you need.',
            icon_url:'/images/fci.png',
            link_url:'/features'
        },{
            title:'Cloud Support',
            description:'Connect to your preferred Cloud Storage service – Google Drive or Dropbox. Work on any computer with your saved presets.',
            icon_url:'/images/cloud.png',
            link_url:'/features'
        },{
            title:'Plug-ins',
            description:'Load and burn your subtitles and Closed Caption, Teletext, DVB files using ProMedia Carbon, Rhozet Carbon Coder system.',
            icon_url:'/images/plugin.png',
            link_url:'/features'
        },{
            title:'Subtitle anything!',
            description:'Subtitle streaming services such as Disney+, Netflix, Apple TV +, Amazon Prime, Hulu and others. Use Open subtitles, Closed Captions, Digital Cinema, Blu-ray, Teletext, DVD and DVB Subtitles.',
            icon_url:'/images/subtitleall.png',
            link_url:'/features'
        },{
            title:'Subtitle 3D Videos',
            description:'3DTitles analyzes the whole movie and automatically and chooses the perfect Z-position for each subtitle.',
            icon_url:'/images/3di.png',
            link_url:'/features'
        }
    ]
    const stuff=Array.from({length:14},()=>{
            return{
                title:'Subtitling Assistant',
                description:'Recognizes spoken text from the audio and automatically generates captions/subtitles in the same language.',
                icon_url:'/images/int.png'
            }})
    const elements=actualArray.map((x,i)=><div key={i} className={styles.home_post_main_content}><div className={styles.home_post_main_content_inner}>
        <div className={styles.home_post_main_content_icon}>
            <div className={styles.line}></div>
                <div className={styles.home_post_main_content_icon_image}><div className={styles.home_post_main_content_icon_image_inner}><MyImage
                    priority={false}
                    src={x.icon_url}
                    height={50}
                    width={50}
                    alt='icon'
                /></div></div>
            <div className={styles.line}></div>
        </div>
        <div className={styles.home_post_main_content_text}><h4>{x.title}</h4><p>{x.description}</p><Link href='https://www.eztitles.com/index.php?page=subtitling-assistant#product-header-caption'><a className={styles.custom_link}>View more</a></Link></div>
    </div></div>)

    return(
        <>
            <div className={styles.feature_spotlight}><div className={styles.spotlight_main}> <MyImage src='/images/spotlight.png' width={38} height={38}></MyImage> <h2 className={styles.spotlight_title}>Feature Spotlight</h2></div><div className={styles.spotlight_secondary}> <i className={styles.spotlight_undertext}>Some of the many great features we offer</i></div></div>
        <div className={styles.home_post_main_wrapper}>
            {elements}


        </div>
        </>
    )
}




