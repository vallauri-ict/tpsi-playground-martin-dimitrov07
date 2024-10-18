'use strict'

let wrapper;

window.onload = function() {
	wrapper = document.querySelector("#wrapper");
	let buttonsDiv = document.querySelector("#buttons");
	let btns = buttonsDiv.querySelectorAll("input[type=button]");
}

function evidenzia(selector){
	for (const item of wrapper.children) {
		item.style.backgroundColor = "";
		
		if(item.matches(selector))
			item.style.backgroundColor = "yellow";
	}
}