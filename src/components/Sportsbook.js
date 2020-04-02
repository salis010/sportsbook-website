import React, { useState, useEffect } from 'react'
import { Leagues } from './Leagues.js'
import { Table } from './Table.js'
import { BettingSlip } from './BettingSlip.js'
import { odds, leagueOrder } from '../constants/index'
import { getLeagueName } from '../utils/get-league-name'


export const Sportsbook = ({ updateBets }) => {

    const [ marketData, setMarketData ] = useState({
        dataObtained : false,
        leagues : [],                        
    })
    const [ betslip, setBetslip ] = useState({
        match: '', 
        matchresult: '',
        odd: 0,
        bet: '',
        potentialWin: 0,
        betInputDisabled: true,
        placeBetDisabled: true,
        betPlacedSuccessfully: 'none',            
    })
    const [ leagueTables, setLeagueTables ] = useState([])

    let timer            
    
    const getOdd = element =>          
        setBetslip({ 
            match: element.match, 
            matchresult: element.matchresult, 
            odd: element.odd, 
            bet: '',
            potentialWin: betslip.bet * betslip.odd, 
            betInputDisabled: false ,
            placeBetDisabled: true,
            betPlacedSuccessfully: 'none',            
        })                
    
    
    const inputBet = event => {     
        const re = /^[0-9\b]+$/
        const bet = event.target.value        
        let potentialWin
                
        if (bet == '' || re.test(bet)) {
            if(bet <= 5000) {
                potentialWin = bet * betslip.odd
                if(bet > 0)
                    setBetslip( { ...betslip, bet: bet, potentialWin: potentialWin, placeBetDisabled: false } )        
                else    //in case user presses backspace, 'Place Bet' button needs to be disabled
                    setBetslip( {  ...betSlip, bet: bet, potentialWin: potentialWin, placeBetDisabled: true } )        
            }
         }         
    }

    const placeBet = () => {
        //read bet details
        const bet = { 
            match: betslip.match, 
            matchresult: betslip.matchresult, 
            odd: betslip.odd, 
            bet: betslip.bet,  
        }
        
        //pass the new bet to the parent (App) through a function forwarded from App to Sportsbook        
        updateBets(bet)

        //clear betslip        
        setBetslip({ 
            match: '', 
            bet: '', 
            odd: '', 
            matchresult: '', 
            potentialWin: 0, 
            betInputDisabled: true, 
            placeBetDisabled: true, 
            betPlacedSuccessfully: 'block' 
        })        

        //Timers need to be cleared when component unmounts to prevent them still running and the component being destroyed: an error would result
        startTimer() 
    }

    const startTimer = () => 
        timer = setTimeout(() => setBetslip( { ...betslip, betPlacedSuccessfully: 'none' }), 2000)    

    const stopTimer = () => clearTimeout(timer)
        
    useEffect(() => {
        getMarketData()
        
        return stopTimer()
    }, [])


    const getMarketData = ()  => {
        let socket = io() 
        let leagues = []             
        let league
        let leagueName
        let matchOdds = odds[Math.floor(Math.random() * odds.length)]
        const newLeagueTables = []         
        
        socket.emit('leagues', {})
        
        socket.on('leagues', function(data) {              
            data = JSON.parse(data)
            for(let i = 0; i < data.length; i++) {
                league = JSON.parse(data[i].data)                
                leagueName = getLeagueName(league.competition.id)                
                leagues.push( { 
                            "leagueName": leagueName,
                            "league": league
                        } )
            }            
            
            //include odds
            for(let i = 0; i < data.length; i++) {
                for(let j = 0; j < data.length; j++) {
                    matchOdds = odds[Math.floor(Math.random() * odds.length)]
                    leagues[i].league.matches[j].odds = matchOdds
                }
            }
           
            for(let i = 0; i < leagues.length; i++)
            {                
                let j = 0
                while(leagueOrder[i] !== leagues[j].league.competition.id)
                    j++

                    newLeagueTables.push(<Table 
                        key={leagues[j].league.competition.id + "_" + j} 
                        id={leagues[j].league.competition.id} 
                        league={leagues[j]} 
                        getOdd={getOdd} 
                    />)
            }

            setLeagueTables(newLeagueTables)

            setMarketData({ 
                leagues: leagues,                
                dataObtained: true
            })                  
            
            socket.disconnect()   
        })         
         
    }

        if (marketData.dataObtained)         
        {            
            return (
                
                <div>                    
                    <div className="div-main">                                    
                        <h1 className="h1-football">Football</h1>
                        <div>                    
                            <Leagues />
                            <div className="matches">
                                {leagueTables}
                            </div>
                            <div className="betting-slip">
                                <BettingSlip 
                                    match={betslip.match}
                                    matchresult={betslip.matchresult}
                                    odd={betslip.odd}
                                    bet={betslip.bet}
                                    betInputDisabled={betslip.betInputDisabled}
                                    placeBetDisabled={betslip.placeBetDisabled}
                                    inputBet={inputBet}
                                    placeBet={placeBet}
                                    potentialWin={betslip.potentialWin}
                                    betPlacedSuccessfully={betslip.betPlacedSuccessfully}>
                                </BettingSlip>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else 
            return null
    }

