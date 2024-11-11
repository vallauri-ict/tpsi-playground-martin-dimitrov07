"use strict";

let headers = ["num", "nome", "nazione", "scuderia"]
let headersWidth = [30, 130, 100, 300]


window.onload = function () {

    let lstScuderie = document.getElementById("lstScuderie");
    let divNazioni = document.getElementById("divNazioni");
    let table = document.querySelector("table");
    let tbody = document.createElement("tbody");
    let divDettagli = document.getElementById("divDettagli");
    let btnTutti = document.getElementsByTagName("button")[0];

    let scuderie = JSON.parse(database);

    let chks = [];
    let selectedCountries = [];

    btnTutti.addEventListener("click", function(){
        selectedCountries = [];
        lstScuderie.selectedIndex = -1;
        divDettagli.style.display = "none";
        for (const chk of chks) {
            chk.checked = false;
        }
        loadPilots();
    })

    loadScuderie();
    loadCountries();
    //questa riga deve eseguita solo dopo che i chks sono stati creati
    //let chks = document.querySelectorAll("input[type=checkbox]");
    loadHeaders();
    loadPilots();

    lstScuderie.addEventListener("change", function(){
        selectedCountries = [];
        divDettagli.style.display = "none";
        for (const chk of chks) {
            chk.checked = false;
        }
        loadPilots();
    })

    function loadScuderie() 
    {
        //Vettore enumerativo di stringhe contenente tutte le chiavi
        let keys = Object.keys(scuderie);   
        keys.sort();

        //Usiamo un For in per scorrere le chiavi di un vettore associativo(=JSON)
        for (const key of keys)
        {
            const option = document.createElement("option");
            option.textContent = key;
            lstScuderie.appendChild(option);
        }
        lstScuderie.selectedIndex = -1;
    }

    function loadCountries()
    {
        let nazioni = [];

        for (const key in scuderie) 
        {
            //Pilots è un vettore enumerativo di JSON
            let pilots = scuderie[key].piloti;
            for (const pilot of pilots) 
            {
                if(!nazioni.includes(pilot.nazione))
                    nazioni.push(pilot.nazione);
            }
        }

        nazioni.sort();
        console.log(nazioni);

        for (const nazione of nazioni) 
        {
            let chk = document.createElement("input");
            chk.type="checkbox";
            chk.value = nazione;
            chk.addEventListener("click", function(){
                for (const checkedChk of document.querySelectorAll("input[type=checkbox]:checked")) 
                {
                    selectedCountries.push(checkedChk.value);
                }
                lstScuderie.selectedIndex = -1;
                loadPilots();
            })
            divNazioni.appendChild(chk);
            chks.push(chk);
            
            let span = document.createElement("span");
            span.textContent = nazione;
            divNazioni.appendChild(span);

            let br = document.createElement("br");
            divNazioni.appendChild(br);
        }
    }

    function loadHeaders()
    {
        let thead = document.createElement("thead");
        table.appendChild(thead);

        let tr = document.createElement("tr");
        thead.appendChild(tr);

        headers.forEach(function(header,i) {
            let th = document.createElement("th");
            th.textContent = header;
            th.style.width = headersWidth[i] + "px";
            tr.appendChild(th);
        });
        table.appendChild(tbody);
    }

    function loadPilots()
    {
        tbody.innerHTML = "";

        for (const key in scuderie) 
        {
            if(!lstScuderie.value || key == lstScuderie.value)
            //if(lstScuderie.selectedIndex == -1 || key == lstScuderie.value)
            {
                // let pilots = scuderie[key].piloti;
                let pilots = scuderie[key]["piloti"];
                for (const pilot of pilots) 
                {
                    if(selectedCountries.includes(pilot.nazione) || selectedCountries.length == 0)
                    {
                        const tr = document.createElement("tr");
                        tbody.appendChild(tr);
    
                        let td = document.createElement("td");
                        td.textContent=pilot.numero;
                        tr.appendChild(td);
    
                        td = document.createElement("td");
                        let span = document.createElement("span");
                        span.textContent=pilot.nome;
                        span.style.textDecoration = "underline";
                        span.style.fontStyle = "italic";
                        // span.nomeScuderia = key;
                        // span.nomePilota = pilot;
                        span.addEventListener("click",function() {
                            //Passiamo come parametro il nome della scuderia e l'intero JSON del pilota
                            loadDetails(key,pilot);
                        });
                        td.appendChild(span);
                        tr.appendChild(td);
    
                        td = document.createElement("td");
                        td.textContent = pilot.nazione;
                        tr.appendChild(td);
    
                        td = document.createElement("td");
                        td.textContent = key;
                        tr.appendChild(td);
                    }
                }
            }
        }
    }

    function loadDetails(nomeScuderia, pilot)
    {
        divDettagli.innerHTML="";
        const scuderia = scuderie[nomeScuderia];
        divDettagli.style.display="flex";

        const img = document.createElement("img");
        img.src=`./img/${pilot.nome}.jpg`;
        img.addEventListener("error",function() {
            img.src=`./img/user.png`;
        });
        divDettagli.appendChild(img);

        const div = document.createElement("div");
        divDettagli.appendChild(div);

        let p = document.createElement("p");
        div.appendChild(p);
        let b = document.createElement("b");
        p.appendChild(b);
        b.textContent = pilot.numero + " - " + pilot.nome;

        p = document.createElement("p");
        p.textContent = nomeScuderia;
        div.appendChild(p);

        p = document.createElement("p");
        p.innerHTML = `Motore: <b> ${scuderia.motore} </b>`;
        div.appendChild(p);

        p = document.createElement("p");
        p.innerHTML = `Pneumatici: <b> ${scuderia.pneumatici} </b>`;
        div.appendChild(p);

        p = document.createElement("p");
        p.innerHTML = `Data di nascita: <b> ${pilot.data_di_nascita} </b>`;
        div.appendChild(p);

    }
}



