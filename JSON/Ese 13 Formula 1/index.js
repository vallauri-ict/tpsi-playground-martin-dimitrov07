"use strict";

let headers=["num", "nome", "nazione", "scuderia"]
let width=[30, 130, 100, 300]


window.onload=function() {
    const lstScuderie = document.getElementById("lstScuderie");
    const divNazioni = document.getElementById("divNazioni");
    const table = document.getElementsByTagName("table")[0];
    const btnTutti = document.getElementsByTagName("button")[0];
    const divDettagli = document.getElementById("divDettagli");

    const tBody = document.createElement("tbody");

    let scuderia = "All";
    let nazionality = [];

    let json = localStorage.getItem("F1_xml");
    if(!json)
    {
        json = database;
    }
    const objDatabase = JSON.parse(json);

    loadScuderie();
    loadNazioni();
    loadHeader();
    table.appendChild(tBody);
    loadPiloti();

    btnTutti.addEventListener("click", function(){
        divDettagli.style.display = "none";
        nazionality = [];
        scuderia = "All";

        lstScuderie.selectedIndex = -1;
        disabilitaChks();

        loadPiloti();
    })

    lstScuderie.addEventListener("change", function(){
        divDettagli.style.display = "none";
        nazionality = [];
        disabilitaChks();
        scuderia = this.value;
        
        loadPiloti();
    });

    function disabilitaChks()
    {
        for (const chk of divNazioni.querySelectorAll("input")) {
            chk.checked = false;
        }
    }

    function loadPiloti(){
        tBody.innerHTML = "";

        for (const key in objDatabase) {
            for (const pilota of objDatabase[key].piloti) {

                if(key == scuderia || (scuderia == "All" && (nazionality.length == 0 || nazionality.includes(pilota.nazione))))
                {
                    const tr = document.createElement("tr");
                    tBody.appendChild(tr);
        
                    let td = document.createElement("td");
                    tr.appendChild(td);
                    td.textContent = pilota.numero;
    
                    td = document.createElement("td");
                    tr.appendChild(td);
                    const span = document.createElement("span");
                    span.textContent = pilota.nome;
                    span.style.fontStyle = "italic";
                    span.style.textDecoration = "underline";
                    span.addEventListener("click", function(){ viewDetails(pilota, key); });
                    td.appendChild(span);
    
                    td = document.createElement("td");
                    tr.appendChild(td);
                    td.textContent = pilota.nazione;
    
                    td = document.createElement("td");
                    tr.appendChild(td); 
                    td.textContent = key;
                }
            }
        }

        function viewDetails(pilota, scuderia){
            divDettagli.style.display = "flex";
            divDettagli.style.alignItems = "center";
            divDettagli.innerHTML = "";

            const img = document.createElement("img");
            img.src = "./img/" + pilota.nome + ".jpg";
            // Viene fatta solo se viene dato errore sulla ricerca della immagine (non trova l'immagine)
            img.onerror = function() {
                img.src = "./img/user.png";
            };
            img.style.float = "left";
            divDettagli.appendChild(img);

            const text = document.createElement("div");
            divDettagli.appendChild(text);

            let p = document.createElement("p");
            text.appendChild(p);

            let b = document.createElement("b");
            p.appendChild(b);
            b.textContent = pilota.numero + " - " + pilota.nome;

            p = document.createElement("p");
            text.appendChild(p);
            p.textContent = scuderia;

            p = document.createElement("p");
            text.appendChild(p);
            p.textContent = "Motore: ";

            b = document.createElement("b");
            p.appendChild(b);
            b.textContent = objDatabase[scuderia].motore;

            p = document.createElement("p");
            text.appendChild(p);
            p.textContent = "Pneumatici: ";

            b = document.createElement("b");
            p.appendChild(b);
            b.textContent = objDatabase[scuderia].pneumatici;

            p = document.createElement("p");
            text.appendChild(p);
            p.textContent = "Data di Nascita: ";

            b = document.createElement("b");
            p.appendChild(b);
            b.textContent = pilota.data_di_nascita;
        }
    }

    function loadHeader(){
        const thead = document.createElement("thead");
        table.appendChild(thead);

        const tr = document.createElement("tr");
        thead.appendChild(tr);

        headers.forEach(function(header, i) {
            const td = document.createElement("td");
            td.textContent = header;
            td.style.fontWeight = "bold";
            td.style.width = width[i];
            tr.appendChild(td);
        });
    }

    function loadScuderie(){
        let scuderie = Object.keys(objDatabase);
        scuderie.sort();

        for (const scuderia of scuderie) {
            const opt = document.createElement("option");
            lstScuderie.appendChild(opt);
            opt.textContent = scuderia;
        }

        lstScuderie.selectedIndex = -1;
    }

    function loadNazioni(){
        let nazioni = [];

        for (const key in objDatabase) {
            if(!nazioni.includes(objDatabase[key].piloti[0].nazione))
            {
                nazioni.push(objDatabase[key].piloti[0].nazione);        
            }

            if(!nazioni.includes(objDatabase[key].piloti[1].nazione))
            {
                nazioni.push(objDatabase[key].piloti[1].nazione);
            }
        }

        nazioni.sort();

        console.log(nazioni);

        for (const nazione of nazioni) {
            const input = document.createElement("input");
            input.type = "checkbox";
            divNazioni.appendChild(input);
            
            const span = document.createElement("span");
            span.textContent = nazione;
            divNazioni.appendChild(span);

            const br = document.createElement("br");
            divNazioni.appendChild(br);

            input.addEventListener("change", function(){
                divDettagli.style.display = "none";
                lstScuderie.selectedIndex = -1;
                scuderia = "All";
                nazionalita();
                loadPiloti();
            })

            function nazionalita(){
                if(input.checked)
                    {
                        nazionality.push(span.textContent);
                    }
                    else
                    {
                        let pos = nazionality.findIndex(function(nation) {
                            return nation == span.textContent;
                        });
                        
                        nazionality.splice(pos, 1);    
                    }
            }
        }
    }
}



