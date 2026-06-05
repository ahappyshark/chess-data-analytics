import { useEffect, useState } from  'react'
import type { Opening } from '../types/opening'
import { parseTSV } from '../utilities/parsers'
import FirstMoveTable from '../components/FirstMoveTable'
import TranspositionTable from '../components/TranspositionTable'
import { findTranspositions } from '../utilities/transpositions'

export default function Dashboard() {
    const [openings, setOpenings] = useState<Opening[]>([])

    useEffect(() => {
        fetch('/openings.tsv')
            .then(r => r.text())
            .then(raw => setOpenings(parseTSV(raw)))
    }, [])

    return (
        <div>
            <h1>Chess Opening Workbench</h1>
            <p>Loaded: {openings.length} openings</p>
            
            <FirstMoveTable openings={openings}/>
            <TranspositionTable openings={openings}/>
        </div>
    )
}