"use strict";

let headers=["", "id", "name", "alcohlic", "main ingredient", ""]
let headersWidth=[40, 40, 60, 70, 70, 40]


window.onload=function()
{
	const opts = document.getElementsByName("optGroup");
	const lstIngredienti=document.getElementById("lstIngredienti");
	const table = document.getElementsByTagName("table")[0];
	const details=document.getElementById("dettagli");
	let tbody;

	let type = "All";
	let ingre = "All";

	let xmlCocktail = localStorage.getItem("cocktails_xml");
	if(!xmlCocktail)
	{
		xmlCocktail = cocktails;
	}
	const parser = new DOMParser();
	const xmlDOCCocktail = parser.parseFromString(xmlCocktail, "text/xml");
	const xmlRootCocktail = xmlDOCCocktail.firstElementChild;

	let xmlIngre = localStorage.getItem("indredients_xml");
	if(!xmlIngre)
	{
		xmlIngre = ingredients;
	}
	const xmlDOCIngre = parser.parseFromString(xmlIngre, "text/xml");
	const xmlRootIngre = xmlDOCIngre.firstElementChild;

	for (const opt of opts) {
		opt.addEventListener("click", function(){
			type = this.value;
			loadTable();
		})
	}

	lstIngredienti.addEventListener("change", function(){
		ingre = this.value;
		loadTable();
	})

	document.querySelector(".title button").addEventListener("click", function(){
		window.location.href = "inserisci.html";
	});

	loadIngredients();
	loadHeaders();
	loadTable();

	function loadTable(){
		tbody.innerHTML = "";

		for (const cocktail of xmlRootCocktail.children) {
			if((type == cocktail.querySelector("strAlcoholic").textContent || type == "All") && (ingre == cocktail.querySelector("strIngredient1").textContent || ingre == "All"))
			{
				const tr = document.createElement("tr");
				tbody.appendChild(tr);
	
				let td = document.createElement("td");
				tr.appendChild(td);
				const img = document.createElement("img");
				img.src = cocktail.querySelector("strDrinkThumb").textContent;
				img.style.width = "40px";
				td.appendChild(img);
	
				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = cocktail.querySelector("idDrink").textContent;
	
				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = cocktail.querySelector("strDrink").textContent;
	
				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = cocktail.querySelector("strAlcoholic").textContent;
	
				td = document.createElement("td");
				tr.appendChild(td);
				td.textContent = cocktail.querySelector("strIngredient1").textContent;
	
				td = document.createElement("td");
				const a = document.createElement("a");
				a.href = "#";
				a.textContent = "dettagli";
				a.addEventListener("click", function(){
					details.innerHTML = "";
	
					const h3 = document.createElement("h3");
					h3.textContent = cocktail.querySelector("strDrink").textContent;
					details.appendChild(h3);
	
					let strIngre = "<b>Ingredients:</b> ";
					let i = 1;
	
					while(cocktail.querySelector("strIngredient" + i) && i < 6){
						strIngre += cocktail.querySelector("strIngredient" + i++).textContent + " - ";
					}
	
					const p = document.createElement("p");
					p.innerHTML = strIngre;
					details.appendChild(p);
	
					const img = document.createElement("img");
					img.src = cocktail.querySelector("strDrinkThumb").textContent;
					img.style.width = "140px";
					details.appendChild(img);
				});
				td.appendChild(a);
				tr.appendChild(td);
			}
		}

	}

	function loadHeaders(){
		const thead = document.createElement("thead");
		table.appendChild(thead);

		const tr = document.createElement("tr");
		thead.appendChild(tr);

		headers.forEach(function(header, i){
			let td = document.createElement("td");
			td.textContent = header;
			td.style.width = headersWidth[i] + "px";
			tr.appendChild(td);
		});

		tbody = document.createElement("tbody");
		table.appendChild(tbody);
	}

	function loadIngredients(){
		lstIngredienti.innerHTML = "<option value='All'></option>";

		let vetIngre = [];

		for (const ingredient of xmlRootIngre.children) {
			vetIngre.push(ingredient.firstElementChild.textContent);
		}

		vetIngre.sort(); //ordinamento vettore

		console.log(vetIngre);

		for (const ingredient of vetIngre) {
			const opt = document.createElement("option");
			opt.textContent = ingredient;
			lstIngredienti.appendChild(opt);
		}
	}

}

