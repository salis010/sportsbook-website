
import React from 'react'
import { TableCell } from './TableCell'

export const Match = ({ odds, homeTeam, awayTeam, getOdd }) => {
    if(odds) //required, since the object seems to render twice and the props object is not available with calls to it leading to an error    
    {
        const match = homeTeam + " vs " + awayTeam
            return (                
                <tr>
                    <td className="match">{match}</td>
                    <TableCell 
                        matchresult={1} 
                        match={match} 
                        getOdd={getOdd} 
                        odd={odds[0].toFixed(2)}
                    />
                    <TableCell 
                        matchresult={"X"} 
                        match={match} 
                        getOdd={getOdd} 
                        odd={odds[1].toFixed(2)}
                    />
                    <TableCell 
                        matchresult={2} 
                        match={match} 
                        getOdd={getOdd} 
                        odd={odds[2].toFixed(2)}
                    />                    
                </tr>
            )
    }
    return null
}
