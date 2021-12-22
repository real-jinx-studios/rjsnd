import styles from './homeMain.module.css'
import Link from 'next/link'
import utilStyles from "../styles/utils.module.css";

export default function AppShowcase(props){
    const id=props.id;
    return(

        <div className={styles.intro}>
            {id==3 && <>
            <div className={`${styles.intro_paragraph} ${utilStyles.whiteText}`}>
                <h1 style={{'fontWeight':'lighter'}}>Start subtitling with some of the world’s most advanced professional subtitling tools.</h1>
                <br />
                <p>Starting from 58 EUR/month*<br /><i>*for EZTitles Essentials on 36 monthly instalments</i></p>

            </div>
            <div className={styles.three_buttons_wrapper}>
                <div className={utilStyles.generic_button}>Subtitling Assistant</div>
                <div className={utilStyles.generic_button} style={{'background':'#2e77bb', 'color':'#2e77bb'}}><Link href='https://eztitstorage.blob.core.windows.net/eztitles-storage/HardID.exe'><a>Free Trial</a></Link></div>
                <div className={utilStyles.generic_button}>Video Tutorials</div>
            </div>
            </>
            }
            {id==1 && <>
            <div className={`${styles.intro_paragraph} ${utilStyles.whiteText}`}>
                <h1 style={{'fontWeight':'lighter'}}>Subtitle 3D movies and stuff! Now! Right now! You can do it! Just do it already!</h1>
                <br />
                <p>Starting from 360 EUR/month*<br /><i>*for 3DTitles.</i></p>

            </div>
            <div className={styles.three_buttons_wrapper}>
                <div className={utilStyles.generic_button}>Buy Now</div>

                <div className={utilStyles.generic_button} style={{'background':'#3b8a21', 'color':'#ffffff'}}><Link href='https://eztitstorage.blob.core.windows.net/eztitles-storage/HardID.exe'><a>Free Trial</a></Link></div>
                <div className={utilStyles.generic_button}>Video Tutorials</div>
            </div>
        </>
        }
            {id==2 && <>
                <div className={`${styles.intro_paragraph} ${utilStyles.whiteText}`}>
                    <h1 style={{'fontWeight':'lighter'}}>EZConvert - the world's unique subtitles conversion software</h1>
                    <br />
                    <p>Starting from 83 EUR/month*<br /><i>*for EZConvert in 36 installment plans.</i></p>

                </div>
                <div className={styles.three_buttons_wrapper}>
                    <div className={utilStyles.generic_button}>Buy Now</div>

                    <div className={utilStyles.generic_button} style={{'background':'#a30015', 'color':'#ffffff'}}><Link href='https://eztitstorage.blob.core.windows.net/eztitles-storage/HardID.exe'><a>Free Trial</a></Link></div>
                    <div className={utilStyles.generic_button}>Video Tutorials</div>
                </div>
            </>
            }
            {id==4 && <>
                <div className={`${styles.intro_paragraph} ${utilStyles.whiteText}`}>
                    <h1 style={{'fontWeight':'lighter'}}>Integrate EZTitles with your third party software. But not yours per se.</h1>
                    <br />
                    <p>Starting from 60 EUR/month*<br /><i>*for any plug-in</i></p>

                </div>
                <div className={styles.three_buttons_wrapper}>
                    <div className={utilStyles.generic_button} style={{'background':'#cf420a', 'color':'#ffffff'}}>Buy Now for Pro Media Carbon</div>
                    <div className={utilStyles.generic_button} style={{'background':'#cf420a', 'color':'#ffffff'}}>Buy Now for Cambria File Convert</div>
                    <div className={utilStyles.generic_button}>Video Tutorials</div>
                </div>
            </>
            }


        </div>
    )
}
