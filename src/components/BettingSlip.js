import React from 'react'

export const BettingSlip = (props) => {
    
    const divStyle = {display:props.betPlacedSuccessfully}
    
    return (
        <div className="div-betSlip">
            <h2 className="h2-betSlip">Betslip</h2>                
                <div>      
                    <form>
                        <label className="label-betslip-match">{props.match}</label>
                        <label className="label-betSlip-block">Match Result: {props.matchresult}</label>
                        <label className="label-betSlip-block">Odds: {props.odd}</label>
                        <label className="label-betSlip-inline">Bet:</label>                    
                        <input className="bet" disabled={props.betInputDisabled} value={props.bet} onChange={props.inputBet}></input>
                        <label className="label-betSlip-block">Potential Win: {(props.potentialWin).toFixed(2)}</label>
                        <button 
                            className="button-betSlip" 
                            disabled={props.placeBetDisabled} 
                            onClick={props.placeBet}
                        >
                            Place Bet
                        </button>                    
                    </form>            
                    <div className="div-bet-placed" style={divStyle}>Bet Successfully Placed</div>
            </div>        
        </div>
    )
}