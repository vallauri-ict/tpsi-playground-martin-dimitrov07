"use strict";

const style = {
	"version": 8,
	"sources": {
		"osm": {
			"type": "raster",
			"tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
			"tileSize": 256,
			//"attribution": "&copy; OpenStreetMap Contributors",
			"maxzoom": 20,
			"minzoom": 3
		}
	},
	"layers": [
		{
		  "id": "osm",
		  "type": "raster",
		  "source": "osm" // This must match the source key above
		}
	]
}

async function getCoordinates(uriAddress) {
	const url = `https://nominatim.openstreetmap.org/search?format=json&q=${uriAddress}`
	
	// const httpResponse = await fetch(url);
	// const data = await httpResponse.json();
	
	const httpResponse = await inviaRichiesta("GET", url)
	
	if (httpResponse.data.length > 0) {
		return {
			lat: parseFloat(httpResponse.data[0].lat),
			lng: parseFloat(httpResponse.data[0].lon)
		};
	} else {
		throw new Error("Indirizzo non trovato");
	}
}

async function getRoute(start, end) {
	const apiKey = '5b3ce3597851110001cf62487165d4deb44d486cbe2503d78b49ee06'; 
	const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}`
	let httpResponse = await inviaRichiesta ('POST', url, {"coordinates":[start, end]})
	.catch(function(error){throw new Error("errore openrouteservice API");})
	
	console.log(httpResponse.data.routes)
	if (httpResponse.data.routes && httpResponse.data.routes.length > 0) {
		return polyline.decode(httpResponse.data.routes[0].geometry);
	} 
	else {
		throw new Error("Nessun percorso trovato");
	}
}



window.onload = async function(){
 
    const origin = "Cuneo, Italia"
	const destination = "Torino, Italia"

	const originCoords = await getCoordinates(encodeURIComponent(origin))
	  .catch(error => {console.error(error) })
	const destinationCoords = await getCoordinates(encodeURIComponent(destination))
	  .catch(error => {console.error(error) })

	const lng = (originCoords.lng + destinationCoords.lng)/2
	const lat = (originCoords.lat + destinationCoords.lat)/2
	const zoom = 8.5

    const mapOptions = {
		container: "mapContainer",  // container id
		style: style,
		center: [lng, lat],  
		zoom: zoom
	}
		
	const map = new maplibregl.Map(mapOptions);	
	map.addControl(new maplibregl.NavigationControl());	

	map.on('load', async () => {
		const start = [originCoords.lng, originCoords.lat]; 
		const end = [destinationCoords.lng, destinationCoords.lat];   
		const routeCoordinates = await getRoute(start, end)

        if (!map.getSource('route')) {
            // Se la sorgente non esiste, la creiamo
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': routeCoordinates.map(coord => [coord[1], coord[0]]) // Inverti lat/lon
                    }
                }
            });

            // Aggiungiamo il layer solo una volta
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#ff0000',
                    'line-width': 4
                }
            });
        } 
		else {
            // Se la sorgente esiste, aggiorniamo i dati
            map.getSource('route').setData({
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': routeCoordinates.map(coord => [coord[1], coord[0]])
                }
            });
        }

    })

		
}