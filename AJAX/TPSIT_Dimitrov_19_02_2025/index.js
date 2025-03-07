"use strict"

$(document).ready(function () {
    let _login = $("#login")[0];
    let _test = $("#test")[0];
    let _lblErrore = $("#lblErrore")[0];  
    const elencoDomande = document.getElementsByClassName("elencoDomande")[0]; 
	
	$(_test).hide();
    $(_lblErrore).hide();

    let user_id;

    $(".close").on("click", () => {
        $(_lblErrore).slideUp(700);
    });

    btnLogin.addEventListener("click", () => {
        let nome = txtUser.value;
        let pwd = txtPwd.value;

        if(nome && pwd)
        {
            let request = inviaRichiesta("GET", "/studenti", { nome, pwd });

            request.catch(errore);
            request.then(function(HTTPResponse){
                if(HTTPResponse.data.length > 0)
                {
                    const utente = HTTPResponse.data[0];
                    console.log(utente);
                    user_id = utente.id;

                    $(_lblErrore).slideUp(700);
                    $(_login).fadeOut(700);
                    $(_test).fadeIn(700);

                    $("#test h2 b").text(utente.user);

                    getDomande();
                }
                else
                    $(_lblErrore).slideDown(700);

            })
        }
        else
            $(_lblErrore).slideDown(700);
    });

    btnRegister.addEventListener("click", () => {
        let nome = txtUser.value;
        let pwd = txtPwd.value;

        if(nome && pwd)
        {
            let request = inviaRichiesta("GET", "/studenti", { nome });

            request.catch(errore);
            request.then(function(HTTPResponse){
                if(HTTPResponse.data.length == 1)
                {
                    $(_lblErrore).slideDown(700);
                }
                else
                {
                    const request = inviaRichiesta("POST", "/studenti", { nome, pwd, "voto": 0 });

                    request.catch(errore);
                    request.then(HTTPResponse => {
                        $(btnRegister).hide();
                        $(_lblErrore).hide();
                    })
                }
            })
        }
        else
            $(_lblErrore).slideDown(700);
    })

    async function getDomande() 
    {
        const HTTPResponse = await inviaRichiesta("GET", "/domande").catch(errore);
        const domande = HTTPResponse.data;

        for (const domanda of domande) {
            const div = document.createElement("div");
            elencoDomande.appendChild(div);

            const titolo = document.createElement("p");
            div.appendChild(titolo);
            titolo.style.color = "blue";
            titolo.style.fontSize = "14pt";
            titolo.textContent = domanda.domanda;

            let index = 0;

            for (const risposta of domanda.risposte) {
                const input = document.createElement("input");
                div.appendChild(input);
                input.type = "radio";
                input.name = "opt-" + domanda.id;
                input.setAttribute("index", index++);

                const span = document.createElement("span");
                div.appendChild(span);
                span.textContent = risposta;

                const br = document.createElement("br");
                div.appendChild(br);
            }

            const input = document.createElement("input");
            div.appendChild(input);
            input.type = "radio";
            input.name = "opt-" + domanda.id;
            input.setAttribute("index", index++);
            input.checked = true;

            const span = document.createElement("span");
            div.appendChild(span);
            span.textContent = "Non rispondo";
        }

        const btnInvia = document.createElement("button");
        elencoDomande.appendChild(btnInvia);
        btnInvia.textContent = "Invia";
        btnInvia.addEventListener("click", function(){ correzioneTest(domande) });
    }

    async function correzioneTest(domande)
    {
        let punteggio = 0;

        for (const domanda of domande) 
        {
            const textRisposta = $(`input[name=opt-${domanda.id}]:checked`).next()[0];
            const indexRisposta = $(`input[name=opt-${domanda.id}]:checked`)[0].getAttribute("index");

            if(indexRisposta == domanda.correct)
            {
                punteggio++;
                textRisposta.style.color = "green";
            }
            else
            {
                if(indexRisposta != domanda.risposte.length)
                {
                    punteggio-=0.25;
                    textRisposta.style.color = "red";
                }
            }
        }

        const request = inviaRichiesta("PATCH", "/studenti/" + user_id, { "voto": punteggio });
        
        request.catch(errore);
        request.then(async (HTTPResponse) => {
            console.log(HTTPResponse.data);

            let result = await Swal.fire({
                "title": "<b>Voto Finale della prova</b>",
                "text": `Complimenti! Hai preso un bel ${punteggio}`
            });
        })
    }

});
