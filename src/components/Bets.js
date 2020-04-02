import React from 'react'

export const Bets = (props) => {
      
    const bets = props.bets.map((bet, i) => 
        <tr key={'bet_' + i}><td>{bet.match}</td><td>{bet.matchresult}</td><td>{bet.odd}</td><td>{bet.bet}</td></tr>
    )
  
    return (
        <div>
            <h1 className="h1-football">Bets</h1>
            <table className="table-bets">
                <tbody>
                    <tr className="header-row"><td>Match</td><td>Match Result</td><td>Odd</td><td>Bet</td></tr>
                    {bets}
                </tbody>
            </table>
            <div className="div-spacer"></div>
        </div>
    )
}