import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib'
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'

export const Jigsaw = ({ onSolve }: { onSolve: () => void }) => {
    return (
        <div className="w-3/4 h-3/4 flex justify-center items-center">
            <JigsawPuzzle imageSrc="/silver_wolf.png" rows={2} columns={2} onSolved={onSolve} />
        </div>
    )
}
