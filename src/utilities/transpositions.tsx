import type { Opening } from '../types/opening'

export interface TranspositionGroup {
    epd: string
    openings: Opening[]
}

export function findTranspositions(openings: Opening[]): TranspositionGroup[] {
    const byEPD = new Map<string, Opening[]>()
    for (const opening of openings) {
        const existing = byEPD.get(opening.epd) ?? []
        byEPD.set(opening.epd, [...existing, opening])
    }
    console.log(byEPD)

    return Array.from(byEPD)
        .filter(group => group.length > 1)
        .sort((a, b) => b.length - a.length)
}