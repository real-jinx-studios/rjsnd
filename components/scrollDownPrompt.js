import styles from "./homeMain2.module.css";
import * as React from "react";
import {motion} from 'framer-motion'
import Link from 'next/link'


export default function ScrollDownPrompt({href}){
    
    const style={
        position: 'absolute',
        right: '50%',
        top: '100%',
        width: 24,
        height: 37,
        zIndex: 30,
        borderRadius: 12,
        border: '1px solid #fff',
        opacity: 1
    }
    const spanStyleOuter={
        display:'inline-block',
        position:'relative',
        width:24,
        height:37

    }
    const spanStyleInner={
        position: 'absolute',
        right: '50%',
        top: 0,
        width: 6,
        height: 8,
        zIndex: 1,
        borderRadius: '50%',
        opacity: 1,
        background:'#ffffff',
        transform:'translate(25%, 0)'
    }
    const spanStyleText={
        position: 'absolute',
        right: '0',
        top: '111%',
        zIndex: 1,
        opacity: 1,
        fontSize:'max(12px,.83vw)',
        fontWeight:'100',
        whiteSpace:'nowrap',
        wordBreak:'keep-all',
        transform: 'translateX(30%)'
    }
    const scrollVariant={
        initial:{
            x:2,
            y:22
        },
        animate:{
            y:2,
            transition:{
                type:'spring',
                bounce:0.12,
                yoyo:Infinity
            }
        },
    }
    
    
    
    return(
        <Link href={href}><a style={style}><span style={spanStyleOuter}><motion.span
            variants={scrollVariant}
            initial='initial'
            animate='animate'
            style={spanStyleInner}></motion.span><span style={spanStyleText}>scroll down</span></span></a></Link>
    )
    
}
