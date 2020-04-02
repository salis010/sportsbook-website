import React from 'react'

export const League = ({ href, league }) =>         
        <tr>
                <td 
                        className="td-league" 
                >
                <a href={href}>
                        {league}
                </a>
                </td>
        </tr>       
