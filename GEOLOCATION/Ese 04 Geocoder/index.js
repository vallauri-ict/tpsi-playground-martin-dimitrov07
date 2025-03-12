"use strict";

window.onload = async function() { 

	await caricaGoogleMaps().catch(function (err){
		alert("Errore caricamento google maps : " + err)
	})  
	
 	let mapContainer =document.querySelector(".mapContainer")
	
	// E' bene istanziare il Geocoder UNA SOLA VOLTA all'inizio
	let geocoder = new google.maps.Geocoder();
    
	btnVisualizza.addEventListener("click", convertiIndirizzo)

	function convertiIndirizzo()
	{
		let indirizzo = txtIndirizzo.value;
		geocoder.geocode({ "address": indirizzo }, function(results, status){
			if(status == "OK")
				visualizzaMappa(results[0])
			else
				alert("Geocode Error")
		})
	}

	function visualizzaMappa(result)
	{
		//location è un oggetto LatLng contenente coordinate GPS
		//legge lat e lng e crea un oggetto Point
		// let lat = result.geometry.location.lat();
		// let lng = result.geometry.location.lng();
		// let posizione = { "lat": lat, "lng": lng }; //oggetto Point

		let posizione = result.geometry.location;
		//il parametro center di mapOptions accetta sia un Point e sia un LatLng
		let mapOptions = {
			"zoom": 15,
			"center": posizione
		};
		let mappa = new google.maps.Map(mapContainer, mapOptions);
		
		let markerOptions = {
			"map": mappa,
			"position": posizione,
			"title": "ITIS VALLAURI"
		}

		let marker = new google.maps.Marker(markerOptions);


	}
	

}