'use client'
import { HeroSection } from '@/components/HeroSection'
import { Jigsaw } from '@/components/Jigsaw'
import { SpotifyEmbed } from '@/components/SpotifyEmbed'
import { Whatsapp } from '@/components/WhatsApp'
import { Wishes } from '@/components/Wishes'

import AnimatedCursor from 'react-animated-cursor'

export default function Home() {
    return (
        <>
            <AnimatedCursor
                innerSize={8}
                outerSize={8}
                color="193, 11, 111"
                outerAlpha={0.2}
                innerScale={0.7}
                outerScale={5}
                clickables={[
                    'a',
                    'input[type="text"]',
                    'input[type="email"]',
                    'input[type="number"]',
                    'input[type="submit"]',
                    'input[type="image"]',
                    'label[for]',
                    'select',
                    'textarea',
                    'button',
                    '.link',
                    {
                        target: '.custom'
                    }
                ]}
            />
            <HeroSection />
            <SpotifyEmbed />
            <Wishes />
            <Whatsapp />
        </>
    )
}
