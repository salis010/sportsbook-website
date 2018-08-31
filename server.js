const express = require('express');
const app = express();
const http = require('http');
const server = require('http').createServer(app); 
const io = require('socket.io').listen(server);
const fs = require('fs');

app.use(express.static(__dirname));

server.listen(3000, function () {
	console.log('Listening on port 3000');
});

//Socketing
io.on('connection', function(socket){

    socket.on('leagues', function(data) {
		console.log("Getting competition data...");
		getCompetitionData(socket);
	});	
});

function getCompetitionData(socket) {
	//read file from disk
	fs.readFile("leagues.txt", 'utf-8', (err, data) => {
		if(err) throw err;
		else {
			console.log("leagues.txt read successfully");			
			socket.emit('leagues', data);
		}
	});
}