"use strict";

window.onload = async function() { 
	await caricaGoogleMaps()

    const mapContainer = document.querySelector(".mapContainer")

	const position = new google.maps.LatLng(44.5557763, 7.7347183)

	const mapOptions = {
		// LatLng non accetta stringhe di posizione
		"center" : position,
		"zoom" : 16,
		"mapTypeId" : google.maps.MapTypeId.ROADMAP,

			
		// PULSANTI DI CONTROLLO: per default sono TUTTI ABILITATI
		disableDefaultUI:true,  
		
		// 1) Pulsanti switch ROADMAP/TERRAIN oppure HYBRID/SATELLITE
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, // default
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,  // verticale
			position: google.maps.ControlPosition.TOP_LEFT,
		},		
		
		// 2) Omino StreetView (che ha senso solo per le ROADMAP)
		streetViewControl: true,
		streetViewControlOptions: {
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},
		
		// 3) Pulsanti di zoom + -
		zoomControl: true,
		zoomControlOptions: {
			// style: deprecata,
			position: google.maps.ControlPosition.RIGHT_BOTTOM
		},		
		
		// 4) Pulsante FullScreen
		fullscreenControl: true,
		fullscreenOptions: {
			// Non ha opzioni, utilizza una posizione fissa in alto a destra
		},	
		
		// 5) Visualizza nella riga di stato in basso a destra un fattore di scala
		// per default è disabilitato
		scaleControl: true,       
		scaleControlOptions: {
			// Non ha opzioni
		}		 
	}
		
	let mappa = new google.maps.Map(mapContainer, mapOptions); 



	// -------------------------------------------------------
	//    AGGIUNTA DI UN MARCATORE e INFO WINDOW
	// -------------------------------------------------------

	let markerOption = {
		"map": mappa,
		"position": position,
		"icon": "./img/education/highschool.png",
		"title": "Istituto Tecnico Industriale Vallauri",
		"animation": google.maps.Animation.DROP,
		"draggable": true,
		"z-index": "1"
	}

	let marker1 = new google.maps.Marker(markerOption);

	let div = `
		<div class="infoWindow">
			<h2>
				ITIS Vallauri
				<br>
				<img src="./img/vallauri.jpg" alt="Vallauri">
			</h2>
			<p>Indirizzo: Via San Michele 68, Fossano</p>
			<p>Telefono: 0172 691611</p>
			<p>Coordinate GPS: ${position.lat()} - ${position.lng()} </p> <!-- si poteva fare anche position.ToString() --!>
		</div>
	`	
	let infoWindowOptions = {
		"content": div,
		// "position": position
	}

	let infoWindow = new google.maps.InfoWindow(infoWindowOptions);

	marker1.addListener("click", function(){
		infoWindow.open(mappa, marker1);
	})

}