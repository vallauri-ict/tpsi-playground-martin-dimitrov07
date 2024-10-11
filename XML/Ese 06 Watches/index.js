"use strict";
let headers = ["Gender", "Code", "Price", "Color", "Image"]

window.onload=function () {
	let thead = document.querySelector("table thead")
	let tbody = document.querySelector("table tbody")
	let lstGender = document.querySelector(".gender select")
	let btnInserisci = document.getElementsByTagName("button")[0]

	let xml = localStorage.getItem("watches_xml");
	if(!xml)
	{
		xml = orologi;
	}
	const parser = new DOMParser();
	const xmlDOC = parser.parseFromString(xml, "text/xml");
	const xmlRoot = xmlDOC.firstElementChild;

	createHeaders();
	loadTable("");

	lstGender.addEventListener("change", function(){
		loadTable(lstGender.value);
	})

	btnInserisci.addEventListener("click", function(){
		window.location.href = "./inserisci.html";
	});

	function createHeaders(){
		const tr = document.createElement("tr");
		thead.appendChild(tr);

		for (const header of headers) {
			const th = document.createElement("th");
			tr.appendChild(th);
			th.textContent = header;
		}
	}

	function loadTable(selectedGender){
		tbody.innerHTML = "";

		let watchesList = xmlRoot.querySelectorAll("catalog_item");

		for (const item of watchesList) {
			let gender = item.getAttribute("gender");

			if(selectedGender == "" || gender == selectedGender)
			{
				//let models = item.querySelectorAll("model");
				let models = item.children;
				for (const model of models) {
					let code = model.querySelector("code").textContent;
					let price = model.querySelector("price").textContent;
					let watches = model.querySelector("watches");

					for (const colorWatch of watches.children) {
						let color = colorWatch.textContent;
						let image = colorWatch.getAttribute("image");

						let tr = document.createElement("tr");
						tbody.appendChild(tr);

						let td = document.createElement("td");
						tr.appendChild(td);
						td.textContent = gender;

						td = document.createElement("td");
						tr.appendChild(td);
						td.textContent = code;

						td = document.createElement("td");
						tr.appendChild(td);
						td.textContent = price;

						td = document.createElement("td");
						tr.appendChild(td);
						td.textContent = color;

						td = document.createElement("td");
						tr.appendChild(td);
						const img = document.createElement("img");
						img.src = "./img/" + image;
						td.appendChild(img);
					}
				}	
			}
		}

	}
}