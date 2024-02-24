import Image from 'next/image'
import { FC } from 'react'

export const SpotifyEmbed: FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <section className={`w-full py-10 ${className} border-y border-green-200`}>
            <div className="pb-8 flex flex-col items-center space-y-4">
                <h2 className="text-3xl font-bold text-center">Birthday Playlist</h2>
                <Image src="/8.png" width={150} height={150} alt="Spotify" />

                <p className="text-center text-sm pt-1">Some songs we handpicked for you to listen</p>
            </div>
            <div className="px-4 md:px-6 bg-transparent flex flex-col items-center justify-center">
                <iframe
                    style={{}}
                    src="https://open.spotify.com/embed/playlist/77ableGpJXnkluQrbqQu4M?utm_source=generator"
                    width="315"
                    height="380"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            </div>
        </section>
    )
}
