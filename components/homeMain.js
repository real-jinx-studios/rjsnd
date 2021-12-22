import utilStyles from "../styles/utils.module.css";
import styles from "./homeMain.module.css";
import MyImage from "./myImage";
import Link from 'next/link';
import {useEffect, useState} from 'react';
import AppShowcase from "./appShowcase";

export default function HomeMain(props){
    const [selectedApp, setSelectedApp]=useState(3)
    useEffect(()=>{
        console.log(selectedApp)
    },[selectedApp])
    return(
        <div className={''}>
            <div className={styles.video_background}>
                <video autoPlay loop>

                    <source src="/videos/home-hero-bg.mp4"/>
                </video>
            </div>
            <div className={styles.landing}>
            {/*<div className={styles.intro}>
                <div className={`${styles.intro_paragraph} ${utilStyles.whiteText}`}>
                    <h1 style={{'fontWeight':'lighter'}}>Start subtitling with some of the world’s most advanced professional subtitling tools.</h1>
                    <br />
                    <p>Starting from 58 EUR/month*<br /><i>*for EZTitles Essentials on 36 monthly instalments</i></p>

                </div>
                <div className={styles.three_buttons_wrapper}>
                    <div className={utilStyles.generic_button}>Subtitling Assistant</div>
                    <div className={utilStyles.generic_button} style={{'background':'#ffffff', 'color':'#2e77bb'}}>Free Trial</div>
                    <div className={utilStyles.generic_button}>Video Tutorials</div>
                </div>


            </div>*/}
                <AppShowcase id={selectedApp}/>
                <div className={styles.products_outer}>
                    <div className={styles.products}>
                        <input className={`${styles.radio} ${styles.r1}`} type="radio" name="slider" id="item-1" onClick={()=>{setSelectedApp(1)}}/>
                            <input className={`${styles.radio} ${styles.r2}`} type="radio" name="slider" id="item-2" onClick={()=>{setSelectedApp(2)}}/>
                                <input className={`${styles.radio} ${styles.r3}`} type="radio" name="slider" id="item-3" defaultChecked onClick={()=>{setSelectedApp(3)}}/>
                                    <input className={`${styles.radio} ${styles.r4}`} type="radio" name="slider" id="item-4" onClick={()=>{setSelectedApp(4)}}/>


                        <label id='slide3' htmlFor='item-3' className={`${styles.product_card} ${styles.eztitles_card}`}>
                            <div className={styles.product_card_icon}>

                                    <MyImage  src='/images/ezt.png' width={39} height={39} alt='ez titles icon'/>
                                    <div className={styles.product_card_software}>
                                        <MyImage  src='/images/windows.png' width={20} height={20} alt='supported software'/>

                                    </div>


                            </div>
                            <div className={styles.card_title}>
                                <h2>EZTitles</h2>
                            </div>
                            <div className={styles.card_description}>
                             <p>EZTitles redefines what professional subtitling software can do! Word-class TV, Digital Cinema, DVD and Blu-ray subtitle preparation software. Powerful conversion tool for almost any known file format. Breakthrough module for Closed Captioning. Three groundbreaking products. Single software.</p>
                            </div>
                            <div className={styles.card_button}>
                                <Link href='/subtitle'><a className={styles.card_button_inner}>Learn More</a></Link>

                            </div>
                            <div className={`${styles.background_letter} ${styles.E}`}>E</div>
                            <div className={`${styles.background_letter} ${styles.Z}`}>Z</div>
                        </label>
                        <label id='slide2' htmlFor='item-2' className={`${styles.product_card} ${styles.ezconvert_card}`}>
                            <div className={styles.product_card_icon}>

                                <MyImage  src='/images/ezc.png' width={39} height={39} alt='ez titles icon'/>
                                <div className={styles.product_card_software}>
                                    <MyImage  src='/images/windows.png' width={20} height={20} alt='supported software'/>

                                </div>


                            </div>
                            <div className={styles.card_title}>
                                <h2>EZConvert</h2>
                            </div>
                            <div className={styles.card_description}>
                                <p>Fast and accurate subtitle conversion tool which supports a variety of subtitle formats and DVD, Blu-ray and NLE authoring systems. EZConvert does not bother with different output file format a client may require. It simply has them all!</p>
                            </div>
                            <div className={styles.card_button}>
                                <Link href='/products/plugins'><a className={styles.card_button_inner}>Learn More</a></Link>

                            </div>
                            <div className={`${styles.background_letter} ${styles.E}`}>E</div>
                            <div className={`${styles.background_letter} ${styles.Z}`}>C</div>
                        </label>
                        <label id='slide1' htmlFor='item-1' className={`${styles.product_card} ${styles.titles3d_card}`}>
                            <div className={styles.product_card_icon}>

                                <MyImage  src='/images/3d.png' width={39} height={39} alt='ez titles icon'/>
                                <div className={styles.product_card_software}>
                                    <MyImage  src='/images/windows.png' width={20} height={20} alt='supported software'/>

                                </div>


                            </div>
                            <div className={styles.card_title}>
                                <h2>3DTitles</h2>
                            </div>
                            <div className={styles.card_description}>
                                <p>3DTitles adds depth to your regular 2D subtitles. The software analyzes the whole movie and automatically choses the perfect Z-position for each subtitle. Or YOU can do it according to point of interest in the picture.</p>
                            </div>
                            <div className={styles.card_button}>
                                <Link href='/products/plugins'><a className={styles.card_button_inner}>Learn More</a></Link>

                            </div>
                            <div className={`${styles.background_letter} ${styles.E}`}>3</div>
                            <div className={`${styles.background_letter} ${styles.Z}`}>D</div>
                        </label>
                        <label id='slide4' htmlFor='item-4' className={`${styles.product_card} ${styles.plugin_card}`}>
                            <div className={styles.product_card_icon}>

                                <MyImage  src='/images/ep.png' width={39} height={39} alt='ez titles icon'/>
                                <div className={styles.product_card_software}>
                                    <MyImage  src='/images/windows.png' width={20} height={20} alt='supported software'/>

                                </div>


                            </div>
                            <div className={styles.card_title}>
                                <h2>EZPlug-ins</h2>
                            </div>
                            <div className={styles.card_description}>
                                <p>The plug-ins for ProMedia Carbon, Rhozet&apos; Carbon Coder, Adobe® Premiere® Pro, Avid® Media Composer® and Capella Systems Cambria File Convert are powerful tools which allows you to load and encode (burn) your subtitles Closed Caption, Teletext or DVB files with the video.</p>
                            </div>
                            <div className={styles.card_button}>
                                <Link href='/products/plugins'><a className={styles.card_button_inner}>Learn More</a></Link>

                            </div>
                            <div className={`${styles.background_letter} ${styles.E}`}>3</div>
                            <div className={`${styles.background_letter} ${styles.Z}`}>D</div>
                        </label>










                </div>
            </div>
            </div>
        </div>
    )
}



