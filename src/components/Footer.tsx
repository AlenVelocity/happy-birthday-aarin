import Link from 'next/link'
import type { PropsWithChildren } from 'react'

const Footer = () => {
    return (
        <header className="w-full flex flex-col absolute bg-transparent z-40 opacity-97 bg-gradient-to-b from-[#FF4] to-[#FF9] p-2">
            <nav className="flex items-center justify-center p-4 w-full">
                <Link href="/" className="flex items-center space-x-1">
                    <h1 className="text-xl font-semibold">Made with ❤️ by Your Friends</h1>
                </Link>
            </nav>
        </header>
    )
}

export default Footer
