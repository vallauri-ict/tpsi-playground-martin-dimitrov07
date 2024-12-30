'use strict'
const URL = "https://randomuser.me/api"

$(document).ready(function(){	
	
	let _table = $("#wrapper").children("table");

	let request = inviaRichiesta("get", "/api", { "results": 100 });
	request.catch(errore)
	request.then(function(results){	
		console.log(results)
		
		for (const person of results.data.results) {
			let tr = $("<div>").appendTo(_table.children);
			let name = person.name.first + " " + person.name.last;
			$("<td>").appendTo(tr).text(name);
			$("<td>").appendTo(tr).text(person.nat);
			$("<td>").appendTo(tr).text(person.location.country);
			$("<td>").appendTo(tr).text(person.location.state);
			$("<td>").appendTo(tr).text(person.location.cell);
			$("<td>").appendTo(tr).append($("<img>").prop("src", person.picture.thumbnail));
		}
	});		
})






function errore(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
	else if (jqXHR.status == 200)
        alert("Formato JSON non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}