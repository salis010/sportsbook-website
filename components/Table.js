import React from 'react';
import { Match } from './Match.js';
import { TableTitle } from './TableTitle.js';


export const Table = (props) => {
    
    let matches;        
    let odds;    
    
    matches = props.league.league.matches.map((match, i) => 
        <Match key={'match_' + i} odds={props.league.league.matches[i].odds} homeTeam={match.homeTeam.name} awayTeam={match.awayTeam.name} getOdd={props.getOdd}></Match>        
    );    

    return (
        <table className="matches-table">
                <tbody>                            
                    <TableTitle id={props.id} title={props.league.leagueName} />
                    {matches}                                
                </tbody>
            </table>  
    );
}