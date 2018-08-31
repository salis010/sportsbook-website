import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,    
    Route,
    Switch
  } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Header } from './components/Header.js';
import { Sportsbook } from './Sportsbook.js';
import { Account } from './components/Account.js';
import { Bets } from './components/Bets.js';
import { Footer } from './components/Footer.js';

const mountNode = document.getElementById('mountNode');

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {            
            iconMenuDisplay: 'none',
            bets: []
        }

        this.iconClick = this.iconClick.bind(this);
        this.updateBets = this.updateBets.bind(this);
    }

    iconClick() {                
        if(this.state.iconMenuDisplay === 'none')
            this.setState( { iconMenuDisplay: 'block' } );
        else
            this.setState( { iconMenuDisplay: 'none' } );        
    }

    updateBets(bet) {
        const bets = this.state.bets;
        bets.push(bet);
        
        this.setState( { bets: bets } );
    }

    render() {
        return (
            <Router>  
                <div>
                    <div>
                        <Header iconClick={this.iconClick} iconMenuDisplay={this.state.iconMenuDisplay}/>
                        <div className="div-carousel">
                            <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} stopOnHoever={true} showThumbs={false}>
                                <div><img src="/images/banner1.jpg"/></div>
                                <div><img src="/images/banner2.jpg"/></div>
                                <div><img src="/images/banner3.jpg"/></div>
                                <div><img src="/images/banner4.jpg"/></div>
                            </Carousel>
                        </div>                           
                    </div>

                    <Switch>      
                        <Route exact path="/" render={() => <Sportsbook updateBets={this.updateBets} />}/>
                        <Route path="/account" component={Account} />
                        <Route path="/bets"  render={() => <Bets bets={this.state.bets} />}/>
                    </Switch>

                    <Footer />
                </div>            
            </Router>
        );
    }
}

ReactDOM.render(<App />, mountNode);