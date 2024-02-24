'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

import { TConductorInstance } from 'react-canvas-confetti/dist/types'
import { TypeWriter } from '../TypeWriter'

import Realistic from 'react-canvas-confetti/dist/presets/realistic'
import Image from 'next/image'
const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } }
}

export function HeroSection() {
    const ref = useRef(null)
    const isInView = useInView(ref) as boolean

    const [conductor, setConductor] = useState<TConductorInstance>()

    const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
        setConductor(conductor)
    }

    useEffect(() => {
        if (!conductor) return
        conductor?.shoot()
    }, [conductor])

    const names = ['Weebrin', 'Nyaughh', 'Itoko', 'Kongming', 'Weebughh', '']

    return (
        <motion.section className="w-full pt-[220px] md:pt-[250px] pb-[170px]">
            <motion.div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center h-full justify-center">
                    <motion.div
                        initial="hidden"
                        variants={FADE_DOWN_ANIMATION_VARIANTS}
                        ref={ref}
                        animate={isInView ? 'show' : 'hidden'}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-2 flex flex-col items-center text-center h-full justify-center"
                    >
                        <Image src="/dva_peek.png" width={175} height={175} alt="Dva" />

                        <h1 className="font-bold tracking-tighter text-4xl md:text-5xl">
                            Happy Birthday{' '}
                            <TypeWriter
                                text={names}
                                className="bg-gradient-to-r from-[#FF0080] to-pink-500 dark:from-[#FF4] dark:to-[#FF0080] bg-clip-text text-transparent"
                            />
                        </h1>
                        <p className="text-sm">Maybe the real birthday was ______ ___ ___ _____</p>
                    </motion.div>
                    <Realistic onInit={onInit} />
                </div>
            </motion.div>
        </motion.section>
    )
}
