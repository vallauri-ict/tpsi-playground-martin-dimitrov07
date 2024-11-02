"use strict"

const headers = ["Name", "City", "State", "Nat", "", ""];
const headersWidth = ["25%", "25%", "25%", "10%", "7.5%", "7.5%"];
let currentPage = 0;
let gender = "male";

window.onload=function()
{
	const opts = document.querySelectorAll("#optWrapper input");
	const table = document.querySelector("table");
	const btns = document.querySelectorAll("#buttons input");
	const details = document.getElementById("details");
	details.style.display = "none";
	const nPag = document.getElementById("nPagina");
	const tbody = document.createElement("tbody");

	let json = localStorage.getItem("people_json");
	if(!json)
	{
		json = people;
	}
	let objPeople = JSON.parse(json); 

	console.log(objPeople);

	caricaIntestazione();
	loadTable();
	manageBtns();

	for (const opt of opts) {
		opt.addEventListener("click", switchGender);
	}

	function switchGender(){
		gender = this.value;
		details.style.display = "none";
		currentPage = 0;
		loadTable();
		manageBtns();
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

		manageBtns();
		loadTable();
		details.style.display = "none";
	}

	function manageBtns(){
		if(lastPage() == 0)
		{
			btns[1].disabled = true;
			btns[2].disabled = true;
		}
		else if(currentPage == 0)
		{
			btns[1].disabled = true;
			btns[2].disabled = false;
		}
		else if(currentPage == (lastPage()))
		{
			btns[1].disabled = false;
			btns[2].disabled = true;
		}
		else
		{
			btns[1].disabled = false;
			btns[2].disabled = false;
		}

		nPag.textContent = (currentPage + 1) + "/" + (lastPage() + 1);		
	}

	//restituisce l'indice dell'ultima pagina
	function lastPage(){
		return Math.ceil(Array.from(objPeople[gender]).length / 6) - 1;
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
	
	function loadTable(){
		tbody.innerHTML = "";

		let firstRecord = currentPage * 6;

		let selectedPeople = objPeople[gender];

		selectedPeople.forEach(function(person, i){

			if(i >= firstRecord && i < firstRecord + 6)
			{
				const tr = document.createElement("tr");
				tbody.appendChild(tr);
				
				let td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = person.name.first + " " + person.name.last;
	
				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = person.location.city;
	
				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = person.location.state;
	
				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = person["nat"];
	
				td = document.createElement("td");
				tr.appendChild(td);
				td.style.padding = "5px";
				let img = document.createElement("img");
				td.appendChild(img);
				img.style.width = "30px";
				img.src = "./img/lente.jpg";
				img.addEventListener("click", function(){ showDetails(person); });
	
				td = document.createElement("td");
				tr.appendChild(td);
				td.style.padding = "5px";
				img = document.createElement("img");
				td.appendChild(img);
				img.style.width = "30px";
				img.src = "./img/delete.png";
				img.person = person;
				img.addEventListener("click", deletePerson);
			}
		});
		
	}

	function showDetails(person){
		details.style.display = "block";
		details.innerHTML = "";
		
		let p = document.createElement("p");
		details.appendChild(p);
		p.textContent = "mail: " + person.email;
		
		const img = document.createElement("img");
		details.appendChild(img);
		img.src = person.picture.large;

		p = document.createElement("p");
		details.appendChild(p);
		p.textContent = "phone: " + person.phone;
	}

	function deletePerson(){
		let selectedPerson = this.person;

		let selectedPeople = objPeople[gender];

		selectedPeople.forEach(function(person, i){
			//if(selectedPerson == person) funziona perchè i puntatori puntano allo stesso posto (NON È SCONTATO CHE FUNZIONI SEMPRE)
			if(JSON.stringify(selectedPerson) == JSON.stringify(person)) //funziona SEMPRE
				selectedPeople.splice(i, 1);
		})
		
		/*
		selectedPeople.forEach(function(person, i){
			if(selectedPerson.email == person.email)
				selectedPeople.splice(i, 1);
		})
		*/

		loadTable();
		if(currentPage > 0 && tbody.innerHTML == "")
		{
			currentPage--;
			loadTable();
		}
		manageBtns();
		details.style.display = "none";
	}

} 
