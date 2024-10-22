'use strict'
let form1;

window.onload = function() {
	form1 = document.getElementById("form1");
}

// richiamato dall'html
function visualizza(index) {
	let msg = "";
	let items;
	switch (index) {
		case 1:
			const txt = form1.querySelector("input[type=text]");
			msg = txt.value;
			break;
		case 2:
			const lst1 = form1.querySelectorAll("select").firstElementChild;
			msg = lst1.value; //se non c'è nessun value ci da il textContent
			break;
		case 3:
			const chks = form1.querySelectorAll("input[type=checkbox]");
			for (const chk of chks) {
				msg += chk.name + " " + chk.value + "\n"; //se non c'è nessun value ci da ON
			}
			break;
		case 4:
			const chks2 = form1.querySelectorAll("input[type=checkbox]:checked");
			for (const chk of chks2) {
				msg += chk.name + " " + chk.value + "\n"; //se non c'è nessun value ci da ON
			}
			break;
		case 5:
			const chks3 = form1.querySelectorAll("input[type=checkbox]:not(:checked)");  //pseudofunction
			for (const chk of chks3) {
				msg += chk.name + " " + chk.value + "\n"; //se non c'è nessun value ci da ON
			}
			break;
		case 6:
			const opt1 = form1.querySelectorAll("input[type=radio]:checked");
			for (const opt of opt1) {
				msg += opt.name + " " + opt.value + "\n"; //se non c'è nessun value ci da ON
			}
			break;
		case 7:
			const opt2 = form1.querySelectorAll("input[type=radio]:not(:checked)");  //pseudofunction
			for (const opt of opt2) {
				msg += opt.name + " " + opt.value + "\n"; //se non c'è nessun value ci da ON
			}
			break;
		case 8:
			//const lst2 = form1.querySelectorAll("select:last-of-type");
			//const lst2 = form1.querySelectorAll("select")[form1.querySelectorAll("select").length - 1];  pesante
			const lsts = form1.querySelectorAll("select");
			const lst2 = lsts[lsts.length - 1];
			//form1.querySelectorAll("select")[1];
			for (const option of lst2.selectedOptions) {
				msg += option.value + "\n"; //se non c'è nessun value ci da il textContent
			}
			break;
	}
	alert(msg);
}


function imposta(index){
	let items	
	switch(index){
		case 1:
			let text = prompt("Inserisci il contenuto del text box: ");
			form1.querySelector("input[type=text]").value = text;
			break;
		case 2:
			let valLst1 = prompt("Inserisci il valore del select: ");
			const lst1 = form1.querySelector("select");

			for (const opt of lst1.children) {
				if(opt.textContent == valLst1.toLowerCase() || opt.value == valLst1.toLowerCase())
					opt.selected = true;
				else
					opt.selected = false;
			}
			break;
		case 3:
			let valChk = prompt("Inserisci il valore del checkbox: ");
			const chks = form1.querySelectorAll("input[type=checkbox]");

			for (const chk of chks) {
				let s = chk.parentElement.textContent.trim();

				if(s == valChk.toLowerCase() || chk.value == valChk.toLowerCase())
					chk.checked = true;
			}
			break;
		case 4:
			let valOpt = prompt("Inserisci il valore del checkbox: ");
			const opts = form1.querySelectorAll("input[type=radio]");

			for (const opt of opts) {
				if(opt.value == valOpt.toLowerCase())
					opt.checked = true;
			}
			break;
		case 5:
			let valLst2 = prompt("Inserisci il valore del select multiple: ");
			const lst2 = form1.querySelector("select:last-of-type");

			for (const opt of lst2.children) {
				if(opt.textContent == valLst2.toLowerCase() || opt.value == valLst2.toLowerCase())
					opt.selected = true;
			}
			break;
	}	 
}

