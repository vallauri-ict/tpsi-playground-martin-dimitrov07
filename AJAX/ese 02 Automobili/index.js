"use strict"

$(document).ready(function () {
	
	let _lstMarche = document.getElementById("lstMarche");
	let _lstModelli = document.getElementById("lstModelli");
	let _table= document.getElementsByTagName("table")[0];
	let _dettagli = document.querySelector(".details");
	let _tbody = _table.lastElementChild;
	let _btnUpdatePrice = document.getElementById("btnAggiorna");

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
		getModelli(codMarca); 
	});

	function getModelli(codMarca){		
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
	}

	_lstModelli.addEventListener("change", function(){
		const codModello = this.value;
		//const selectedText = this.options[this.selectedIndex].textContent;
		const selectedText = this.selectedOptions[0].textContent;
		getCars(codModello, selectedText)
	})

	function getCars(codModello, selectedText){
		const aus = selectedText.split(" - ");
		const nomeModello = aus[0];
		const tipoAlimentazione = aus[1];

		let request = inviaRichiesta("GET", "/automobili", {"codModello": codModello});

		request.catch(errore);
		request.then(function(response){
			const automobili = response.data;

			_tbody.innerHTML = "";
			$(_table).show();

			for (const auto of automobili) {
				const tr = document.createElement("tr");
				_tbody.appendChild(tr);

				let td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = nomeModello;

				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = tipoAlimentazione;

				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = auto.colore;

				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = auto.anno;

				td = document.createElement("td");
				tr.appendChild(td);
				const img = document.createElement("img");
				img.src = "./img/" + auto.img;
				img.style.height = "65px";
				td.appendChild(img);

				td = document.createElement("td");
				tr.appendChild(td);
				let btn = document.createElement("button");
				btn.classList.add("btn", "btn-success", "btn-sm");
				btn.addEventListener("click", function(){ getDetails(auto); })
				btn.textContent = "dettagli";
				td.appendChild(btn);

				td = document.createElement("td");
				tr.appendChild(td);
				btn = document.createElement("button");
				btn.classList.add("btn", "btn-secondary", "btn-sm");
				btn.textContent = "elimina";
				btn.addEventListener("click", function(){
					elimina(auto.id);
				})
				td.appendChild(btn);
			}
		})
	}

	function getDetails(auto){
		let request = inviaRichiesta("GET", "/modelli/" + auto.codModello); //restituisce record
		//let request = inviaRichiesta("GET", "/modelli", { "id": auto.codModello }); restituisce vettore di record
		$(_dettagli).show();

		request.catch(errore);

		request.then(function(response){
			const modello = response.data;

			let txts = _dettagli.querySelectorAll("input[type=text]");
			txts[0].value = auto.id;
			txts[1].value = modello.nome;
			txts[2].value = modello.alimentazione;
			txts[3].value = modello.cilindrata;
			txts[4].value = auto.targa;
			txts[5].value = auto.colore;
			txts[6].value = auto.anno;
			txts[7].value = auto.km;
			txts[8].value = auto.prezzo;
			const img = document.getElementById("imgLarge");
			img.src = "./img/" + auto.img;
			img.style.height = "100px";
		})

	}

	function elimina(idAuto)
	{
		//DELETE
		let request = inviaRichiesta("DELETE", "/automobili/" + idAuto); //id passato solo in coda alla risorsa

		request.catch(errore);
		request.then(function(response){
			console.log(response.data);
			getCars(_lstModelli.value,  _lstModelli.selectedOptions[0].textContent);
			alert("Automobile eliminato correttamente");
		})
	}

	_btnUpdatePrice.addEventListener("click", function(){
		let idAuto = document.getElementById("txtId").value;
		let prezzo = parseInt(document.getElementById("txtPrezzo").value);
		
		//let request = inviaRichiesta("PATCH", "/automobili/" + idAuto, { "prezzo": prezzo });
		let request = inviaRichiesta("PATCH", "/automobili/" + idAuto, { prezzo }); //crea una chiave JSON che si chiama prezzo che ha come contenuto il valore della variabile prezzo (se la chiave c'è già la sovrascrive)

		request.catch(errore);
		request.then(function(response){
			alert("Prezzo dell'automobile modificato correttamente");
			$(_dettagli).hide();
			getCars(_lstModelli.value, _lstModelli.selectedOptions[0].textContent);
		})
		
	})
});


