"use strict";


window.onload=function(){
	
	let tbody = document.querySelector("tbody")
	
	document.querySelector("button").addEventListener("click", fillTable)
	
	function fillTable() {		
		let params = {"results":20, "gender":"male"}
		let request = inviaRichiesta("GET", "/api", params)
		request.catch(errore)
		request.then(function(response){
			console.log(response)
			
			let people = response.data
			console.log(people)
			
			for (let person of people.results){
				let tr = document.createElement("tr")
				tbody.appendChild(tr)
				let td = document.createElement("td")
				tr.appendChild(td)
				td.textContent = person.name.first + " " + person.name.last
				td = document.createElement("td")
				tr.appendChild(td)
				td.textContent = person.location.city
				td = document.createElement("td")
				tr.appendChild(td)
				td.textContent = person.location.country
				td = document.createElement("td")
				tr.appendChild(td)
				td.textContent = person.nat
			}
		})
	}
	
}
	
	
