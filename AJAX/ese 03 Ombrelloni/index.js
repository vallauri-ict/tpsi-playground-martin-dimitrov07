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
      
   }

})