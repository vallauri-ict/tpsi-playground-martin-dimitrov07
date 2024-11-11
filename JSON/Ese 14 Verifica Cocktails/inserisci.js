"use strict"

window.onload = function()
{
    const lstIngredients = document.getElementById("lstIngredients");
    const txtId = document.getElementById("txtId");
    const txtName = document.getElementById("txtName");
    const btnSalva = document.getElementById("btnSalva");

    let id = "";
    let name = "";
    let mainIngredient = "";
    let alcol = "Alcoholic";

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

    let ids = [];

    for (const cocktail of objCocktails.drinks) {
        ids.push(cocktail.idDrink);
    }

    btnSalva.addEventListener("click", function(){
        id = txtId.value;
        name = txtName.value;
        mainIngredient = lstIngredients.value;
        if(document.querySelector("#optAlcoholic").checked)
            alcol = "Alcoholic";
        else
            alcol = "Non alcoholic";


        if(id != "" && !ids.includes(id))
        {
            let drink = `{
                "idDrink": "${id}",
                "strDrink": "${name}",
                "strAlcoholic": "${alcol}",
                "strIngredient1": "${mainIngredient}",
                "strDrinkThumb": "./cocktail.jpg"
            }`;

            const objDrink = JSON.parse(drink);

            objCocktails.drinks.push(objDrink);

            let strCocktail = JSON.stringify(objCocktails);

            localStorage.setItem("cocktails_json", strCocktail); 

            alert("Caricamento nuovo cocktail");
            window.location.href = "index.html";
        }
        else
        {
            alert("Id non valido o già esistente");
            txtId.value = "";
            txtName.value = "";
            lstIngredients.selectedIndex = -1;
            document.querySelector("#optAlcoholic").checked = true;
        }

    })

    loadIngredients();

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