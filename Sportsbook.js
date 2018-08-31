import React from 'react';
import { Leagues } from './components/Leagues.js';
import { Table } from './components/Table.js';
import { BettingSlip } from './components/BettingSlip.js';

const odds = [ [3.40, 1.85, 3.90], [3.00, 2.00, 3.50], [1.25, 4.00, 15.00], [5.50, 2.75, 1.75], [3.10, 1.72, 5.00], [2.50, 3.25, 2.55], [16.00, 9.00, 1.07], [19.00, 10.00, 1.07], [4.00, 3.40, 2.05], [1.90, 3.60, 4.50], [2.55, 3.40, 2.99], [6.50, 4.10, 1.60], [2.40, 3.20, 3.40], [2.40, 3.30, 3.30], [1.25, 6.50, 13.00], [1.85, 3.50, 5.00], [4.00, 4.00, 1.90], [2.25, 3.30, 3.10], [2.25, 3.90, 4.60], [2.65, 3.45, 2.62], [2.87, 3.10, 3.50], [2.62, 3.50, 2.87] ];
let socket;
let leagueTables;
const leagueOrder = [2021, 2016, 2014, 2019, 2002, 2015, 2003, 2017, 2013, 2001];

export class Sportsbook extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataObtained : "",
            leagues : [],                        
            match: '', 
            matchResult: '',
            odd: 0,
            bet: '',
            potentialWin: 0,
            betInputDisabled: true,
            placeBetDisabled: true,
            betPlacedSuccessfully: 'none',            
            iconMenuDisplay: 'none'
        }

        this.timer;
          
        //this.trimTeamNames = this.trimTeamNames.bind(this);        
        this.getLeagueName = this.getLeagueName.bind(this);
        this.getOdd = this.getOdd.bind(this);
        this.inputBet = this.inputBet.bind(this);
        this.placeBet = this.placeBet.bind(this);        
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }
    
    getOdd(element) {                 
        
        const match = element.match;
        const matchResult = element.matchresult;
        const odd = element.odd;        
        const bet = this.state.bet;
        const potentialWin = bet * odd;              
        this.setState( { match: match, matchResult: matchResult, odd: odd, potentialWin: potentialWin, betInputDisabled: false } );                
    }

    inputBet(event) {     
        const re = /^[0-9\b]+$/;
        const bet = event.target.value;        
        let potentialWin;
                
        if (bet == '' || re.test(bet)) {
            if(bet <= 5000) {
                potentialWin = bet * this.state.odd;
                if(bet > 0)
                    this.setState( { bet: bet, potentialWin: potentialWin, placeBetDisabled: false } );        
                else    //in case user presses backspace, 'Place Bet' button needs to be disabled
                    this.setState( {  bet: bet, potentialWin: potentialWin, placeBetDisabled: true } );        
            }
         }         
    }

    placeBet() {
        
        //read bet details
        const bet = { match: this.state.match, matchResult: this.state.matchResult, odd: this.state.odd, bet: this.state.bet  };
        
        //pass the new bet to the parent (App) through a function forwarded from App to Sportsbook        
        this.props.updateBets(bet);

        //clear betslip        
        this.setState( { match: '', bet: '', odd: '', matchResult: '', potentialWin: 0, betInputDisabled: true, placeBetDisabled: true, betPlacedSuccessfully: 'block' }  );        

        this.startTimer(); //Timers need to be cleared in componentWillUnmount to prevent them still running and the component being destroyed: an error would result
    }

    startTimer() {
        this.timer = setTimeout(() => { this.setState( { betPlacedSuccessfully: 'none' } ); }, 2000);
    }

    stopTimer() {
        clearTimeout(this.timer);
    }
    
    componentWillUnmount() {
        this.stopTimer();
    }

    componentWillMount() {
        
        socket = io(); 
        let leagues = [];             
        let league;
        let leagueName;
        let matchOdds = odds[Math.floor(Math.random() * odds.length)];
        leagueTables = [];         
        
        socket.emit('leagues', {'message': 'Message from client'});
        
        socket.on('leagues', function(data) {              
            data = JSON.parse(data);
            for(let i = 0; i < data.length; i++) {
                league = JSON.parse(data[i].data);                
                leagueName = this.getLeagueName(league.competition.id);                
                leagues.push( { 
                            "leagueName": leagueName,
                            "league": league
                        } );
            }            
            //include odds
            for(let i = 0; i < data.length; i++) {
                for(let j = 0; j < data.length; j++) {
                    matchOdds = odds[Math.floor(Math.random() * odds.length)];
                    leagues[i].league.matches[j].odds = matchOdds;
                }
            }
           
            for(let i = 0; i < leagues.length; i++)
            {                
                let j = 0;
                while(leagueOrder[i] !== leagues[j].league.competition.id)
                    j++;

                leagueTables.push(<Table key={leagues[j].league.competition.id + "_" + j} id={leagues[j].league.competition.id} league={leagues[j]} getOdd={this.getOdd} />);
            }

            this.setState( { 
                leagues: leagues,                
                dataObtained: true
            });                    
            
            socket.disconnect();            
        }.bind(this));        
    }

    render() {       
        
        if (this.state.dataObtained)         
        {            
            return (
                
                <div>                    
                    <div className="div-main">                                    
                        <h1 className="h1-football">Football</h1>
                        <div>                    
                            <Leagues selectLeague={this.selectLeague}/>
                            <div className="matches">
                                {leagueTables}
                            </div>
                            <div className="betting-slip">
                                <BettingSlip 
                                    match={this.state.match}
                                    matchResult={this.state.matchResult}
                                    odd={this.state.odd}
                                    bet={this.state.bet}
                                    betInputDisabled={this.state.betInputDisabled}
                                    placeBetDisabled={this.state.placeBetDisabled}
                                    inputBet={this.inputBet}
                                    placeBet={this.placeBet}
                                    potentialWin={this.state.potentialWin}
                                    betPlacedSuccessfully={this.state.betPlacedSuccessfully}>
                                </BettingSlip>
                            </div>
                        </div>
                    </div>
                </div>
            );    
        }
        else 
            return null;
    }

    getLeagueName(id) {        
        switch(id) {
            case 2021:
                return "England - Premier League";
            case 2016:
                return "England - Championship";
            case 2014:
                return "Spain - La Liga";
            case 2019:
                return "Italy - Serie A";
            case 2002:
                return "Germany - Bundesliga";
            case 2015:
                return "France - Ligue 1";
            case 2003:
                return "Netherlands - Eredivisie";
            case 2017:
                return "Portugal – Premeira Liga";
            case 2013:
                return "Brazil - Serie A";                
            default:
                return "Not Found";
        }
    }

    /* Can be used to trim off 'FC' at the end of most English football club names
    trimTeamNames(data) {
        let name;
    
        for(let i = 0; i < data.length; i++)
        {
            name = data[i].homeTeam.name;            
            if(name.substr(name.length - 3, 3) === " FC") 
                data[i].homeTeam.name = name.substring(0, name.length - 3);
            if(name.substr(name.length - 4, 4) === " AFC") 
                data[i].homeTeam.name = name.substring(0, name.length - 4);
            
            name = data[i].awayTeam.name;            
            if(name.substr(name.length - 3, 3) === " FC") 
                data[i].awayTeam.name = name.substring(0, name.length - 3);
            if(name.substr(name.length - 4, 4) === " AFC") 
                data[i].awayTeam.name = name.substring(0, name.length - 4);
        }
        return data;
    }
    */   
}