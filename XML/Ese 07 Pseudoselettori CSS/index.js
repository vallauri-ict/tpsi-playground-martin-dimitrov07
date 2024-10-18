"use strict"

window.onload = function() {

	let txtRis = document.querySelector("#txtRis");

	let vet = Array.from(document.querySelectorAll("#wrapper div, #wrapper p"))
	vet.forEach(function(item){ //può essere fatto solo sugli array | la i è facoltativa
		item.addEventListener("click", elabora)
	})


	function elabora() {
		txtRis.innerHTML=""	
		
		// La funzione elabora() fa un ciclo da 1 a nBoxes per vedere se
		// il _this corrente è nth-child(${i}) oppure nth-of-type(${i})
		let nBoxes = this.parentElement.children.length
		for (let i = 1; i <= nBoxes; i++){
			// 1 - i-esimo elemento generico 
			if (this.matches(`:nth-child(${i})`))
				visualizza(`nth-child(${i})`);
			// 2 - i-esimo elemento generico, ma solo se di tipo DIV		
			if (this.matches(`div:nth-child(${i})`))
				visualizza(`div:nth-child(${i})`);
			// 3 - i-esimo elemento generico, ma solo se di tipo P			
			if (this.matches(`p:nth-child(${i})`))
				visualizza(`p:nth-child(${i})`);

			// 4 - i-esimo elemento del suo tipo			
			if (this.matches(`:nth-of-type(${i})`))
				visualizza(`nth-of-type(${i})`);
			// 5 - i-esimo elemento del suo tipo, ma solo se di tipo DIV
			if (this.matches(`div:nth-of-type(${i})`))
				visualizza(`div:nth-of-type(${i})`);
			// 6 - i-esimo elemento del suo tipo, ma solo se di tipo P 
			if (this.matches(`p:nth-of-type(${i})`))
				visualizza(`p:nth-of-type(${i})`);
		}
	}

	function visualizza(msg) {
		txtRis.innerHTML = txtRis.innerHTML + msg + "<br>"
	}
	
	

}
