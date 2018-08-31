'use strict';

import React from 'react';

export const League = (props) =>         
        <tr><td className="td-league" onClick={props.selectLeague}><a href={props.href}>{props.league}</a></td></tr>       
