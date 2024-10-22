'use strict'

let wrapper;

window.onload = function() {
	wrapper = document.querySelector("#wrapper");
	let buttonsDiv = document.querySelector("#buttons");
	let btns = buttonsDiv.querySelectorAll("input[type=button]");

	for (const btn of btns) {
		btn.addEventListener("click", manageBtns);
	}

	function manageBtns(){
		switch(this.value)
		{
			case "Conta n di elementi":
				alert("Elementi: " + contaElementi());
				break;
			
			case "Visualizza testi":
				alert("Testi: " + testiElementi());
				break;

			case "ricolora a sfondo giallo tutte le voci di menù con indice pari":
				gialloPari();
				break;

			case "ricolora le 5 voci di menù con indice dispari con un colore di sfondo verde con luminosità crescente (rispettivamente 50, 100, 150, 200, 250)":
				verdeLuminosita();
				break;
		}
	}

	function contaElementi()
	{
		let cont = 0;

		for (const item of wrapper.children) {
			cont++;
		}

		return cont;
	}
	
	function testiElementi()
	{
		let testo = "";

		for (const item of wrapper.children) {
			testo += item.textContent + " ";
		}
		return testo;
	}

	function gialloPari(){
		for (const item of wrapper.children) {
			item.style.backgroundColor = "";

			if(item.matches(":nth-of-type(even)"))
				item.style.backgroundColor = "yellow";
		}
	}

	function verdeLuminosita(){
		let green = 50;

		let oddElements = wrapper.querySelectorAll("li:nth-of-type(odd)");

		for (const element of oddElements) {
			element.style.backgroundColor = `rgb(0, ${green}, 0)`;
			green+=50;
		}

		/*
		for (const item of wrapper.children) {
			item.style.backgroundColor = "";

			if(item.matches(":nth-of-type(odd)"))
			{
				item.style.backgroundColor = `rgb(0, ${green}, 0)`;
				green+=50;
			}
		}
		*/
	}

}

function evidenzia(selector){
	for (const item of wrapper.children) {
		item.style.backgroundColor = "";
		
		if(item.matches(selector))
			item.style.backgroundColor = "yellow";
	}
}