"use strict"

const X0 = 152
const Y0 = 109;

const VERDE = "rgba(0, 200, 0, 0.5)"  // semitrasparente
const ROSSO = "rgba(255, 0, 0, 0.5)"  // semitrasparente
const BLU  =  "rgba(0, 0, 255, 0.5)"  // semitrasparente

let nomeFila =["T","S","R","Q","P","O","N","M","L","I",  "H","G","F","E","D","C","B","A"]
let nomeColonna=[28,26,24,22,20,18,16,14,12,10,8,6,4,2,  1,3,5,7,9,11,13,15,17,19,21,23,25,27]

let inizioFine = [
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 
	{"inizio":0, "fine":27}, 

	{"inizio":1, "fine":26}, 
	{"inizio":2, "fine":25}, 
	{"inizio":2, "fine":25}, 
	{"inizio":3, "fine":24}, 
	{"inizio":3, "fine":24}, 
	{"inizio":4, "fine":23}, 
	{"inizio":4, "fine":23}, 
	{"inizio":4, "fine":23}, 
]

const months = {
	"gennaio": 0,
	"febbraio": 1,
	"marzo": 2,
	"aprile": 3,
	"maggio": 4,
	"giugno": 5,
	"luglio": 6,
	"agosto": 7,
	"settembre": 8,
	"ottobre": 9,
	"novembre": 10,
	"dicembre": 11
  };

$(document).ready(function(){
	let wrapper = $("#wrapper")[0]
	let divSpettacoli= $("#divSpettacoli")[0]
	let divMappa= $("#divMappa")[0]
	
	let mappa= $(divMappa).children("div")[0]
	let titolo = $(wrapper).children("h3")[0]
	let sottotitolo = $(wrapper).children("p")[0]
	let btnAcquista = $(divMappa).children("button")[0]
			
	$(divMappa).hide();
	btnAcquista.disabled = true;	

	let idPoltronePrenotate = [];

	LoadSpectacles();

	async function LoadSpectacles() 
	{
		let HTTPRequest = await inviaRichiesta("GET", "/spettacoli");
		
		const spectacles = HTTPRequest.data;

		for (const spectacle of spectacles) {
			const div = document.createElement("div");
			divSpettacoli.appendChild(div);

			const divImg = document.createElement("div");
			divImg.classList.add("img");
			div.appendChild(divImg);

			const img = document.createElement("img");
			img.src = `./img/${spectacle.titolo}.jpg`;
			divImg.appendChild(img);

			const divDetails = document.createElement("div");
			divDetails.classList.add("details");
			div.appendChild(divDetails);

			let p = document.createElement("p");
			divDetails.appendChild(p);
			p.textContent = spectacle.titolo;
			
			p = document.createElement("p");
			divDetails.appendChild(p);
			p.textContent = spectacle.autore;

			p = document.createElement("p");
			divDetails.appendChild(p);
			p.textContent = spectacle.data;

			p = document.createElement("p");
			divDetails.appendChild(p);
			p.textContent = spectacle.prezzo;

			const btn = document.createElement("button");
			const dateSpectacle = new Date(parseInt(spectacle.data.split(" ")[3]), months[spectacle.data.split(" ")[2].toLowerCase()], parseInt(spectacle.data.split(" ")[1]));
			if(dateSpectacle < Date.now())
				btn.disabled = true;
			divDetails.appendChild(btn);
			btn.textContent = "Acquista biglietti";
			btn.addEventListener("click", function(){ GetSpectacle(spectacle) });
		}
	}

	async function GetSpectacle(spectacle)
	{
		$(divSpettacoli).fadeOut();
		$(divMappa).fadeIn();

		titolo.textContent = spectacle.titolo;
		sottotitolo.textContent = spectacle.data;

		LoadSeats(spectacle.id);

		btnAcquista.addEventListener("click", async function(){
			let promises = [];

			for (const id of idPoltronePrenotate) {
				let promise = inviaRichiesta("PATCH", "/spettacolo_" + spectacle.id + "/" + id, {"statoPrenotazione": "booked"});
				promises.push(promise);
			}

			Promise.all(promises).then(function(){
				alert("Prenotazione effettuata con successo!");
				idPoltronePrenotate = [];
				LoadSeats(spectacle.id);
			}).catch(function(){
				alert("Errore durante la prenotazione!");
			});
		});
	}

	async function LoadSeats(id) 
	{
		let HTTPRequest = await inviaRichiesta("GET", "/spettacolo_" + id);
		const postiSpettacolo = HTTPRequest.data;

		mappa.innerHTML = "";
		
		let idPoltrona = 1;

		for (let i = 0; i < inizioFine.length; i++) {
			for (let j = inizioFine[i].inizio; j <= inizioFine[i].fine; j++) {
				const poltrona = document.createElement("div");
				poltrona.classList.add("poltrona");
				poltrona.setAttribute("id", idPoltrona);
				mappa.appendChild(poltrona);

				const posto = postiSpettacolo.find(posto => posto.id == idPoltrona);

				if(posto.statoPrenotazione == "booked")
					poltrona.style.backgroundColor = ROSSO;
				else
					poltrona.style.backgroundColor = VERDE;

				let posX = X0 + (j * 16.5);
				let posY = Y0 + (i * 17.5);

				if(j > 13)
				{
					posX += 33;
				}
				
				if(i > 9)
				{
					posY += 24;
				}

				poltrona.style.left = posX + "px";
				poltrona.style.top = posY + "px";
				idPoltrona++;
				console.log(j);

				poltrona.addEventListener("click", function(){ 
					if(poltrona.style.backgroundColor == VERDE)
					{
						poltrona.style.backgroundColor = BLU;
						idPoltronePrenotate.push(this.getAttribute("id"));
					}
					else if(poltrona.style.backgroundColor == BLU)
					{
						poltrona.style.backgroundColor = VERDE;
						idPoltronePrenotate.splice(idPoltronePrenotate.indexOf(this.getAttribute("codice")), 1);
					}

					if(idPoltronePrenotate.length > 0)
						btnAcquista.disabled = false;
					else
						btnAcquista.disabled = true;
				});
			}
		}
	}
});