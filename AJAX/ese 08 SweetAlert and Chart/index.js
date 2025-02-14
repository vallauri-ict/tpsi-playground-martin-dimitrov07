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
		
		let request = inviaRichiesta("GET", "/api", { "results": nPeople });

		request.catch(errore);
		request.then((HTTPResponse) => {
			let people = HTTPResponse.data;

			for (const person of people) {
				
			}
		});
	})

})
