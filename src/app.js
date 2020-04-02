import React, { useState } from 'react'
import {
    BrowserRouter as Router,    
    Route,
    Switch
  } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import { Header } from './components/Header.js'
import { Sportsbook } from './components/Sportsbook.js'
import { Account } from './components/Account.js'
import { Bets } from './components/Bets.js'
import { Footer } from './components/Footer.js'
import { carouselImages } from './images/index'


export const App = () => {

    const [ iconMenuDisplay, setIconMenuDisplay ] = useState('none')
    const [ bets, setBets ] = useState([])

    const iconClick = () => {                
        if(iconMenuDisplay === 'none') {
            setIconMenuDisplay('block')
        } else {
            setIconMenuDisplay('none')        
        }
    }

    const updateBets = bet => {
        const newBets = bets
        bets.push(bet)
        
        setBets(newBets)
    }

    return (
        <Router>  
            <div>
                <div>
                    <Header 
                        iconClick={iconClick}
                        iconMenuDisplay={iconMenuDisplay}
                    />
                    <div className="div-carousel">
                        <Carousel 
                            autoPlay={true} 
                            infiniteLoop={true} 
                            showStatus={false} 
                            stopOnHoever={true} 
                            showThumbs={false}
                        >
                            {carouselImages.map((image, i) => 
                                <div key={i}>
                                    <img src={image}/>
                                </div>
                            )}
                        </Carousel>
                    </div>                           
                </div>

                <Switch>      
                    <Route exact path="/" render={() => <Sportsbook updateBets={updateBets} />}/>
                    <Route path="/account" component={Account} />
                    <Route path="/bets"  render={() => <Bets bets={bets} />}/>
                </Switch>

                <Footer />
            </div>            
        </Router>
    )
}

