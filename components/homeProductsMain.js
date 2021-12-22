import styles from './homeMain.module.css'
import MyImage from "./myImage"
import Link from 'next/link'


export default function HomeProductsMain(){
    return(
        <div className={styles.product_cards}>
            <div className={`${styles.product_card} ${styles.eztitles_card}`}>
                <svg className={styles.shape_top} preserveAspectRatio="none" viewBox="0 0 86 86"
                     width="100%" height="185">
                    <polygon points="0,0 0,86 86,86" style={{"fill":"#079FF7"}}></polygon>
                </svg>
                <div className={styles.product_card_icon}>
                    <div className={styles.icon}>
                        <MyImage  src='/images/ezt.png' width={64} height={64} alt='ez titles icon'/>
                        <div className={styles.product_card_software}>
                            <MyImage  src='/images/windows.png' width={20} height={20} alt='supported software'/>

                        </div>
                    </div>

                </div>
                <h2>EZTitles</h2>
                <h4><strong>for advanced<br />subtitle authoring</strong></h4>
                <p>EZTitles redefines what professional subtitling software can do! World-class Streaming Services, TV, Digital Cinema, DVD and Blu-ray subtitle preparation software. Powerful conversion tool for almost any known file format. Breakthrough module for Closed Captioning. Three groundbreaking products. Single software.</p>
            </div>



            <div className={`${styles.product_card}`} style={{ 'background':'#F03030'}}>

                <svg className={styles.shape_top} preserveAspectRatio="none" viewBox="0 0 86 86"
                     width="100%" height="185">
                    <polygon points="0,0 0,86 86,86" style={{"fill":"#F03030"}}></polygon>
                </svg>
                <svg className={styles.shape_bottom} preserveAspectRatio="none" viewBox="0 0 86 86"
                     width="100%" height="185">
                    <polygon points="0,0 86,0 86,86" style={{"fill": "#F03030"}}></polygon>
                </svg>

                <div className={styles.product_card_icon}>
                            <MyImage  src='/images/ezc.png' width={64} height={64} alt='ez titles icon'/>

                        </div>
                        <div className={styles.product_card_software}>
                            <MyImage  src='/images/windows.png' width={20} height={20} alt='supported software'/>

                        </div>
                        <h2>EZConvert</h2>
                        <h4><strong>for conversion<br />between formats</strong></h4>
                        <p>Fast and accurate subtitle conversion tool which supports a variety of subtitle formats and DVD, Blu-ray and NLE authoring systems. EZConvert does not bother with different output file format a client may require. It simply has them all!</p>

                    </div>
                    <div className={styles.product_card} style={{'border':'1px solid #de6b48', 'background':'#de6b48ee'}}>
                        <div className={styles.product_card_icon}>
                            <MyImage  src='/images/ep.png' width={32} height={32} alt='ez titles icon'/>

                        </div>
                        <div className={styles.product_card_software}>
                            <MyImage  src='/images/windows.png' width={20} height={20} alt='supported software'/>

                        </div>
                        <h2>EZTitles Plug-ins</h2>
                        <h4><strong>for integration</strong></h4>
                        <p>The plug-ins for ProMedia Carbon & Rhozet Carbon Coder, and Capella Systems&apos; Cambria File Convert are powerful tools which allows you to load and encode your subtitles Closed Caption, Teletext or DVB files with the video.</p>

                    </div>
                    <div className={styles.product_card} style={{'border':'1px solid #79b473', 'background':'#79b47366'}}>
                        <div className={styles.product_card_icon}>
                            <MyImage  src='/images/3d.png' width={32} height={32} alt='ez titles icon'/>

                        </div>
                        <div className={styles.product_card_software}>
                            <MyImage  src='/images/windows.png' width={20} height={20} alt='supported software'/>

                        </div>
                        <h2>3DTitles</h2>
                        <h4><strong>for 3D subtitling</strong></h4>
                        <p>3DTitles adds depth to your regular 2D subtitles. The software analyzes the whole movie and automoatically choses the perfect Z-position for each subtitle. Or YOU can do it according to point of interest in the picture.</p>

                    </div>



        </div>
    )
}
