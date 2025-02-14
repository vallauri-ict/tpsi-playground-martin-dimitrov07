"use strict"

$(document).ready(function () {
    const _lstCitta  = $("#lstCitta")[0];
    const _lstGeneri = $("#lstGeneri")[0];  
    const _tbody = $("table tbody")[0];
	const _divDettagli =$("#divDettagli")[0];
    
	$(_divDettagli).hide()    

    GetCities();
    GetGenders();

    async function GetCities()
    {
        let HTTPResponse = await inviaRichiesta("GET", "/citta").catch(errore);
        let cities = HTTPResponse.data;

        const a = document.createElement("a");
        a.classList.add("dropdown-item");
        a.href = "#";
        a.textContent = "Tutte";
        _lstCitta.querySelector(".dropdown-menu").appendChild(a);
        a.addEventListener("click", SetNameCity);

        for (const city of cities) 
        {
            const a = document.createElement("a");
            a.classList.add("dropdown-item");
            a.href = "#";
            a.textContent = city.citta;
            _lstCitta.querySelector(".dropdown-menu").appendChild(a);
            a.addEventListener("click", SetNameCity);
        }
    }

    function SetNameCity(){
        _lstCitta.querySelector("button").textContent = this.textContent;

        if(_lstGeneri.querySelector("button").textContent != "Generi")
            GetConcerts();
    }

    async function GetGenders(){
        let HTTPResponse = await inviaRichiesta("GET", "/generi").catch(errore);
        let genders = HTTPResponse.data;

        const a = document.createElement("a");
        a.classList.add("dropdown-item");
        a.href = "#";
        a.textContent = "Tutti";
        _lstGeneri.querySelector(".dropdown-menu").appendChild(a);
        a.addEventListener("click", SetNameGender);

        for (const gender of genders) 
        {
            const a = document.createElement("a");
            a.classList.add("dropdown-item");
            a.href = "#";
            a.textContent = gender.genere;
            _lstGeneri.querySelector(".dropdown-menu").appendChild(a);
            a.addEventListener("click", SetNameGender);
        }
    }

    function SetNameGender(){
        _lstGeneri.querySelector("button").textContent = this.textContent;

        if(_lstCitta.querySelector("button").textContent != "Città")
            GetConcerts();
    }

    function GetConcerts()
    {
        let city = _lstCitta.querySelector("button").textContent;
        let gender =  _lstGeneri.querySelector("button").textContent;

        //creato JSON di filtro (IMPORTANTE)
        let filter = {};

        if(city != "Tutte")
            filter["sede.citta"] = city;

        if(gender != "Tutti")
            filter["genere"] = gender;

        let request = inviaRichiesta("GET", "/concerti", filter);
        request.catch(errore);
        request.then(function(HTTPResponse){
            let concerts = HTTPResponse.data;
            _tbody.innerHTML = "";

            concerts.forEach(concert => {
                const tr = document.createElement("tr");
                _tbody.appendChild(tr);

                let td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = concert.id;

                td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = concert.cantante;

                td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = concert.data;

                td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = concert.genere;

                td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = concert.sede.citta;

                td = document.createElement("td");
                tr.appendChild(td);
                td.textContent = concert.postiPrenotati;

                td = document.createElement("td");
                tr.appendChild(td);
                let button = document.createElement("button")
                td.appendChild(button);
                button.classList.add("btn", "btn-info", "btn-xs");
                button.textContent = "Dettagli";
                button.addEventListener("click", visualizzaDettagli);

                td = document.createElement("td");
                tr.appendChild(td);
                button = document.createElement("button")
                td.appendChild(button);
                button.classList.add("btn", "btn-success", "btn-xs");
                button.textContent = "Prenota";
                button.addEventListener("click", () => {
                    Prenota(concert);
                })
            });
        })
    }

    function Prenota(concert)
    {
        let nBiglietti = prompt("Inserire il numero di biglietti da prenotare");

        if(nBiglietti && nBiglietti <= 10)
        {
            //let postiPrenotati = concert.postiPrenotati + parseInt(nBiglietti);
            concert.postiPrenotati += parseInt(nBiglietti);

            let request = inviaRichiesta("PATCH", "/concerti/" + concert.id, concert);
            //let request = inviaRichiesta("PATCH", "/concerti/" + id, {postiPrenotati});
            request.catch(errore);
            request.then(HTTPResponse => {
                let response = HTTPResponse.data;
                console.log(response);
                alert("Prenotazione effettuata");
                GetConcerts();
            })
        }
        else
            alert("Numero di biglietti non valido");
    }

    function visualizzaDettagli()
    {
        let id = this.parentNode.parentNode.firstElementChild.textContent;

        let request = inviaRichiesta("GET", "/concerti/" + id);

        request.catch(errore);
        request.then(function(HTTPResponse){
            let concert = HTTPResponse.data;

            Swal.fire({
                title: "Dettagli Concerto",
                html: `
                    <span class="swal">Data: </span> <span class="swal">${concert.data}</span><br>
                    <span class="swal">Città: </span> <span class="swal">${concert.sede.citta}</span><br>
                    <span class="swal">Struttura: </span> <span class="swal">${concert.sede.struttura}</span><br>
                    <span class="swal">Posti Liberi: </span> <span class="swal">${concert.sede.nPosti - concert.postiPrenotati}</span><br>
                    <span class="swal">Dettagli: </span> <span class="swal">${concert.dettagli}</span><br>
                `,
                focusConfirm: false, //finestra non modale
            })
        })

    }

})