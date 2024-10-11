"use strict";

window.onload=function(){
	let _btnSalva = document.getElementById("btnSalva")
	let _btnAnnulla = document.getElementById("btnAnnulla")	
	let _txtCode = document.getElementById("txtCode")
	let _txtPrice = document.getElementById("txtPrice")
	let _lstColor = document.getElementById("lstColor")
	//let _optsGender = document.getElementsByName("optGender");
	
	_btnAnnulla.addEventListener("click", function(){
		window.location.href = "./index.html";
	});

	_btnSalva.addEventListener("click", function(){
		if(_txtCode.value != "" && _txtPrice.value != "")
		{
			let xml = localStorage.getItem("watches_xml");
			if(!xml)
			{
				xml = orologi;
			}
			const parser = new DOMParser();
			const xmlDOC = parser.parseFromString(xml, "text/xml");
			const xmlRoot = xmlDOC.firstElementChild;
			
			let gender = document.querySelector("input[type=radio]:checked").value; //pseudoselettore
			console.log(gender);

			let watchesList = xmlRoot.querySelector("catalog_item[gender=" + gender + "]");

			let model = `		
			<model>
				<code>${_txtCode.value}</code>
				<price>${_txtPrice.value}</price>
				<watches>
					<color image="${_lstColor.value.toLowerCase()}_cardigan.jpg">${_lstColor.value}</color>
				</watches>
			</model>`;
		}
		else
		{
			alert("Compila tutti i campi!");
		}
	});

}
