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
	loadTable();

	function createHeaders(){
		const tr = document.createElement("tr");
		thead.appendChild(tr);

		for (const header of headers) {
			const th = document.createElement("th");
			tr.appendChild(th);
			th.textContent = header;
		}
	}

	function loadTable(){
		tbody.innerHTML = "";


	}
}