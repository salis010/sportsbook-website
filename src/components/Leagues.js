import React from 'react'
import { League } from './League.js'

export const Leagues = () => {    
    return (
        <div className="leagues">
            <table className="leagues-table">
                <tbody>                    
                    <tr className="header-row"><td>Leagues</td></tr>
                    <League href="#2021" league="England - Premier League"/>
                    <League href="#2016" league="England - Championship"/>
                    <League href="#2014" league="Spain - La Liga"/>
                    <League href="#2019" league="Italy - Serie A"/>
                    <League href="#2002" league="Germany - Bundesliga"/>
                    <League href="#2015" league="France - Ligue 1"/>
                    <League href="#2003" league="Netherlands - Eredivisie"/>
                    <League href="#2017" league="Portugal - Premiera Liga"/>
                    <League href="#2013" league="Brazil - Serie A"/>                    
                </tbody>
            </table>
        </div>
    )
}
