import {motion, AnimatePresence} from 'framer-motion'
import {useState, useEffect} from "react";

export default function AnimationsTemplate2({setModal}){
    useEffect(()=>{
        setTimeout(()=>{
            setModal(true)
        }, 2000)
    },[setModal])

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
            y:'98vh'
        },
        visible:{
            y:0,
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

            </div>
            <div style={block}>

            </div>
            <div style={block}>

            </div>
            <div style={block}>

            </div>
            <div style={block}>

            </div>
            <div style={block}>

            </div>
            <div style={block}>

            </div>
            <div style={block}>

            </div>
            <div style={block}>

            </div>
            <div style={block}>

            </div>
            <div style={block}>

            </div>
            <div style={block}>

            </div>

        </motion.div>
    )
}