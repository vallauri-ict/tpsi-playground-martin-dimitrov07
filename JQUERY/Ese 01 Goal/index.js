"use strict"
//$(document).ready(function() //aspetta solo che venga caricato il DOM, non CSS e imgs
window.onload = function()
{	
	let calciatore = $("#calciatore");
	let palla = $("#palla");
	
	let btnEntra=$("#btnEntra")
	let btnEsci = $("#btnEsci")
	let btnVisualizzaPalla = $("#btnVisualizzaPalla")
	let btnNascondiPalla = $("#btnNascondiPalla")
	let btnTira = $("#btnTira")
	let btnRosso = $("#btnRosso");
	let btnBianco = $("#btnBianco");

	calciatore.hide();
	palla.hide();
	btnNascondiPalla.hide();
	btnTira.hide();
	btnBianco.hide();

	btnEntra.on("click", function(){
		btnEntra.hide();
		calciatore.show(2000, function(){
			btnEsci.show();
			checkTira();
		})
	})

	btnEsci.on("click", function(){
		btnEsci.hide();
		calciatore.hide(2000, function(){
			btnEntra.show();
		});
		btnTira.hide();
	});

	btnVisualizzaPalla.on("click", function(){
		$(this).hide();
		palla.fadeIn(2000, function(){
			btnNascondiPalla.show();
			checkTira();
		})
	});

	btnNascondiPalla.on("click", function(){
		$(this).hide();
		palla.fadeOut(2000, function(){
			btnVisualizzaPalla.show();

			let pos = {
				"width": "",
				"height": "",
				"top": "",
				"left": ""
			}
			palla.css(pos);
		})
		btnTira.hide();
	})

	function checkTira(){
		if(calciatore.css("display") != "none" && palla.css("display") != "none")
			btnTira.show();
	}

	btnRosso.on("click", function(){
			$(this).hide();
			btnBianco.show();
			palla.prop("src", "./img/pallaRossa.jpg");
	});

	btnBianco.on("click", function(){
		$(this).hide();
		btnRosso.show();
		palla.prop("src", "./img/palla.jpg");
	});

	btnTira.on("click", function(){
		$(this).hide();
		let pos = {
			"width": "50px",
			"height": 50,
			"left": 1025,
			"top": 300 
		}

		palla.animate(pos, 2000, function(){
			alert("Goal");
		})
	})
}




