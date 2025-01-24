"use strict";
const RIGHE = 18
const COLONNE = 37
const X_OFFSET = 180
const Y_OFFSET = 210;
const MMG = 24*60*60*1000 // msec in un giorno = 86.400.000


$(document).ready(function () {
   let _login = $("#login")[0]
   let _msg = $("#wrapper").children("label")[2]
   let _btnLogin = document.getElementById("btnLogin");
   
   let _wrapper = $("#wrapper")[0]
   let _mappa = $("#wrapper").children("div")[0]
   let _btnVisualizzaMappa = $("#wrapper").children("button")[0]
   // 
   let _dataInizio = $("#wrapper").find("input")[0]
   let _dataFine = $("#wrapper").find("input")[1]

   let user_id;
   let ombrelloni;
   let ombrelloniPrenotati = [];
   
   $(_login).show();
   $(_wrapper).hide();
   $(_mappa).hide();

   _dataFine.disabled = true;
   _btnVisualizzaMappa.disabled = true;
   
   _btnLogin.addEventListener("click", function(){
      const inputs = _login.querySelectorAll("input");

      let nome = inputs[0].value;
      let password = inputs[1].value;

      if(nome && password)
      {
         let request = inviaRichiesta("GET", "/utenti", { nome, password });

         request.catch(errore);
         request.then(function(response){
            if(response.data.length > 0)
            {
               const utente = response.data[0];
               console.log(utente);

               user_id = utente.id;

               $(_login).hide();
               $(_wrapper).show();
            }
            else
               _login.querySelector("p").textContent = "Errore: credenziali non valide";

         })
      }
      else
         alert("Inserire username e password");
   })

   _dataInizio.addEventListener("change", function(){
      _dataFine.disabled = false;
      _dataFine.min = this.value;
      _dataFine.value = this.value;

      if(this.value)
      {
         _btnVisualizzaMappa.disabled = false;
         _btnVisualizzaMappa.classList.add("buttonEnabled");
      }
      else
      {
         _btnVisualizzaMappa.disabled = true;
         _btnVisualizzaMappa.classList.remove("buttonEnabled");
         _dataFine.disabled = true;
      }
   })

   // _dataFine.addEventListener("click", function(){
   //    if(!this.value)
   //       _btnVisualizzaMappa.disabled = true;
   // })

   _btnVisualizzaMappa.addEventListener("click", function(){
      $(_mappa).slideDown(1000);
      caricaOmbrelloni();
   })

   function caricaOmbrelloni(){
      const request = inviaRichiesta("GET", "/ombrelloni");

      request.catch(errore);
      request.then(function(response){
         console.log(response.data);
         ombrelloni = response.data;

         _mappa.innerHTML = "";

         let dataInizio = new Date(_dataInizio.value);
         let dataFine = new Date(_dataFine.value);

         let posIniziale = (dataInizio - new Date(_dataInizio.min)) / MMG;
         let posFinale = (dataFine - new Date(_dataInizio.min)) / MMG;

         let id = 1;

         for (let riga = 0; riga <= RIGHE; riga++) {
            let y = Y_OFFSET + 16 * riga;
            for (let colonna = 0; colonna <= COLONNE; colonna++) {
               if(colonna != 22 && riga != 9)
               {
                  let x = X_OFFSET + 16 * colonna - 2 * riga;
                  const div = document.createElement("div");
                  _mappa.appendChild(div);
                  div.classList.add("ombrellone");
                  div.id = id;
                  div.style.top = y;
                  div.style.left = x;
                  if(IsFilled(id, posIniziale, posFinale))
                     div.classList.add("red");
                  else
                     div.addEventListener("click", gestisciOmbrellone);
                  id++;
               }
            }
         }

         let btn = document.createElement("button");
         _mappa.appendChild(btn);
         btn.classList.add("button", "prenota");
         btn.textContent = "Prenota";
         btn.style.borderRadius = "10px";
         btn.style.margin = "10px";
      })
   }

   function IsFilled(id, posI, posF)
   {
      for (let i = posI; i <= posF; i++){
         const pos = id -1;
         if(ombrelloni[pos].stato[i] != 0)
            return true;
      }

      return false;
   }

   function gestisciOmbrellone()
   {
      if(this.classList.contains("blue"))
      {
         this.classList.remove("blue");
         //SOLUZIONE 1
         //let pos = ombrelloniPrenotati.indexOf(this.id);
         //SOLUZIONE 2
         /*
         let thisId = this.id;
         let pos = ombrelloniPrenotati.findIndex(function(idOmbrellone){
            return idOmbrellone = thisId;
         });
         */
         //SOLUZIONE 3 (arrow function -> non ridefinisce il this che continua a puntare all'ombrellone cliccato)
         //se c'è un solo un parametro si possono omettere le parentesi tonde (); se ci sono 0 o più di un parametro le () sono obbligatorie
         let pos = ombrelloniPrenotati.findIndex(idOmbrellone => {
            return idOmbrellone = this.id;
         })
         ombrelloniPrenotati.splice(pos, 1);
      }
      else
      {
         this.classList.add("blue");
         ombrelloniPrenotati.push(this.id);
      }

      let btn = _mappa.getElementsByTagName("button")[0];

      if(ombrelloniPrenotati.length > 0)
      {
         btn.classList.add("buttonEnabled");
         btn.addEventListener("click", prenota);
      }
      else
      {
         btn.classList.remove("buttonEnabled");
         btn.removeEventListener("click", prenota);
      }
   }

   function prenota(){
      let dataInizio = new Date(_dataInizio.value);
      let dataFine = new Date(_dataFine.value);

      let posIniziale = (dataInizio - new Date(_dataInizio.min)) / MMG;
      let posFinale = (dataFine - new Date(_dataInizio.min)) / MMG;

      for (const idOmbrellone of ombrelloniPrenotati) {
         let pos = idOmbrellone - 1;
         for (let i = posIniziale; i <= posFinale; i++) {
            ombrelloni[pos].stato[i] = user_id;
         }
         
         let request = inviaRichiesta("PATCH", "ombrelloni/" + idOmbrellone, { "stato": ombrelloni[pos].stato });
         let count = 0;
         request.catch(errore);
         request.then(function(response){
            console.log(response.data);
            count++;
             if(count == ombrelloniPrenotati.length)
               alert("Prenotazione eseguita correttamente");
         })
      }
   }

})