"use strict";

const style = {
	"version": 8,
	"sources": {
		"osm": {
			"type": "raster",
			"tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
			"tileSize": 256,
			//"attribution": "&copy; OpenStreetMap Contributors",
			"maxzoom": 25,
			"minzoom": 1
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

window.onload = async function(){
 
    const address = "Via San Michele 68, Fossano, Italia"
	//trasforma i caratteri speciali nella codifica esadecimale (es. spazio -> %20)
	const uriAddress = encodeURIComponent(address)

	const coords = await getCoordinates(uriAddress)
	  .catch(error => {console.error(error) })
	
	console.log("Coordinate:", coords);
	const lat = coords.lat  // 44.5557763
	const lng = coords.lng  // 7.7347183	
	const zoom = 15.95


    const mapOptions = {
		container: "mapContainer", // container id
		style: style,
		center: [lng, lat], // starting position [lng, lat]
		zoom: zoom
	}

	const map = new maplibregl.Map(mapOptions);	
	map.addControl(new maplibregl.NavigationControl());	
	//map.addControl(new maplibregl.NavigationControl(), 'top-left');		
	
	const scaleOptions = {maxWidth: 80, unit: 'metric'}
	map.addControl(new maplibregl.ScaleControl(scaleOptions))




	// -------------------------------------------------------
	//    AGGIUNTA DI MARKER
	// -------------------------------------------------------

	const markerOptions = {
		color: "#F00",
		draggable: true
    }
	const marker = new maplibregl.Marker(markerOptions)
    marker.setLngLat([lng, lat])
    marker.addTo(map);
	
	let htmlElement = marker.getElement()
	//htmlElement.addEventListener("click", function(){alert("clicked")})
	
	// oppure	 
	let popup = new maplibregl.Popup();
	popup.setHTML("<h1>Hello World!</h1>")
	marker.setPopup(popup)
	 





	// -------------------------------------------------------
	//    AGGIUNTA DI CUSTOM MARKER
	// -------------------------------------------------------

	const geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'messagee': 'marker1',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [7.7347183, 44.5547763]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'messagee': 'marker2',
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [7.7357183, 44.5567763]
                }
            }
        ]
    };
 
    // add markers to map
    geojson.features.forEach((marker) => {
        // create a DOM element for the marker
        const elem = document.createElement('div');
        elem.className = 'marker';
        elem.style.backgroundImage = "url(./university.png)";
        elem.style.width = `${marker.properties.iconSize[0]}px`;
        elem.style.height = `${marker.properties.iconSize[1]}px`;

        elem.addEventListener('click', () => {
            window.alert(marker.properties.messagee);
        });

        // add marker to map
        new maplibregl.Marker({element: elem})
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    });

}