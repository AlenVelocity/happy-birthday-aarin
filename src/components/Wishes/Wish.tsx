import React from 'react'
import { La_Belle_Aurore } from 'next/font/google'

import { Card, CardContent, CardFooter } from '../ui/card'
import { Wish as WishType } from '@prisma/client'

const LaBelleAurore = La_Belle_Aurore({ weight: '400', subsets: ['latin'] })

export const Wish: React.FC<WishType> = ({ from, wish }) => {
    return (
        <div>
            <Card className="bg-primary-foreground max-h-[500px] overflow-y-auto rounded-lg">
                <CardContent>
                    <p className="text-lg pt-7">{wish}</p>
                </CardContent>
                <CardFooter>
                    <div className={`text-2xl font-bold text-secondary-foreground ${LaBelleAurore.className}`}>
                        - {from}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
