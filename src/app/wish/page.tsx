'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Wish } from '@prisma/client'
import { useIsClient, useLocalStorage } from '@uidotdev/usehooks'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver as zodRes } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import Image from 'next/image'
import { ClientOnly } from '@/components/ClientOnly'

const images = new Array(23).fill('').map((_, i) => `/${i}.png`)

const wishSchema = z.object({
    from: z.string().min(3, { message: 'Your name is too short (min 3 characters)' }),
    wish: z.string().min(10, { message: 'Your wish is too short (min 10 characters)' }),
    image: z.string().default(images[0])
})

type WishFromValues = z.infer<typeof wishSchema>

const addWish = async ({ from, wish, image }: { from: string; wish: string; image: string }) => {
    const res = await axios.post('/api/wish', { from, wish, image })
    return res.data
}

const deleteWish = async (id: string) => {
    const res = await axios.delete('/api/wish', { data: { id } })
    return res.data
}

const AddWish = () => {
  
    const form = useForm({
        resolver: zodRes(wishSchema),
        mode: 'onChange',
        defaultValues: { from: '', wish: '', image: images[0] }
    })
    const [wishes, setWishes] = useLocalStorage<Wish[]>('my-wishes', [])
    const [currentImage, setCurrentImage] = useState<string>(images[0])
    const [isSending, setIsSending] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleSubmit = async ({ from, wish, image }: { from: string; wish: string; image: string }) => {
        setIsSending(true)
        const { wish: newWish } = await addWish({ from, wish, image })
        if (!newWish) return
        console.log(newWish)
        setWishes([...wishes, newWish])
        form.reset()
        setIsSending(false)
    }
    const handleDelete = async (id: string) => {
        setIsDeleting(true)
        await deleteWish(id)
        const newWishes = wishes.filter((wish) => wish.id !== id)
        setWishes(newWishes)
        setIsDeleting(false)
    }

    return (
        <div className="w-full pt-[150px] md:pt-[200px] pb-[170px]">
            <div className="flex flex-col items-center justify-center">
                <Card className="md:w-1/2 w-3/4 bg-pink-100 border-x-pink-300 border-2">
                    <CardHeader>
                        <h1 className="text-2xl font-bold">Add a wish</h1>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="from"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Your name will be displayed with your wish
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="wish"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Wish</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Wish" {...field} />
                                            </FormControl>
                                            <FormDescription>Say something to Aarin</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image</FormLabel>
                                            <Card className="h-44 w-44">
                                                <Image
                                                    src={currentImage}
                                                    alt="Selected Image"
                                                    width={128}
                                                    height={128}
                                                    className="p-2 h-full w-full"
                                                />
                                            </Card>
                                            <FormControl>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <Button variant="outline" size="sm" className="border-2">
                                                            Select Image
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <ScrollArea>
                                                            <DropdownMenuLabel>Select an image</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <div className="grid grid-cols-4 gap-2 max-h-72 overflow-y-auto">
                                                                {images.map((image) => (
                                                                    <DropdownMenuItem
                                                                        key={image}
                                                                        onClick={() => {
                                                                            setCurrentImage(image)
                                                                            form.setValue('image', image)
                                                                        }}
                                                                        {...field}
                                                                    >
                                                                        <img
                                                                            src={image}
                                                                            alt="Image"
                                                                            className="w-20 h-20"
                                                                        />
                                                                    </DropdownMenuItem>
                                                                ))}
                                                            </div>
                                                        </ScrollArea>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </FormControl>
                                            <FormDescription>Choose an image for your wish</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    variant="outline"
                                    size="default"
                                    className="mt-2 border-2"
                                    disabled={isSending}
                                >
                                    Wish!
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col items-center justify-center mt-8">
                <div className="md:w-1/2 w-3/4 text-center">
                    <h1 className="text-2xl font-bold mb-8">Wishes</h1>
                    <ul className="space-y-4">
                        {wishes.map((wish) => (
                            <li key={wish.id} className="flex items-center justify-between">
                                <Card className="w-full bg-pink-100 border-pink-300 border-2">
                                    <CardHeader>
                                        <h1 className="text-lg font-bold">{wish.from}</h1>
                                    </CardHeader>
                                    <CardContent className="flex flex-col items-center space-y-4">
                                        <Image src={wish.image ?? ''} alt="Wish Image" width={128} height={128} />
                                        <p>{wish.wish}</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-2 border-2 bg-red-300 hover:bg-red-400"
                                            onClick={() => handleDelete(wish.id)}
                                            disabled={isDeleting}
                                        >
                                            Delete
                                        </Button>
                                    </CardContent>
                                </Card>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default () => (
    <ClientOnly>
        <AddWish />
    </ClientOnly>
)
