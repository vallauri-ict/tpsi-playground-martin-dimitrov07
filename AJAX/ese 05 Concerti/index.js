"use strict"

$(document).ready(function () {
    const _lstCitta  = $("#lstCitta")[0];
    const _lstGeneri = $("#lstGeneri")[0];  
    const _tbody = $("table tbody")[0];
	const _divDettagli =$("#divDettagli")[0];
    
	$(_divDettagli).hide()    

    getCities();
    getGenders();

    async function getCities()
    {
        let HTTPResponse = await inviaRichiesta("GET", "/citta").catch(errore);
        let cities = HTTPResponse.data;

        const a = document.createElement("a");
        a.classList.add("dropdown-item");
        a.href = "#";
        a.textContent = "Tutte";
        _lstCitta.querySelector(".dropdown-menu").appendChild(a);
        a.addEventListener("click", setNameCity);

        for (const city of cities) 
        {
            const a = document.createElement("a");
            a.classList.add("dropdown-item");
            a.href = "#";
            a.textContent = city.citta;
            _lstCitta.querySelector(".dropdown-menu").appendChild(a);
            a.addEventListener("click", setNameCity);
        }
    }

    function setNameCity(){
        _lstCitta.querySelector("button").textContent = this.textContent;

        if(_lstGeneri.querySelector("button").textContent != "Generi")
            getConcerts();
    }

    async function getGenders(){
        let HTTPResponse = await inviaRichiesta("GET", "/generi").catch(errore);
        let genders = HTTPResponse.data;

        const a = document.createElement("a");
        a.classList.add("dropdown-item");
        a.href = "#";
        a.textContent = "Tutti";
        _lstGeneri.querySelector(".dropdown-menu").appendChild(a);
        a.addEventListener("click", setNameGender);

        for (const gender of genders) 
        {
            const a = document.createElement("a");
            a.classList.add("dropdown-item");
            a.href = "#";
            a.textContent = gender.genere;
            _lstGeneri.querySelector(".dropdown-menu").appendChild(a);
            a.addEventListener("click", setNameGender);
        }
    }

    function setNameGender(){
        _lstGeneri.querySelector("button").textContent = this.textContent;

        if(_lstCitta.querySelector("button").textContent != "Città")
            getConcerts();
    }

    function getConcerts()
    {
        let city = _lstCitta.querySelector("button").textContent;
        let gender =  _lstGeneri.querySelector("button").textContent;

        //DA FINIRE
        let request = inviaRichiesta("GET", "/concerti");
    }

})