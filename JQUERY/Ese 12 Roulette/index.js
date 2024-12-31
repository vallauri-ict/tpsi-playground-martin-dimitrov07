"use strict";

const RIGHE = 5
const COLONNE = 14
const x0 = 32
const y0 = 11
   
let randNums = [];
let randNum;
   
$(document).ready(function(){
	let tappeto=$("#mainFrame>div")
	let imgRoulette=$("#mainFrame>img") 
	let numRoulette=$("#mainFrame>span")
	let punti = $("#leftFrame p")
	let btnAvviaRoulette = $("button");

	btnAvviaRoulette.on("click", avviaRoulette);

	function avviaRoulette(){
		imgRoulette.attr("src", "./img/rouletteMov.gif");
		$(".casella").off("click");
		$(this).off("click");

		setTimeout(function(){
			imgRoulette.attr("src", "./img/roulette.gif");

			scriviNumsGenerati();
			controlloFiches();
			$(".casella").on("click", puntata);
			let caselleOff = $(".casella").filter(function(){
				return $(this).prop("win") == 0;
			})
			caselleOff.off("click");
			console.log(caselleOff);
			btnAvviaRoulette.on("click", avviaRoulette); 
		}, 3000)
	}

	let x, y;
	y = y0;
	let z = 0;

	for (let i = 0; i < RIGHE; i++) {
		x = x0;

		for (let j = 0; j < COLONNE; j++) {
			let div = $("<div>", {
				"appendTo": tappeto,
				"addClass": "casella",
				"css": {
					"top": y,
					"left": x
				},
				"prop": {
					"id": json[z].id,
					"numbers": json[z].numbers,
					"win": json[z].win,
					"color": json[z++].color 
				}
			})

			if(div.prop("win") != 0)
			{
				div.on("click", puntata);
			}

			x+=53;
		}
		y+=53;
	}

	function puntata(){
		if(parseInt(punti.text()) > 0)
		{
			if(this.children.length == 0)
			{
				$("<div>", {
					"appendTo": $(this),
					"addClass": "fiche"
				})

				punti.text(parseInt(punti.text()) - 1);
			}
			else
			{
				$(this).children().eq(0).remove();
				punti.text(parseInt(punti.text()) + 1);
			}
		}
		else
		{
			$(".pedina").off("click");
		}
	}

	function controlloFiches(){
		let win = 0;

		for (const fiche of $(".fiche")) 
		{
			const casella = $(fiche).parent();

			// console.log(casella.prop("numbers"));
			// console.log(randNum);

			if(casella.prop("numbers").includes(randNum))
				win += casella.prop("win");				
			else
				$(fiche).remove();
		}

		setTimeout(function(){
			alert("Hai vinto " + win + " fiches");
			
			let n = 0;
			let timer = setInterval(function(){
				if(n < win)
					punti.text(parseInt(punti.text()) + 1);
				else
				{
					clearInterval(timer);
					$(".fiche").remove();
				}

				n++;
			}, 200);
		}, 400);
	}

	function scriviNumsGenerati(){
		randNum = generaCasuale(0, 37);
		randNums.unshift(randNum); //unshift fa la push in testa al vettore

		randNums.forEach(function(num, i){
			numRoulette.eq(i).text(num);

			let casella = json.find(function(record){
				return record.value == num;
			})
			numRoulette.eq(i).css({
				"backgroundColor": casella.color
			})
		})

	}
})

function generaCasuale(min, max){
	return Math.floor((max-min) * Math.random()) + min;
}

