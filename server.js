const express = require('express')
const app = express()
const server = require('http').createServer(app) 
const io = require('socket.io').listen(server)
const fs = require('fs')

const port = 3000

app.use(express.static(__dirname + '/dist'))

server.listen(port, function () {
	console.log(`Listening on port ${port}`)
})

//Socketing
io.on('connection', function(socket){

    socket.on('leagues', function(data) {
		console.log("Getting competition data...")
		getCompetitionData(socket)
	})	
})

function getCompetitionData(socket) {
	//read file from disk
	fs.readFile("backend/leagues.txt", 'utf-8', (err, data) => {
		if(err) throw err
		else {
			console.log("leagues.txt read successfully")			
			socket.emit('leagues', data)
		}
	})
}