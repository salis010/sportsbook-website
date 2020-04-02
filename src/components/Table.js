import React from 'react'
import { Match } from './Match.js'
import { TableTitle } from './TableTitle.js'


export const Table = ({ id, league, getOdd }) => {
    
    const matches = league.league.matches.map((match, i) => 
        <Match 
            key={'match_' + i} 
            odds={league.league.matches[i].odds} 
            homeTeam={match.homeTeam.name} 
            awayTeam={match.awayTeam.name} 
            getOdd={getOdd}>
        </Match>        
    )    

    return (
        <table className="matches-table">
            <tbody>                            
                <TableTitle id={id} title={league.leagueName} />
                {matches}                                
            </tbody>
        </table>  
    )
}