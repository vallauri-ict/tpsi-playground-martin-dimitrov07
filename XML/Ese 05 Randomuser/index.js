"use strict"

const headers = ["Name", "City", "State", "Nat", "", ""];
const headersWidth = ["25%", "25%", "25%", "10%", "7.5%", "7.5%"];
let currentPage = 0;
let gender = 0;

window.onload=function()
{
	const opts = document.querySelectorAll("#optWrapper input");
	const table = document.querySelector("table");
	const btns = document.querySelectorAll("#buttons input");
	const details = document.getElementById("details");
	details.style.display = "none";
	const nPag = document.getElementById("nPagina");
	const tbody = document.createElement("tbody");

	let xml = localStorage.getItem("people_xml");
	if(!xml)
	{
		xml = people;
	}
	let parser = new DOMParser();
	let xmlDOC = parser.parseFromString(xml, "text/xml");
	let xmlRoot = xmlDOC.firstElementChild;

	caricaIntestazione();
	caricaTabella();

	for (const opt of opts) {
		opt.addEventListener("click", switchGender);
	}

	function switchGender(){
		let selectedGender = this.value;
		if(selectedGender == "male")
			gender = 0;
		else
			gender = 1;

		details.style.display = "none";
		currentPage = 0;
		caricaTabella();
	}

	for (const btn of btns) {
		btn.addEventListener("click", navigate);
	}

	function navigate(){
		switch(this.value)
		{
			case "Primo":
				currentPage = 0;
				break;
			case "Indietro":
				currentPage--;
				break;
			case "Avanti":
				currentPage++;
				break;
			case "Ultimo":
				currentPage = lastPage();
				break;
		}
	}

	function lastPage(){
		return Math.ceil(xmlRoot.children[gender].children.length / 6);
		//arrotonda all'intero superiore
	}

	function caricaIntestazione(){
		const thead = document.createElement("thead");
		table.appendChild(thead);
		const tr = document.createElement("tr");
		thead.appendChild(tr);

		headers.forEach(function(header, i){
			const th = document.createElement("th");
			tr.appendChild(th);
			th.textContent = header;
			th.style.width = headersWidth[i];
		});
		table.appendChild(tbody);
	}
	
	function caricaTabella(){
		tbody.innerHTML = "";

		let firstRecord = currentPage * 6;

		let people = xmlRoot.children[gender].children;
		//Array.from() -> serve solo per forEach

		for (let i = firstRecord; i < (firstRecord + 6) && (i < people.length); i++) {
			const person = xmlRoot.children[gender].children[i];
			
			const tr = document.createElement("tr");
			tbody.appendChild(tr);

			let td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = person.querySelector("name").querySelector("first").textContent + " " + person.querySelector("name").querySelector("last").textContent;

			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = person.querySelector("location").querySelector("city").textContent;

			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = person.querySelector("location").querySelector("state").textContent;

			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = person.lastElementChild.textContent;

			td = document.createElement("td");
			tr.appendChild(td);
			td.style.backgroundImage = 'url("./img/lente.jpg")';
			td.style.backgroundSize = "contain";
			td.style.backgroundRepeat = "no-repeat";
			td.style.padding = "5px";
			td.style.backgroundOrigin = "content-box" //serve a far sì che l'immagine non si espandi nel padding
			td.addEventListener("click", function(){ showDetails(person); });
			//2 METODO EQUIVALENTE
			//td.person = person; attributo nascosto usando this.person

			td = document.createElement("td");
			tr.appendChild(td);
			td.style.backgroundImage = 'url("./img/delete.png")';
			td.style.backgroundSize = "contain";
			td.style.backgroundRepeat = "no-repeat";
			td.style.padding = "5px";
			td.style.backgroundOrigin = "content-box" //serve a far sì che l'immagine non si espandi nel padding
			td.addEventListener("click", deletePerson);
			td.person = person;
		}
	}

	function showDetails(person){
		details.style.display = "block";
		details.innerHTML = "";
		
		let p = document.createElement("p");
		details.appendChild(p);
		p.textContent = "mail: " + person.querySelector("email").textContent;
		
		const img = document.createElement("img");
		details.appendChild(img);
		img.src = person.querySelector("picture").firstElementChild.textContent;

		p = document.createElement("p");
		details.appendChild(p);
		p.textContent = "phone: " + person.querySelector("phone").textContent;
	}

	function deletePerson(){
		let person = this.person;

		person.remove();
		caricaTabella();
		details.style.display = "none";
	}

} 
