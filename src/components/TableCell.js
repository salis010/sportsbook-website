import React, { useState, useEffect } from 'react'

export const TableCell = ({ getOdd, matchresult, match, odd }) => {

    const [ showTooltip, setShowTooltip ] = useState("none")
    let timer = "timer"
 
    const startToolTipTimer = () => {
        timer = setTimeout(() => setShowTooltip("none"), 2000)
    }

    const stopToolTipTimer = () => clearTimeout(timer)
    
    const clickHandler = () => {       
        setShowTooltip("block")
        startToolTipTimer()    
        
        getOdd({ matchresult, match, odd })        
    }

    useEffect(() => {
        return stopToolTipTimer() //timer must be cancelled when component unmounts in case the user switches page and the timer is still running: an error would result
    }, [])
    
    return (
        <td 
            className="price" 
            matchresult={matchresult} 
            onClick={clickHandler}
        >
            {odd}                
            <div 
                className="tooltip" 
                style={{display: showTooltip}}
            >
                Betslip updated
            </div>                
            <div 
                className="arrow" 
                style={{display: showTooltip}}
            >
            </div>                
        </td>
    )
    
}
