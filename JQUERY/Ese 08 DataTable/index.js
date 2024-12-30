'use strict'
const URL = "https://randomuser.me/api"

$(document).ready(function(){	
	
	let _table = $("#wrapper").children("table").children("tbody");

	let request = inviaRichiesta("GET", "/api", { "results": 100 });
	request.catch(errore)
	request.then(function(results){	
		console.log(results)
		
		for (const person of results.data.results) {
			let tr = $("<tr>").appendTo(_table);
			let name = person.name.first + " " + person.name.last;
			$("<td>").appendTo(tr).text(name);
			$("<td>").appendTo(tr).text(person.nat);
			$("<td>").appendTo(tr).text(person.location.country);
			$("<td>").appendTo(tr).text(person.location.state);
			$("<td>").appendTo(tr).text(person.cell);
			$("<td>").appendTo(tr).append($("<img>").prop("src", person.picture.thumbnail));
		}
	});		
})