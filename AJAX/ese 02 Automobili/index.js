"use strict"

$(document).ready(function () {
	
	let _lstMarche = document.getElementById("lstMarche");
	let _lstModelli = document.getElementById("lstModelli");
	let _table= document.getElementsByTagName("table")[0];
	let _dettagli = document.querySelector(".details");

	$(_table).hide()
	$(_dettagli).hide()

	getMarche();

	function getMarche(){
		let request = inviaRichiesta("GET", "/marche");

		request.catch(errore);
		request.then(function(response){
			let marche = response.data;
			console.log(marche);

			for (const marca of marche) {
				let opt = document.createElement("option");
				_lstMarche.appendChild(opt);
				opt.value = marca.id;
				opt.textContent = marca.nome;
			}

			_lstMarche.selectedIndex = -1;
		})
	}

	_lstMarche.addEventListener("change", function(){
		const codMarca = this.value;
		
		let request = inviaRichiesta("GET", "/modelli", {"codMarca": codMarca});

		request.catch(errore);
		request.then(function(response){
			let modelli = response.data;

			_lstModelli.innerHTML = "";

			for(const modello of modelli){
				let opt = document.createElement("option");
				_lstModelli.appendChild(opt);
				opt.value = modello.id;
				opt.textContent = modello.nome + " - " + modello.alimentazione;
			}

			_lstModelli.selectedIndex = -1;
		})
	})

	_lstModelli.addEventListener("change", function(){
		let codModello = this.value;

		let request = inviaRichiesta("GET", "/automobili", {"codModello": codModello});

		request.catch(errore);
		request.then(function(response){
			
		})
	})

});


