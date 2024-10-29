"use strict"

window.onload = function(){

    const lstIngredients = document.getElementById("lstIngredients");
    const btnSalva = document.getElementById("btnSalva");
    const btnAnnulla = document.getElementById("btnAnnulla");

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

    loadIngredients();

    btnSalva.addEventListener("click", function(){
        let id = document.getElementById("txtId").value;
        let name = document.getElementById("txtName").value;
        let ingre = lstIngredients.value;
        let alcol = document.querySelector("input[type=radio]:checked").value;

        let ids = []; //vettore di strighe semplici

        for (const cocktail of xmlRootCocktail.children) {
            console.log(cocktail.querySelector("idDrink").textContent);
            ids.push(cocktail.querySelector("idDrink").textContent);
        }

        if(!ids.includes(id))
        {
            const cocktail = xmlDOCCocktail.createElement("drinks");
            xmlRootCocktail.appendChild(cocktail);

            const idDrink = xmlDOCCocktail.createElement("idDrink");
            idDrink.textContent = id;
            cocktail.appendChild(idDrink);

            const strDrink = xmlDOCCocktail.createElement("strDrink");
            strDrink.textContent = name;
            cocktail.appendChild(strDrink);

            const mainIngreDrink = xmlDOCCocktail.createElement("strIngredient1");
            mainIngreDrink.textContent = ingre;
            cocktail.appendChild(mainIngreDrink);

            const alcolDrink = xmlDOCCocktail.createElement("strAlcoholic");
            alcolDrink.textContent = alcol;
            cocktail.appendChild(alcolDrink);

            const img = xmlDOCCocktail.createElement("strDrinkThumb");
            img.textContent = "./cocktail.jpg";
            cocktail.appendChild(img);

            console.log(cocktail);

            let serializer = new XMLSerializer();
            let xml = serializer.serializeToString(xmlDOCCocktail);
            localStorage.setItem("cocktails_xml", xml); 

            window.location.href = "index.html";
        }
        else
            alert("Id già esistente");
    });

    btnAnnulla.addEventListener("click", function(){
        window.location.href = "index.html";
    })

    function loadIngredients(){
        let vetIngre = [];

		for (const ingredient of xmlRootIngre.children) {
			vetIngre.push(ingredient.firstElementChild.textContent);
		}

		vetIngre.sort(); //ordinamento vettore

		//console.log(vetIngre);

		for (const ingredient of vetIngre) {
			const opt = document.createElement("option");
			opt.textContent = ingredient;
			lstIngredients.appendChild(opt);
		}

        lstIngredients.selectedIndex = -1;
	}
}