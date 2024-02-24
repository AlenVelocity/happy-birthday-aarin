import Link from 'next/link'
import type { PropsWithChildren } from 'react'

const Header = ({ children }: PropsWithChildren) => {
    return (
        <header className="w-full flex flex-col absolute bg-transparent z-40 opacity-97 pb-7">
            <nav className="flex items-center justify-center p-4 w-full">
                <Link href="/" className="flex items-center space-x-1">
                    <h1 className="text-2xl font-semibold">🧁 Nyaarin Day</h1>
                </Link>
            </nav>
        </header>
    )
}

export default Header
