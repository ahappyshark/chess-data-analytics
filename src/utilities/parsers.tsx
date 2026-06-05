import type { Node } from '../types/node'
import type { Opening } from '../types/opening'

export function parseTSV(raw: string): Opening[] {
    const [headerLine, ...rows] = raw.trim().split('\n')
    const headers = headerLine.split('\t')    

    return rows.map(row => {
        const values = row.split('\t')
        const obj = Object.fromEntries(headers.map((h, i) => [h, values[i]]))
        return obj as Opening
    })
}

export function parsePGNMoves(pgn: string): string[] {
    return pgn
        .replace(/\d+\./g, '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
}

export function parseUCIMoves(uci: string): string[] {
    return uci.trim().split(' ').filter(Boolean)
}

export function buildTree(openings: Opening[]): Node {
    const root: Node = {
        move: '',
        uci: '',
        children: new Map(),
        openings: []
    }
    const byPosition: Map<string, Opening[]> = new Map()

    for (const opening of openings) {
        const moves = parsePGNMoves(opening.pgn)
        const ucis = parseUCIMoves(opening.uci)
        const existing = byPosition.get(opening.epd) ?? []
        byPosition.set(opening.epd, [...existing ,opening])
        let node = root

        moves.forEach((move, i) => {
            if (!node.children.has(move)) {
                node.children.set(move, {
                    move,
                    uci: ucis[i] ?? '',
                    children: new Map(),
                    openings: []
                })
            }
            node = node.children.get(move)!
            if (i === moves.length - 1) {
                node.openings.push(opening)
            }
        })
    }
    return root
}