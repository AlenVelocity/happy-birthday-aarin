import { Wish } from './Wish'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'

export const Wishes = () => {
    const wishes = [
        {
            from: 'Alen',
            content: `Example Wish`
        }
    ]

    return (
        <div className="w-full py-20">
            <div className="pb-8">
                <h2 className="text-3xl font-bold text-center">Get Wish'd</h2>
                <p className="text-center text-sm pt-1">
                    Some things we could've told you on whatsapp but its cooler this way
                </p>
            </div>
            <div className="px-4 md:px-6 bg-transparent flex flex-row items-center justify-center">
                <div className="flex flex-row items-center space-x-4">
                    {wishes.map((wish, index) => (
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <Card className="border-green-500 shadow-2xl">
                                    <CardHeader className="flex flex-col items-center space-y-4">
                                        <Image src={`/${index}.png`} width={150} height={150} alt={wish.from} />
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center space-y-4">
                                        <Button variant="outline" className="border-green-500">
                                            📝 {wish.from}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="items-center w-[3/4] rounded-lg bg-gradient-to-b from-pink-200 via-pink-200 to-yellow-200">
                                <Wish {...wish} />
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </div>
    )
}
