import type { Opening } from './opening.tsx'

export interface Node {
    move: string
    uci: string
    children: Map<string, Node>
    openings: Opening[]
}