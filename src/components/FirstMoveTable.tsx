import type { Opening } from "../types/opening";
import { parsePGNMoves } from "../utilities/parsers";

interface Props {
    openings: Opening[]
}

export default function FirstMoveTable({ openings }: Props) {
    const stats = getFirstMoveStats(openings)
    return (
        <table>
            <thead>
                <tr>
                    <th>First Move</th>
                    <th>Openings</th>
                </tr>
            </thead>
            <tbody>
                {stats.map(({ move, count }) => (
                    <tr key={move}>
                        <td>{move}</td>
                        <td>{count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function getFirstMoveStats(openings: Opening[]) {
    const counts = new Map<string, number>()

    for (const opening of openings) {
        const moves = parsePGNMoves(opening.pgn)
        const first = moves[0]
        if (!first) continue
        counts.set(first, (counts.get(first) ?? 0) + 1)        
    }

    return Array.from(counts.entries())
        .map(([move, count]) => ({ move, count }))
        .sort((a, b) => b.count - a.count)
}