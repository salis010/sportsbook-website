
import React from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'

export const TableTitle = (props) => {
    const id = props.id.toString()
    return(
        <ScrollableAnchor id={id}>
            <tr id={props.id} className="header-row"><td className="match">{props.title}</td><td className="outcome">1</td><td className="outcome">X</td><td className="outcome">2</td></tr>
        </ScrollableAnchor>
    )
}
