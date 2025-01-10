'use strict'
const URL = "https://randomuser.me/api"

$(document).ready(function(){	
	
	let _table = $("#wrapper").children("table");

	let request = inviaRichiesta("GET", "/api", { "results": 100 });
	request.catch(errore)
	request.then(function(results){	
		console.log(results.data);
		
		for (const person of results.data.results) {
			let tr = $("<tr>").appendTo(_table.children("tbody"));
			let name = person.name.first + " " + person.name.last;
			$("<td>").appendTo(tr).text(name);
			$("<td>").appendTo(tr).text(person.nat);
			$("<td>").appendTo(tr).text(person.location.country);
			$("<td>").appendTo(tr).text(person.location.state);
			$("<td>").appendTo(tr).text(person.cell);
			$("<td>").appendTo(tr).append($("<img>").prop("src", person.picture.thumbnail));
		}

		//trasforma la tabella aggiungendo tantissime funzionalità
		//DEVE essere applicato SOLO a un tag table HTML
		_table.DataTable();
	});		
})