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
		"pitch" : "7",     /* posizionamento alto / basso      */
		"fov" : "45",      /* zoom */
		// markers
		"markers" : "color:blue|size:big|label:V|via san michele 68, fossano|via san michele 76, fossano",
	}





})
