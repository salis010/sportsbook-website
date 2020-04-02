const fs = require('fs')

getCompetitionData()

function getCompetitionData() {
	const https = require('https')
	const leagues = [
		{ "league": "2021", "data": [] },
		{ "league": "2016", "data": [] },	
		{ "league": "2014", "data": [] },
		{ "league": "2019", "data": [] },
		{ "league": "2002", "data": [] },
		{ "league": "2015", "data": [] },
		{ "league": "2003", "data": [] },
		{ "league": "2017", "data": [] },
		{ "league": "2013", "data": [] },				
	]

	let options
	let leaguePath
	let count = 0

	for(let i = 0; i < leagues.length; i++) {

		leaguePath = '/v2/competitions/' + leagues[i].league + '/matches?matchday=1'

		options = {
			hostname: 'api.football-data.org', //important: do not write the 'https//'	
			path: leaguePath,
			method: 'GET',	
			headers: {
				'X-Auth-Token': '***************'
			}
		}
		
		https.get(options, (resp) => {
			let matches = ''
					
			// A chunk of data has been recieved.
			resp.on('data', (chunk) => {
			matches += chunk
			})

		// The whole response has been received. Send out the result.
		resp.on('end', () => {					
			leagues[count].data = matches
			console.log(leagues[count].league)// + ": " + leagues[count].data)
			count++
			if (count === leagues.length)
			{								
				saveDataToFile(leagues)
			}
		})		
		
		}).on("error", (err) => {
			console.log("Error: " + err.message)
		})
	}
}

function saveDataToFile(leagues) {
	fs.writeFile("leagues.txt", JSON.stringify(leagues), function(err) {
		if(err) {
			return console.log(err)
		}

		console.log("The file was saved!")
		
		/*
		//Test: read file as string, parse to JSON, and print to console
		fs.readFile("leagues.txt", (err, data) => {
			if(err) throw err
			else {
				console.log(JSON.parse(data))
			}
		})
		*/
	})
}
