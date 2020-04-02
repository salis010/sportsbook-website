# sportsbook

Basic sportsbook functionality in Node and React. (The brand is fictitious)

![](images/screenshot.png)

Run with `node server`

Since this is just a working example, information on upcoming matches is not updated continuously but rather the games from the same match-day are always shown.

Yet, the functionality to obtain this data on the fly is available in the file '/backend/getData.js', which can be run directly via node. This code fetches data via an api from 'api.football-data.org' (however please request a free access token from this website in order to access the data and input it in 'X-Auth-Token' on line 32.

On the client side, the sportsbook.js file accesses the data residing on the server via socketing. This request is processed by the node server (server.js) which emits the data in the repository file ("leagues.txt"). In a real production scenario this would obviously be a database not a text file.

The match and odds information is ultimately displayed on screen.

Consult the LibreOffice doc Football.odt for more info.

Place your bets!

## Note

Not optimized for mobile.