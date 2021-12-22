import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

export default function AnimateDirectionSlide({ children,direction,className }) {
    const controls = useAnimation();
    const [ref, inView] = useInView();
    const easing =[.6,-0.05,0.01,0.99]
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);
    if(direction=='left'){
        return (
            <motion.div
                className={className}
                ref={ref}
                animate={controls}
                initial="hidden"
                transition={{ duration: 0.3 }}
                variants={{
                    visible: { opacity: 1,  x:0 },
                    hidden: { opacity: 0,  x:399 }
                }}
            >
                {children}
            </motion.div>
        );
    }else if(direction=='bottom_left'){
        return (
            <motion.div
                className={className}
                ref={ref}
                animate={controls}
                initial="hidden"
                transition={{ duration: 0.3, ease:easing , delay:0.39}}
                variants={{
                    visible: { opacity: 1,  x:0 , y:0},
                    hidden: { opacity: 0,  x:399, y:-200}
                }}
            >
                {children}
            </motion.div>
        );
    }else if(direction=='bottom'){
        return (
            <motion.div
                className={className}
                ref={ref}
                animate={controls}
                initial="hidden"
                transition={{ duration: 0.3, ease:easing , delay:0.69}}
                variants={{
                    visible: { opacity: 1,  y:0},
                    hidden: { opacity: 0,  y:-399}
                }}
            >
                {children}
            </motion.div>
        );
    }else if(direction=='bottom_right'){
        return (
            <motion.div
                className={className}
                ref={ref}
                animate={controls}
                initial="hidden"
                transition={{ duration: 0.3, ease:easing , delay:0.99}}
                variants={{
                    visible: { opacity: 1, x:0 ,y:0},
                    hidden: { opacity: 0, x:-399 ,y:-399}
                }}
            >
                {children}
            </motion.div>
        );
    }else if(direction=='right'){
        return (
            <motion.div
                className={className}
                ref={ref}
                animate={controls}
                initial="hidden"
                transition={{ duration: 0.3, ease:easing , delay:1.31}}
                variants={{
                    visible: { opacity: 1, x:0},
                    hidden: { opacity: 0, x:-399}
                }}
            >
                {children}
            </motion.div>
        );
    }else{
        return(
            <div className={className}>
                {children}
            </div>
        )
    }
}