import {motion, useCycle} from 'framer-motion'
export default function Loader(){


    const style={
        width:11,
        height:11,
        margin:'40px auto',
        borderRadius:'50%',
        backgroundColor:'#fefefe'

    }
    const loaderVariants={
        animation1:{
            x:[-20,20],
            y:[0,-30],
            transition:{
                x:{
                    yoyo:Infinity,
                    duration:0.5
                },
                y:{
                    yoyo:Infinity,
                    duration:0.25,
                    ease:'easeOut'
                }
            }

        },
        animation2:{
            y:[0,-40],
            x:0,
            transition:{
                y:{
                    yoyo:Infinity,
                    duration:0.25,
                    ease:'easeOut'
                }
            }
        }
    }
    const [anim, cycleAnim]=useCycle('animation1','animation2')

    return(
        <>
        <motion.div style={style}
                    variants={loaderVariants}
                    animate={anim}>

        </motion.div>
            <div onClick={()=>{cycleAnim()}}>cycle animations</div>
        </>
    )
}