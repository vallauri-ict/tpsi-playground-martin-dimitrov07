"use strict";

let headers=["", "id", "name", "alcoholic", "main ingredient", ""]
let headersWidth=[40, 40, 60, 70, 70, 40]


window.onload=function()
{
	const optAlcolico = document.getElementById("optAlcoholic");
	const optNonAlcolico = document.getElementById("optNonAlcoholic");
	const optTutti = document.getElementById("optTutti");
	const lstIngredients=document.getElementById("lstIngredienti");
	const table = document.getElementsByTagName("table")[0];
	const details=document.getElementById("dettagli");
	const btnNew = document.getElementsByTagName("button")[0];

	btnNew.addEventListener("click", function(){
		window.location.href = "inserisci.html";
	})

	let alcol = "All";

	let cocktailsJson = localStorage.getItem("cocktails_json");
    if(!cocktailsJson)
    {
        cocktailsJson = cocktails;
    }
    const objCocktails = JSON.parse(cocktailsJson);

	let ingredientsJson = localStorage.getItem("ingredients_json");
    if(!ingredientsJson)
    {
        ingredientsJson = ingredients;
    }
    const objIngrendients = JSON.parse(ingredientsJson);

	let opts = [];
	opts.push(optAlcolico);
	opts.push(optNonAlcolico);
	opts.push(optTutti);

	for (const opt of opts) {
		opt.addEventListener("click", function(){
			switch(this.id)
			{
				case "optAlcoholic":
					alcol = "Alcoholic";
					break;
				case "optNonAlcoholic":
					alcol = "Non alcoholic";
					break;
				case "optTutti":
					alcol = "All";
					break;
			}

			loadCocktails();
		})
	}

	lstIngredients.addEventListener("change", function(){ loadCocktails(); });

	let tbody = document.createElement("tbody");

	loadIngredients();
	loadHeader();
	table.appendChild(tbody);
	loadCocktails();

	function loadCocktails(){
		tbody.innerHTML = "";

		for (const cocktail of objCocktails.drinks) {
			if(cocktail.strAlcoholic == alcol || alcol == "All")
			{
				if(lstIngredients.selectedIndex == -1 || lstIngredients.value == cocktail.strIngredient1)
				{
					const tr = document.createElement("tr");
					tbody.appendChild(tr);
	
					let td = document.createElement("td");
					tr.appendChild(td);
					const img = document.createElement("img");
					img.src = cocktail.strDrinkThumb;
					img.style.width = "40px";
					td.appendChild(img);
					td.style.textAlign = "center";
	
					td = document.createElement("td");
					tr.appendChild(td);
					td.textContent = cocktail.idDrink;
					td.style.textAlign = "center";		
	
					td = document.createElement("td");
					tr.appendChild(td);
					td.textContent = cocktail.strDrink;
					td.style.textAlign = "center";
	
					td = document.createElement("td");
					tr.appendChild(td);
					td.textContent = cocktail.strAlcoholic;
					td.style.textAlign = "center";
	
					td = document.createElement("td");
					tr.appendChild(td);
					td.textContent = cocktail.strIngredient1;
					td.style.textAlign = "center";
	
					td = document.createElement("td");
					tr.appendChild(td);
					const a = document.createElement("a");
					td.appendChild(a);
					td.style.textAlign = "center";
					a.textContent = "dettagli";
					a.href = "#";
					a.addEventListener("click", function(){ loadDetail(cocktail); });
				}
			}
		}
	}

	function loadDetail(cocktail){
		details.innerHTML = "";

		const h3 = document.createElement("h3");
		h3.textContent = cocktail.strDrink;
		details.appendChild(h3);

		let i = 1;
		const p = document.createElement("p");
		p.innerHTML = "<b>Ingredienti:</b> ";

		let key = "strIngredient" + i;

		while(cocktail[key] && i < 6)
		{
			p.innerHTML += cocktail[key] + " - ";
			i++;
			key = "strIngredient" + i;
		}
		details.appendChild(p);

		const img = document.createElement("img");
		img.src = cocktail.strDrinkThumb;
		img.style.width = "140px";
		details.appendChild(img);
	}

	function loadHeader(){
		const thead = document.createElement("thead");
		table.appendChild(thead);
		const tr = document.createElement("tr");
		thead.appendChild(tr);

		headers.forEach(function(header, i){
			const th = document.createElement("th");
			tr.appendChild(th);
			th.textContent = header;
			th.style.width = headersWidth[i] + "px";
		});
		table.appendChild(tbody);
	}

	function loadIngredients(){
		let ingre = [];

		for (const ingredient of objIngrendients.ingredients) {
			let key = Object.keys(ingredient)[0];
			ingre.push(ingredient[key]);
		}

		ingre.sort();

		for (const ingredient of ingre) {
			const opt = document.createElement("option");
			opt.textContent = ingredient;
			lstIngredients.appendChild(opt);
		}

		lstIngredients.selectedIndex = -1;
	}

}

