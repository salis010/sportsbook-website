
'use strict';

import React from 'react';

export const Match = (props) => {
    if(props.odds) //required, since the object seems to render twice and the props object is not available with calls to it leading to an error    
    {
        const match = props.homeTeam + " vs " + props.awayTeam;
            return (                
                <tr>
                    <td className="match">{match}</td>
                    <TableCell matchresult={1} match={match} getOdd={props.getOdd} odd={props.odds[0].toFixed(2)}/>
                    <TableCell matchresult={"X"} match={match} getOdd={props.getOdd} odd={props.odds[1].toFixed(2)}/>
                    <TableCell matchresult={2} match={match} getOdd={props.getOdd} odd={props.odds[2].toFixed(2)}/>                    
                </tr>
            );
    }
        return null;
}

class TableCell extends React.Component {
    constructor(props) {
        super(props);

        this.timer = "timer";
        this.state = { showTooltip: "none" };
        
        this.clickHandler = this.clickHandler.bind(this);
        this.startToolTipTimer = this.startToolTipTimer.bind(this);
        this.stopToolTipTimer = this.stopToolTipTimer.bind(this);
    }
 
    clickHandler() {       
        this.setState( { showTooltip: "block"} );
        this.props.getOdd(this.props);
        this.startToolTipTimer();    //timer must be cancelled in componentWillUnmount in case the user switches page and the timer is still running: an error would result
    }

    startToolTipTimer() {
        this.timer = setTimeout(() => { this.setState( { showTooltip: "none"} ); }, 2000);
    }

    stopToolTipTimer() {
        clearTimeout(this.timer);
    }
    
    componentWillUnmount() {
        this.stopToolTipTimer();
    }

    render() {
        return (
            <td className="price" matchresult={this.props.matchresult} onClick={this.clickHandler}>
                {this.props.odd}                
                <div className="tooltip" style={{display:this.state.showTooltip}}>Betslip updated</div>                
                <div className="arrow" style={{display:this.state.showTooltip}}></div>                
            </td>
        );
    }
}
