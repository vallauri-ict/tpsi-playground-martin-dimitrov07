"use strict";

$(document).ready(function(){		
	const wrapper = $("#wrapper")[0]
	const table = $("table")[0]
	const canvasContainer = $("#canvas")[0] 
	const canvas = $("canvas")[0]

	$("a").hide();
	$(table).hide();
	$(canvasContainer).hide()
	
	let chart;
	
	btnInvia.addEventListener("click", async () => {
		//result (response) che in questo caso è un numero contenente la scelta effettuata (quanti utenti) 
		let result = await Swal.fire({
			"title": "<b>How many people?</b>",
			"icon": "question",
			"input": "range",
			"inputLabel": "Inserire un numero tra 1 e 100",
			"inputAttributes": {
				"min": 1,
				"max": 100,
				"step": 1
			},
			"inputValue": 100,
			"width": "400px",
			"background": "#cfc",
			"showCancelButton": true
		});

		let nPeople = result.value;
		let nazioni = [];
		//{nazione: "italia", "persone": 3}
		let request = inviaRichiesta("GET", "/api", { "results": nPeople });

		request.catch(errore);
		request.then((HTTPResponse) => {
			let people = HTTPResponse.data.results;

			for (const person of people) {
				let item = nazioni.find(item => item.nazione == person.location.country);
				if(item)
					item.persone++;
				else
					nazioni.push({"nazione": person.location.country, "persone": 1});
			}

			//console.log(nazioni);
			$("a").eq(0).show();
			//salvo tabella su disco
			let json = JSON.stringify(nazioni, null, 2);
			let blob = new Blob([json], {type: "application/json"});
			let uriBlob = URL.createObjectURL(blob);
			$("a").prop("href", uriBlob);
			//visualizzo tabella
			$(table).show();
			table.querySelector("tbody").innerHTML = "";
			for (const nazione of nazioni) {
				let tr = document.createElement("tr");
				let td = document.createElement("td");
				td.innerHTML = nazione.nazione;
				tr.appendChild(td);
				td = document.createElement("td");
				td.innerHTML = nazione.persone;
				tr.appendChild(td);
				table.querySelector("tbody").appendChild(tr);
			}

			//creazione grafico
			let keys = nazioni.map(item => item.nazione);
		});
	})

})
