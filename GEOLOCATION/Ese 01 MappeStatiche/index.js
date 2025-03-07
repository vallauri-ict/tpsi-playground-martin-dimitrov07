"use strict";

const URL = "https://maps.googleapis.com/maps/api"
const mapType = ['roadmap', 'hybrid',   'satellite', 'terrain', 'streetview']


$(document).ready(function(){
	
    let imgBox = $("#imgBox");
    let btnBox = $("#btnBox");
	
	const mapParams = {
		"key" : MAP_KEY,
		"maptype" : "",
		"size" : "800x600",	
		"zoom" : 16,
		
		// parametri static_map
		"center" : "via san michele 68, fossano",   // "44.5557763, 7.7347183",
		
		// parametri street_view
		"location" : "via san michele 68, fossano",  
		"heading" : "-60", /* posizionamento destra / sinistra */
		"pitch" : "7",     /* posizionamento alto / basso */
		"fov" : "45",      /* zoom */
		
		// markers
		"markers" : "color:blue|size:big|label:V|via san michele 68, fossano|via san michele 76, fossano",
	}

    // disegno i pulsanti
	for (const item of mapType) {
        let btn = $("<button>").text(item).appendTo(btnBox)
            .on("click",function(){
				mapParams.maptype=$(this).text()
				let url;
				if($(this).text() != "streetview")
					url =  URL + "/staticmap?"
				else 
					url = URL + "/streetview?" 
				
				// concateno i parametri trasformandoli in url_encoded
				// funzione scritta sotto
				url +=  toUrlEncoded(mapParams);
				// oppure uso una funzione di libreria
				// url +=  new URLSearchParams(mapParams);
				imgBox.prop("src", url)
				
				$("button").removeClass("active")
				// il pulsante premuto diventa quello attivo
				$(this).addClass("active")
			});
    }
	$("button").eq(0).trigger("click")   
})


function toUrlEncoded(mapParams){
	let queryString = "";
	for (const key in mapParams) {
		queryString += key + "=" + mapParams[key] + "&";
	}
	return queryString;       
}
