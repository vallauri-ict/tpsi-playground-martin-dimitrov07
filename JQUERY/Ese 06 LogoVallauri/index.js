"use strict"

$(document).ready(function() {
	const wrapper = $("#wrapper");

	for(let i=0; i<36; i++){
	    $("<div>").addClass("box").appendTo("#wrapper");
		//const div = $("<div>").addClass("box");
		//wrapper.append(div);
    }

	setInterval(aggiorna, 33);

	function aggiorna()
	{
		let rnd = generaNumero(0, 36);

		const divs = $(".box");
		//const divs = $("div.box");
		//const divs = $("#wrapper div");
		//const divs = wrapper.children;
		//const divs = wrapper.find("div");
		const div = divs.eq(rnd);
		div.animate({"opacity": 0.3}, 400)
		.animate({"opacity": 0.6}, 400)
		.animate({"opacity": 0.1}, 400);
	}

	
	function generaNumero(min, max){
		return Math.floor((max-min)*Math.random()) + min;	
	}
	
});