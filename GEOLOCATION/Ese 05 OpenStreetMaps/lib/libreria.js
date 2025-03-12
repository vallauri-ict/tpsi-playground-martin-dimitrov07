"use strict";


function inviaRichiesta(method, url, parameters={}) {
	let axiosOptions={
		"baseURL": "",
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

