import React from 'react'

export const Account = () =>
    <div>
        <h1 className="h1-football">Account Information</h1>
        <table className="table-account">
            <tbody>
                <tr><td className="col1">Name:</td><td className="col2">Guest</td></tr>
                <tr><td className="col1">Surname:</td><td className="col2">Guest</td></tr>
                <tr><td className="col1">Gender:</td><td className="col2">M</td></tr>
                <tr><td className="col1">Address Line 1:</td><td className="col2">Arc de Triomphe</td></tr>
                <tr><td className="col1">Address Line 2:</td><td className="col2">Champ de Elysees</td></tr>
                <tr><td className="col1">Address Line 3:</td><td className="col2">Paris</td></tr>
                <tr><td className="col1">Country:</td><td className="col2">France</td></tr>
                <tr><td className="col1">Post Code:</td><td className="col2">PRS1111</td></tr>
                <tr><td className="col1">email:</td><td className="col2">guest@guest.com</td></tr>
                <tr><td className="col1">Telephone:</td><td className="col2">+356 123456789</td></tr>
                <tr><td className="col1">Username:</td><td className="col2">guest</td></tr>
            </tbody>
        </table>
        <div className="disclaimer">
            <p>This is a mock website used solely for testing. It is not possible to register, bet, deposit money, or otherwise partificapte in gambling of any kind.</p>
            <p>No data is stored on our servers; all data recorded during your session, such as 'bets placed' are recorded solely on your computer and not available any more as soon as the webpage is closed.</p>
            <p>Should you have any queries please contact stephen.saliba@gmail.com.</p>
        </div>
        <div className="div-spacer"></div>
    </div>