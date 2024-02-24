import { FC, useEffect, useState } from 'react'

export const TypeWriter: FC<{ text: string[]; className: string }> = ({ text, className }) => {
    const [wordIndex, setWordIndex] = useState(0)
    const [letterIndex, setLetterIndex] = useState(0)
    const [word, setWord] = useState(text[0])
    const [displayedWord, setDisplayedWord] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [wait, setWait] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (letterIndex === word.length && !isDeleting) {
                setIsDeleting(true)
                setWait(true)
                setTimeout(() => {
                    setWait(false)
                }, 1000)
            }
            if (letterIndex === 0 && isDeleting) {
                setIsDeleting(false)
                const nextWordIndex = (wordIndex + 1) % text.length
                setWordIndex(nextWordIndex)
                setWord(text[nextWordIndex])
            }
            if (isDeleting && !wait) {
                setDisplayedWord(word.substring(0, letterIndex - 1))
                setLetterIndex(letterIndex - 1)
            } else {
                setDisplayedWord(word.substring(0, letterIndex + 1))
                setLetterIndex(letterIndex + 1)
            }
        }, 100)
        return () => clearTimeout(timer)
    }, [word, letterIndex, isDeleting, text, wordIndex, wait])

    return <span className={className}>{displayedWord}</span>
}
