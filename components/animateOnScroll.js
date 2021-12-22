import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useInView } from "react-intersection-observer";
import {motion, useAnimation, useSpring, useTransform} from "framer-motion";

export default function AnimateOnScroll({ children }, props) {
    const controls = useAnimation();
    const [ref, inView] = useInView();
    const y = useSpring(0)
    const easing =[.6,-0.05,0.01,0.99]
    const scale= useTransform(y, [400,0], [1, 1.3])

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);
    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{ duration: 0.3, ease:easing, bounce:1}}
            variants={{
                visible: { opacity: 1, scale: 1, y:0 },
                hidden: { opacity: 1, scale: 1.3, y:130 }
            }}
        >
            {children}
        </motion.div>
    );
}