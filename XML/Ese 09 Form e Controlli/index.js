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

	}	 
}

