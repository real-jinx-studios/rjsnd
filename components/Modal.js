import {motion, AnimatePresence} from "framer-motion";
import Link from 'next/link'
export default function Modal({showModal, setModal}){
    const style={
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#19191988',
        zIndex: 3
    }
    const style2={
        maxWidth:'400px',
        margin:'0 auto',
        padding:'40px 20px',
        background:'#fefefe',
        borderRadius:15,
        textAlign:'center'
    }
    const backdropVariants={
        hidden:{
            opacity: 0
        },
        visible:{
            opacity:1
        }
    }
    const modalVariants={
        hidden:{
            y:'-100vh',
            opacity:0,
        },
        visible:{
            y:200,
            opacity:1,
            transition:{
                delay:0.5
            }
        }
    }

    return(
        <AnimatePresence exitBeforeEnter>
            {showModal && (
                <motion.div variants={backdropVariants}
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            style={style}>
                    <motion.div variants={modalVariants} style={style2}>
                        <p style={{color:'#191919'}}>Fuck off and die</p>
                        <Link href='/animations/'><button>ok</button></Link>
                    </motion.div>

                </motion.div>
            )}


        </AnimatePresence>
    )
}