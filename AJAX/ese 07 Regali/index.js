"use strict"

$(document).ready(function () {
    let _page1 = $("#PAGE1")[0];
    let _page1Data = $("#PAGE1_DATA")[0];
    let _page2 = $("#PAGE2")[0];
    let _page2Data = $("#PAGE2_DATA")[0];
    let _page3 = $("#PAGE3")[0];
    let _page3Data = $("#PAGE3_DATA")[0];

    $(_page2).hide();
    $(_page3).hide();
    $("#PAGE1 div:last-child").hide();

    let citta;

    getCities();

    async function getCities() {
        const HTTPResponse = await inviaRichiesta("GET", "/citta").catch(errore);
        let cities = HTTPResponse.data;

        for (let city of cities) {
            const div = document.createElement("div");
            _page1Data.appendChild(div);
            div.classList.add("form-check");

            const input = document.createElement("input");
            div.appendChild(input);
            input.type = "radio";
            input.classList.add("form-check-input");
            input.name = "optCitta";
            input.id = "opt-" + city.id;
            input.value = city.nome;

            const label = document.createElement("label");
            div.appendChild(label);
            label.classList.add("form-check-label");
            label.htmlFor = "opt-" + city.id;
            label.textContent = city.nome;
        }

        //creo opzione "Purtroppo no"
        const div = document.createElement("div");
        _page1Data.appendChild(div);
        div.classList.add("form-check");

        const input = document.createElement("input");
        div.appendChild(input);
        input.type = "radio";
        input.classList.add("form-check-input");
        input.name = "optCitta";
        input.id = "opt-no";
        input.value = "Purtroppo no";

        const label = document.createElement("label");
        div.appendChild(label);
        label.classList.add("form-check-label");
        label.htmlFor = "opt-no";
        label.textContent = "Purtroppo no";

        //creo bottone
        const button = document.createElement("button");
        _page1Data.appendChild(button);
        button.classList.add("btn", "btn-primary");
        button.id = "btnInvia";
        button.textContent = "Invia";

        //gestisco selezione città
        $("input[name=optCitta]").on("change", function () {
            citta = this.value;
        });

        //gestisco click bottone
        button.addEventListener("click", () => {
            if (citta) 
            {
                if(citta == "Purtroppo no")
                {
                    $("#PAGE1 div:last-child").fadeIn();
                }
                else
                {
                    $("#PAGE1 div:last-child").fadeOut();
                    getShops();
                }
            } 
            else 
            {
                alert("Seleziona una città");
            }
        });
    }

    async function getShops()
    {
        const HTTPResponse = await inviaRichiesta("GET", "/negozi", { "citta": citta }).catch(errore);
        let shops = HTTPResponse.data;

        let presents = [];
        let promises = [];

        for (const shop of shops) 
        {
            const promise = inviaRichiesta("GET", "/regali", { "codNegozio": shop.id });
            promises.push(promise);
        }

        Promise.all(promises).then((HTTPResponses) => {
            for (const HTTPResponse of HTTPResponses) 
                presents.push(...HTTPResponse.data);
            
            loadPresent(presents[random(0, presents.length)]);        
        }).catch(errore);
    }

    async function loadPresent(present)
    {
        $(_page2).show();

        const HTTPResponse = await inviaRichiesta("GET", "/negozi/" + present.codNegozio).catch(errore);
        const negozio = HTTPResponse.data;

        const campi = _page2Data.querySelectorAll("p span:last-child");

        campi[0].textContent = present.nome;
        campi[1].textContent = present.descrizione;
        campi[2].textContent = negozio.nome;
        campi[3].textContent = negozio.indirizzo;

        const img = _page2Data.querySelector("div img");
        img.src = "./img/img" + present.id + ".jpg";

        $(_page1).hide();

        btnConferma.addEventListener("click", async () => { 
            let HTTPResponse = await inviaRichiesta("GET", "/regali/" + present.id).catch(errore);
            const regalo = HTTPResponse.data;
            regalo.qta--;

            $(_page2).hide();
            $(_page3).show();

            btnChiudi.addEventListener("click", () => {
                window.close();
            })

            HTTPResponse = await inviaRichiesta("GET", "/negozi/" + present.codNegozio).catch(errore);
            const negozio = HTTPResponse.data;

            const jsonQRCode = {
                "IDRegalo": regalo.id,
                "descrizione": regalo.descrizione,
                "nome": regalo.nome,
                "negozio": negozio.nome,
                "indirizzo": negozio.indirizzo
            }

            let QRCode = _page3Data.querySelector("div");
            $(QRCode).qrcode(JSON.stringify(jsonQRCode));
        })
    }
});

function random(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}
