"use strict"

let headers = ["idMeal", "strMeal", "img", "", ""];
// Larghezza di ciascuna colonna
let headersWidth = ["50px", "310px", "60px", "40px", "40px"];

window.onload=function()
{
	const radioWrapper = document.getElementById("radioWrapper");
    const table = document.getElementsByTagName("table")[0];

    const tbody = document.createElement("tbody");

    loadCategories();
    loadHeaders();
    loadMeals(radioWrapper.querySelector("input:checked").value);

    function loadMeals(category)
    {
        tbody.innerHTML = "";

        for (const item of details.meals) {
            const meal = item.meals[0];

            if(meal.strCategory == category)
            {
                const tr = document.createElement("tr");
                tbody.appendChild(tr);

                let td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = meal.idMeal;

                td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = meal["strMeal"];

                td = document.createElement("td");
                tr.appendChild(td);
                let img = document.createElement("img");
                td.appendChild(img);
                img.src = meal.strMealThumb;
                img.style.width = "55px";

                td = document.createElement("td");
                tr.appendChild(td);
                img = document.createElement("img");
                td.appendChild(img);
                img.src = "./img/lente.jpg";
                img.style.width = "30px";
                img.addEventListener("click", function(){ viewDetails(meal); });

                td = document.createElement("td");
                tr.appendChild(td);
                img = document.createElement("img");
                td.appendChild(img);
                img.src = "./img/delete.png";
                img.style.width = "30px";
                img.addEventListener("click", function(){ deleteMeal(meal); });
            }
        }
    }

    function viewDetails(meal){

    }

    function deleteMeal(meal){

    }

    function loadHeaders()
    {
        const thead = document.createElement("thead");
        table.appendChild(thead);

        const tr = document.createElement("tr");
        thead.appendChild(tr);

        headers.forEach(function(header, i){
            const th = document.createElement("th");
            tr.appendChild(th);
            th.textContent = header;
            th.style.width = headersWidth[i];
        })

        table.appendChild(tbody);
    }

    function loadCategories()
    {
        /*
        VETTORE ENUMARATIVO semplice di stringhe con tutte le chiavi
        const categories = Object.keys(categoryList);
        for (const category of categories) {
            
        }
        */

        //VETTORE ASSOCIATIVO con tutte le chiavi
        for (const key in categoryList) {
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "category";
            radio.value = key;
            radioWrapper.appendChild(radio);

            const span = document.createElement("span");
            span.textContent = key;
            radioWrapper.appendChild(span);

            radioWrapper.appendChild(document.createElement("br"));
        }

        //document.getElementsByName("category")[0].checked = true;
        radioWrapper.querySelector("input").checked = true;
    }	
}