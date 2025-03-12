"use strict";

const MAPS_URL = "https://maps.googleapis.com/maps/api/js"
const JSONSERVER_URL = "http://localhost:3000"

function inviaRichiesta(method, url, parameters={}) {
	let axiosOptions={
		"baseURL": JSONSERVER_URL,
		"url":  url, 
		"method": method,
		"headers": {
			"Accept": "application/json",
		},
		"timeout": 5000,
		"responseType": "json",
	}
	if(parameters instanceof FormData){
		axiosOptions.headers["Content-Type"]='multipart/form-data;' 
		axiosOptions["data"]=parameters     // Accept Blob
	}	
	else if(method.toUpperCase()=="GET"){
	   axiosOptions.headers["Content-Type"]='application/x-www-form-urlencoded;charset=utf-8' 
	   axiosOptions["params"]=parameters   // plain object or URLSearchParams object
	}
	else{
		axiosOptions.headers["Content-Type"] = 'application/json; charset=utf-8' 
		/* PHP: 'application/x-www-form-urlencoded;charset=utf-8' */
		axiosOptions["data"]=parameters     
	}	
	return axios(axiosOptions)             
}


function errore(err) {
	if(!err.response) 
		alert("Connection Refused or Server timeout");	
	else if (err.response.status == 200)
        alert("Formato dei dati non corretto : " + err.response.data);
    else 
        alert("Server Error: " +err.response.status + " - " + err.response.data)
}


function caricaGoogleMaps(){
	let promise =  new Promise(function(resolve, reject){
		let script = document.createElement('script');
		script.type = 'text/javascript';
		  script.src = MAPS_URL + '?v=3&key='+ MAP_KEY;
		document.body.appendChild(script);
		script.onload = function(){
			console.log("GoogleMaps caricate correttamente")
			resolve()
		}
		// non si verifica mai
		script.onerror = function (){
			console.log("Errore caricamento GoogleMaps")
		    reject("Errore caricamento GoogleMaps")
		}
	})
	return promise
}
