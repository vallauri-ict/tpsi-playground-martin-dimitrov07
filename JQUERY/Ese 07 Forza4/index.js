"use strict";
const RIGHE = 6;
const COLONNE = 7;
const GIALLO = "#FF0"
const ROSSO = "#F00"
let turno = GIALLO;

$(function () {
	let header = $("#header");
	let wrapper = $("#wrapper");


	creaHeader();
	creaCampo();

	function creaCampo(){
		for (let i = 0; i < RIGHE; i++) {
			for (let j = 0; j < COLONNE; j++) {
				const div = $("<div>").addClass("pedina")
				.prop("id", i + "-" + j)
				.appendTo(wrapper);
			}
		}
	}

	function creaHeader(){
		for (let i = 0; i < COLONNE; i++) {
			const div = $("<div>").addClass("pedina").appendTo(header);
			div.prop("id", i);
			div.on("mouseover", function(){
				if(turno == GIALLO)
				{
					div.css("backgroundColor", GIALLO);
				}
				else
				{
					div.css("backgroundColor", ROSSO);
				}
			});
			div.on("mouseout", function(){
				div.css("backgroundColor", "");
			});
			div.on("click", discesa);
		}
	}

	function discesa(){
		let colonna = this.id;
		let riga;

		for (riga = 0; riga < RIGHE; riga++) {
			let id = `${riga}-${colonna}`;
			let div = $("#" + id);
			if(div.prop("occupato"))
				break;
		}

		if(riga == 0)
		{
			alert("Mossa non valida");
			return;
		}

		riga--;

		let posIniziale = 
		{
			"position": "absolute",
			"top": 5,
			"left": 60*colonna + 5,
			"backgroundColor": turno
		}

		let posFinale =
		{
			"top": 60*(riga) + 5,
			"left": 60*colonna + 5
		}

		cambioTurno();
		header.children().off("click");
		$(this).css("backgroundColor", turno);

		$("<div>").addClass("pedina")
		.css(posIniziale)
		.appendTo(wrapper)
		.animate(posFinale, 200*riga, function(){
			$(`#${riga}-${colonna}`).prop("occupato", true);
			if(controlloVincita())
				alert("Bravo! Hai vinto");
			else
				header.children().on("click", discesa);
		})
	}
			
	function cambioTurno(){
		if(turno == GIALLO)
			turno = ROSSO;
		else
			turno = GIALLO;
	}

	function controlloVincita(){
		return false;
	}
});