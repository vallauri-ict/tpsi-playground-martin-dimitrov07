'use strict'

window.onload=function(){
	let currentBookIndex = 0;

	let id, category, title, year, price, lang, authors;

	let views = [];
    const listView = document.getElementById("list-view");
	const divNbooks = document.querySelector(".nBooks")
    const tBody = document.getElementById("tabLibri");
	views.push(listView);
	
    const detailsView = document.getElementById("details-view");
	detailsView.style.display="none";
	const details = detailsView.querySelector(".details")
	const spanCount = document.querySelector(".buttons span")
	views.push(detailsView);

    const addView = document.getElementById("add-view");
	addView.style.display="none";
	const newDetail = addView.querySelector(".details");
	const newDetailBtn = addView.querySelector(".buttons");
	views.push(addView);

	let json = localStorage.getItem("bookstore_json");
	if(!json)
	{
		json = bookstore;
	}
	const vetBookstore = JSON.parse(json);

	//GESTIONE BARRA DI NAVIGAZIONE
	let headerBtns = document.getElementsByClassName("headerBtn");
	headerBtns[0].classList.add("active");
	headerBtns = Array.from(headerBtns);
	headerBtns.forEach(function(headerBtn, i){ 
		headerBtn.addEventListener("click", function(){  
			refreshNavBar(i);
		});
	});

	//GESTIONE PULSANTI DI NAVIGAZIONE
	//const detailsBtns = detailsView.querySelector(".buttons").querySelectorAll(".button");
	//const detailsBtns = detailsView.querySelectorAll(".buttons .button");
	const detailsBtns = detailsView.querySelectorAll(".button");
	for (const btn of detailsBtns) {
		//btn.addEventListener("click", naviga);
	}
	let primo = detailsBtns[0];
	let indietro = detailsBtns[1];
	let avanti = detailsBtns[2];
	let ultimo = detailsBtns[3];
	let elimina = detailsBtns[4];

	loadBooks();

	divNbooks.querySelector("button").addEventListener("click", function(){
		vetBookstore.sort(function(record1, record2){
			const str1 = record1.title.toUpperCase();
			const str2 = record2.title.toUpperCase();

			if(str1 > str2)
				return 1; //swap (scambio)
			else
				return -1; //no swap (no scambio)
		})

		loadBooks();
	})

	function loadBooks(){
		tBody.innerHTML = "";
		divNbooks.querySelector("span").textContent = "Numero di libri: " + vetBookstore.length;

		for (const book of vetBookstore) {
			const tr = document.createElement("tr");
			tBody.appendChild(tr);

			let td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = book.id;

			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = book.title;

			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = book.category;
			
			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = book.lang;
			
			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = book.authors.join(", "); 
			//convertire un vettore in una stringa (unire più stringhe in una sola) [si aspetta il separatore, lo posiamo scegliere noi a differenza di .toString()]

			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = book.year;
			
			td = document.createElement("td");
			tr.appendChild(td);
			td.textContent = book.price;

			td = document.createElement("td");
			tr.appendChild(td);
			const btnElimina = document.createElement("button");
			td.appendChild(btnElimina);
			btnElimina.textContent = "Delete";
			btnElimina.addEventListener("click", function(){		
				deleteBook(book.id);
			})
		}
	}

	/*
	function readBook(book){
		id = "";
		category = "";
		title = "";
		year = "";
		price = "";
		lang = "";
		authors = "";

		//FASE 1: Lettura dei campi
		if(book.hasAttribute("category"))
		{
			category = book.getAttribute("category");
		}

		//supponiamo che id sia sempre il primo campo
		id = book.firstElementChild.textContent;

		//supponiamo che title sia sempre il secondo campo
		const titleNode = book.children[1];
		title = titleNode.textContent;

		const yearNode = book.querySelector("year");
		if(yearNode)
			year = yearNode.innerHTML;

		const priceNode = book.querySelector("price");
		if(priceNode)
			price = priceNode.innerHTML + "€";

		if(titleNode.hasAttribute("lang"))
			lang = titleNode.getAttribute("lang");

		const authorNodes = book.querySelectorAll("author");
		
		for (const authorNode of authorNodes) {
			//if(authors != "")
				//authors += " - ";
			authors += authorNode.textContent + " - ";
		}

		if(authors != "")
			authors = authors.substring(0, authors.length - 3);
		//console.log(authors);
	}

	function loadDetails(){
		details.innerHTML = "";

		if(xmlRoot.children.length > 0)
		{
			const book = xmlRoot.children[currentBookIndex];
			readBook(book);

			let lbl = document.createElement("label");
			details.appendChild(lbl);
			lbl.textContent = "Id: ";
			let p = document.createElement("p");
			details.appendChild(p);
			p.textContent = id;

			lbl = document.createElement("label");
			details.appendChild(lbl);
			lbl.textContent = "Titolo: ";
			p = document.createElement("p");
			details.appendChild(p);
			p.textContent = title;

			lbl = document.createElement("label");
			details.appendChild(lbl);
			lbl.textContent = "Categoria: ";
			p = document.createElement("p");
			details.appendChild(p);
			p.textContent = category;

			lbl = document.createElement("label");
			details.appendChild(lbl);
			lbl.textContent = "Lingua: ";
			p = document.createElement("p");
			details.appendChild(p);
			p.textContent = lang;

			lbl = document.createElement("label");
			details.appendChild(lbl);
			lbl.textContent = "autori: ";
			p = document.createElement("p");
			details.appendChild(p);
			p.textContent = authors;

			lbl = document.createElement("label");
			details.appendChild(lbl);
			lbl.textContent = "Anno: ";
			p = document.createElement("p");
			details.appendChild(p);
			p.textContent = year;

			lbl = document.createElement("label");
			details.appendChild(lbl);
			lbl.textContent = "Prezzo: ";
			p = document.createElement("p");
			details.appendChild(p);
			p.textContent = price;
		}
	}

	function fillForm(){
		newDetail.innerHTML = "";
		newDetailBtn.innerHTML = "";

		let lbl = document.createElement("label");
		newDetail.appendChild(lbl);
		lbl.textContent = "Id: ";
		let idInput = document.createElement("input");
		idInput.type = "number";
		idInput.required = true;
		newDetail.appendChild(idInput);

		lbl = document.createElement("label");
		newDetail.appendChild(lbl);
		lbl.textContent = "Titolo: ";
		let titleInput = document.createElement("input"); //type="text" è il default
		titleInput.required = true;
		newDetail.appendChild(titleInput);

		lbl = document.createElement("label");
		newDetail.appendChild(lbl);
		lbl.textContent = "Categoria: ";
		let categoryInput = document.createElement("input");
		newDetail.appendChild(categoryInput);

		lbl = document.createElement("label");
		newDetail.appendChild(lbl);
		lbl.textContent = "Lingua: ";
		let langInput = document.createElement("input");
		newDetail.appendChild(langInput);

		lbl = document.createElement("label");
		newDetail.appendChild(lbl);
		lbl.textContent = "autori: ";
		let authorsInput = document.createElement("input");
		newDetail.appendChild(authorsInput);

		lbl = document.createElement("label");
		newDetail.appendChild(lbl);
		lbl.textContent = "Anno: ";
		let yearInput = document.createElement("input");
		yearInput.type = "number";
		yearInput.min = "1400";
		let date = new Date();
		yearInput.max = date.getFullYear();
		newDetail.appendChild(yearInput);

		lbl = document.createElement("label");
		newDetail.appendChild(lbl);
		lbl.textContent = "Prezzo: ";
		let priceInput = document.createElement("input");
		priceInput.type = "number";
		priceInput.min = "0";
		newDetail.appendChild(priceInput);

		const btnAggiungi = document.createElement("button");
		btnAggiungi.textContent = "SALVA";
		btnAggiungi.classList.add("button");
		newDetailBtn.appendChild(btnAggiungi);
		btnAggiungi.addEventListener("click", function(){
			//let book = document.createElement("book");
			let book = xmlDOC.createElement("book");
			book.setAttribute("category", categoryInput.value);
			xmlRoot.appendChild(book);
			
			let id = xmlDOC.createElement("id");
			id.textContent = idInput.value;
			book.appendChild(id);

			let title = xmlDOC.createElement("title");
			title.textContent = titleInput.value;
			title.setAttribute("lang", langInput.value);
			book.appendChild(title);

			let author = xmlDOC.createElement("author");
			author.textContent = authorsInput.value;
			book.appendChild(author);

			let year = xmlDOC.createElement("year");
			year.textContent = yearInput.value;
			book.appendChild(year);

			let price = xmlDOC.createElement("price");
			price.textContent = priceInput.value;
			book.appendChild(price);

			refreshNavBar(0);
		});
	}

	function naviga(){
		switch(this.textContent){
			case "Primo":
				currentBookIndex = 0;
				primo.disabled = true;
				indietro.disabled = true;
				avanti.disabled = false;
				ultimo.disabled = false;
				break;

			case "Indietro":
				currentBookIndex--;
				if(currentBookIndex == 0)
				{
					primo.disabled = true;
					indietro.disabled = true;
				}
				avanti.disabled = false;
				ultimo.disabled = false;
				break;

			case "Avanti":
				currentBookIndex++;
				if(currentBookIndex == xmlRoot.children.length - 1)
				{
					avanti.disabled = true;
					ultimo.disabled = true;
				}
				primo.disabled = false;
				indietro.disabled = false;
				break;
			
			case "Ultimo":
				currentBookIndex = xmlRoot.children.length - 1;
				primo.disabled = false;
				indietro.disabled = false;
				avanti.disabled = true;
				ultimo.disabled = true;
				break;
			case "Elimina":
				deleteBook(xmlRoot.children[currentBookIndex].firstElementChild.textContent);
				currentBookIndex = 0;
				refreshNavBar(0);
				break;
		}
		spanCount.textContent = (currentBookIndex+1) + "/" + xmlRoot.children.length;
		loadDetails();
	}

	*/

	function deleteBook(id){
		//si aspetta l'id del record da eliminare
		
		vetBookstore.forEach(function(book, i){
			let idBook = book.id;
			if(idBook == id)
			{
				vetBookstore.splice(i, 1);
			}
		})

		loadBooks();
	}

	/*

	function inizializzaBtns(){
		primo.disabled = true;
		indietro.disabled = true;	

		if(xmlRoot.children.length < 2)
		{
			avanti.disabled = true;
			ultimo.disabled = true;
		}
		else
		{
			avanti.disabled = false;
			ultimo.disabled = false;
		}

		spanCount.textContent = (currentBookIndex+1) + "/" + xmlRoot.children.length;

		if(xmlRoot.children.length <= 0)
		{
			elimina.disabled = true;
			spanCount.textContent = "0/0";
		}
		else
			elimina.disabled = false;
 
	}

	//i rappresenta l'indice del pulsante premuto
	function refreshNavBar(i){		
		//gestione delle VIEWS
		if(i != 3)
		{
			//gestione della classe ACTIVE
			for (const btn of headerBtns) {
				btn.classList.remove("active");
			}
			headerBtns[i].classList.add("active");

			for (const view of views) {
				view.style.display = "none";
			}
			
			views[i].style.display = "block";

			if(i == 0)
				loadBooks();
			else if(i == 1)
			{
				inizializzaBtns();
				loadDetails();
			}
			else
				fillForm();
		}
		else
		{
			//gestione PULSANTE SALVA SU DISCO
			salvaSuDisco();
		}
	}

	function salvaSuDisco(){
		let serializer = new XMLSerializer();
		let xmlSerialized = serializer.serializeToString(xmlDOC);
		localStorage.setItem("bookstore_xml", xmlSerialized);
		alert("Bookstore salvato correttamente");
	}
	*/
}
