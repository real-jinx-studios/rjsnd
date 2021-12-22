import {motion, AnimatePresence} from 'framer-motion'
import {useState} from "react";
import Link from 'next/link'
import Loader from "../../components/loader";

export default function AnimationsTemplate(){
    //styles
    const container={
        overflow:'hidden',
        marginTop:130,
        display: 'flex',
        flexWrap: 'wrap',
    justifyContent: 'space-between'
    }
    const block={
        flex:' 0 32%',
    height: 250,
    marginBottom: '2%',
        border:'1px solid #fefefe33'
    }
    const button={
        color: '#ffffff',
        padding: '10px 30px',
        fontSize: '1em',
    background: 'transparent',
    borderRadius: 50,
    border: '1px solid #ffffff',
    margin: '40px auto 0',
    cursor: 'pointer',
    opacity: 0.7
    }
    const h2={

            fontSize: '2em',
    marginBottom: 30

    }
    const home_container={
        textAlign: 'center',
    maxWidth: 800
    }
    const base_container={
        maxWidth: 300,
    margin: '100px auto 40px'
    }
    //logic bullshit
    const [isSelected, setSelected]=useState(false)

    const handleClick=()=>{
        setSelected(!isSelected)
    }
    //anim bullshit
    const containerVariants={
        hidden:{
            x: '100vh',
            opacity:0
        },
        visible:{
            x:0,
            opacity:1,
            transition:{
                type:'spring',
                delay:2
            }
        }
    }

    const parentVariants={
        hidden:{
            x: '100vh',
            opacity:0
        },
        visible:{
            x:0,
            opacity:1,
            transition:{
                type:'spring',
                delay:0.5,
                mass:0.4,
                damping:8,
                when:"beforeChildren"
            }
        }
    }

    const childrenVariants={
        hidden:{
            y: '-100vw',
        },
        visible:{
            y: 0,
            originX:0,
            rotateZ:'180deg',
            transition:{
                type:'spring',
                stiffness:200
            }
        }
    }


    const buttonVariants={

        hovaShit:{
            scale:1.1,
            textShadow: "0px 0px 8px #ffffff",
            boxShadow: "0px 0px 8px #ffffff",
            transition:{
                duration:0.3,
                yoyo:Infinity
            }

        }
    }

    const pageExitVariants={
        hidden:{
            opacity:0
        },
        visible:{
            opacity:1,
            transition:{
                duration:1.5,
                ease:[0.6,-0.05,0.01,0.99]
            }
        },
        exit:{
            y:'-98vh',
            opacity:0,
            transition:{
                delay:0.2,
                duration:1.5
            }
        }
    }



    return(
        <motion.div variants={pageExitVariants} initial='hidden' animate='visible' exit='exit' style={container}>
            <div style={block}>
                <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    style={home_container}>
                    <motion.h2
                        initial={{y:-250}}
                        animate={{y:-15}}
                        transition={{delay:0.2, type:'spring', stiffness: 120}}
                        style={h2}>Shit text</motion.h2>
                    <motion.button
                        animate={{}}
                        style={button}
                    onClick={handleClick}>
                        fuck off button
                    </motion.button>
                </motion.div>

            </div>
            <div style={block}>
                {isSelected &&
                    <Link href='/animations/index2'>
                        <motion.button
                            initial={{x:'-100vw'}}
                            animate={{x:0}}
                            transition={{type:'spring', stiffness:120}}
                            style={button}>
                            fuck off hidden
                        </motion.button>
                    </Link>}

            </div>
            <div style={block}>
                <motion.div
                    initial={{x:'100vw'}}
                    animate={{x:0}}
                    transition={{type:'spring', delay:0.5}}
                    style={base_container}>
                    <h3>fuck off and die</h3>
                    <ul style={{color:'#ffffff'}}>
                        <motion.li
                            whileHover={{originX:0, scale:1.3, color:'#f8e112'}}
                            transition={{type:'spring', stiffness:120}}
                        >i hate you</motion.li> <motion.li
                            whileHover={{originX:0, scale:1.3, color:'#f8e112'}}
                            transition={{type:'spring', stiffness:120}}
                        >i hate you</motion.li> <motion.li
                            whileHover={{originX:0, scale:1.3, color:'#f8e112'}}
                            transition={{type:'spring', stiffness:120}}
                        >i hate you</motion.li> <motion.li
                            whileHover={{originX:0, scale:1.3, color:'#f8e112'}}
                            transition={{type:'spring', stiffness:120}}
                        >i hate you</motion.li> <motion.li
                            whileHover={{originX:0, scale:1.3, color:'#f8e112'}}
                            transition={{type:'spring', stiffness:120}}
                        >i hate you</motion.li> <motion.li
                            whileHover={{originX:0, scale:1.3, color:'#f8e112'}}
                            transition={{type:'spring', stiffness:120}}
                        >i hate you</motion.li>

                    </ul>
                </motion.div>

            </div>
            <div style={block}>
                <motion.button
                    whileHover={{
                        scale:1.1,
                        textShadow: "0px 0px 8px #ffffff",
                        boxShadow: "0px 0px 8px #ffffff",
                    }}
                    style={button}>
                    fuck off button hover
                </motion.button>

            </div>
            <div style={block}>
                <motion.div
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'
                    style={home_container}>
                    <motion.h2 style={h2}>Shit text</motion.h2>
                    <motion.button
                        style={button}
                        onClick={handleClick}>
                        fuck off button
                    </motion.button>
                </motion.div>


            </div>
            <div style={block}>
                <motion.div
                variants={parentVariants}
                initial='hidden'
                animate='visible'
                >
                    <h3>parent variant with own variant object<br/>initial and animate are specified here with their names<br/>from variant object which are hidden and visible</h3>
                    <motion.div
                    variants={childrenVariants}
                    >
                        <h3>child element with own different variant object<br/>initial and animate are not defined here<br/>but in the variant object have the same names<br/>they animate independently</h3>
                    </motion.div>
                </motion.div>
            </div>
            <div style={block}>
                <motion.button
                    variants={buttonVariants}
                    animate='visible'
                    whileHover='hovaShit'
                    style={button}>
                    fuck off button hover
                </motion.button>

            </div>
            <div style={block}>
                <AnimatePresence>
                    {isSelected &&
                    <motion.button
                        initial={{x:'-100vw'}}
                        animate={{x:0}}
                        exit={{x:'100vw'}}
                        transition={{type:'spring', stiffness:120}}
                        style={button}>
                        fuck off hidden with exit
                    </motion.button>}
                </AnimatePresence>

            </div>
            <div style={block}>
                <Loader/>

            </div>
            <div style={block}>
                <motion.div
                drag
                dragConstraints={{left:0,top:0,right:45,bottom:45}}
                dragElastic={0.98}
                style={{width:80,height:80,backgroundColor:'#fefefe', borderRadius:998,margin:'80px auto'}}
                >
                    move
                </motion.div>

            </div>
            <div style={block}>

            </div>
            <div style={block}>

            </div>

        </motion.div>
    )
}