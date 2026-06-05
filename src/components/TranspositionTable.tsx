import type { Opening } from "../types/opening";
import { parsePGNMoves } from "../utilities/parsers";
import { findTranspositions } from "../utilities/transpositions";

interface Props {
    openings: Opening[]
}

export default function TranspositionTable({ openings }: Props) {
    const transpositionGroups = findTranspositions(openings)

    return (
        <table>
            <thead>
                <tr>
                    <th>ECO Codes</th>
                    <th>Openings</th>
                    <th>First Moves</th>
                </tr>
            </thead>
            <tbody>
                {transpositionGroups.map(({ epd, openings }) => (
                    <tr key={epd}>
                        <td>{openings.map(o => o.eco).join(', ')}</td>
                        <td>{openings.map(o => o.name).join(', ')}</td>
                        <td>{openings.map(o => o.pgn)}</td>
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

