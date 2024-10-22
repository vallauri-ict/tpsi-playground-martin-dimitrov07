"use strict"

//const vettore (variabile vettoriale) - puntatore che punta ad una certa zona nella memoria dove si trova il vettore (const è il puntatore del vettore che non cambia mai, è il vettore che cambia)
let films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", true, "10/03/2024", 5],
    [2, "21 Grammi", true, "17/03/2024", 3],
    [3, "Star Wars", false, "15/03/2024", 1],
    [4, "Matrix", false, "01/01/2023", 4],
    [5, "Shrek", false, "21/03/2024", 2],
    [6, "Kill Bill Vol. 1", true, "22/04/2024", 5],
    [7, "Inception", true, "18/04/2024", 5]
];


//window.addEventListener("load", function () {
window.onload = function () {

    const _tbody = document.getElementsByTagName("tbody")[0];
    //const _tbody = document.querySelector("tbody");
    //const _tbody = document.querySelectorAll("tbody")[0];

    const _btnAdd = document.getElementById("btn-add");
    const _btnClear = document.getElementById("btn-clear");
    const _btnReload = document.getElementById("btn-reload");
    const _btnCount = document.getElementById("btn-count");
    const _btnLogin = document.getElementById("btn-login");

    _btnAdd.addEventListener("click", addNewFilm);
    _btnClear.addEventListener("click", function(){
        films = [];
        visualizza();
    });
    _btnReload.addEventListener("click", function(){
        //window.location.reload();
        window.location.href = "index.html"; //stessa cosa di quella sopra
    });
    _btnCount.addEventListener("click", function(){
        const newModal = new bootstrap.Modal("#modal-count-films"); // davanti all'id ci vuole #
        newModal.show();
        const _nFilm = document.getElementById("span-n-films");
        _nFilm.textContent = films.length;
    });
    _btnLogin.addEventListener("click",function(){
        const alertLogin = document.getElementById("alert-login");
        alertLogin.classList.remove("d-none");
        setTimeout(function(){ alertLogin.classList.add("d-none"); }, 3000);
    });

    visualizza();

    function visualizza() {
        _tbody.innerHTML = "";
        for (let i = 0; i < films.length; i++) {
            const riga = document.createElement("tr");
            _tbody.appendChild(riga);

            for (let j = 0; j < films[i].length; j++) {
                const td = document.createElement("td");
                riga.appendChild(td);
                if (j == 2) {
                    const chk = document.createElement("input");
                    chk.type = "checkbox";
                    chk.checked = films[i][j];
                    //chk.readOnly = true;
                    chk.disabled = true;
                    td.appendChild(chk);
                }
                else if (j == 4) {
                    for (let k = 0; k < 5; k++) {
                        const icon = document.createElement("i");
                        //icon.classList.add("bi");
                        if (k < films[i][j])
                            icon.classList.add("bi", "bi-star-fill");
                        else
                            icon.classList.add("bi", "bi-star");
                        td.appendChild(icon);
                    }
                }
                else
                    td.textContent = films[i][j];
            }
        }
    }

    function addNewFilm() {
        let id = films.length + 1;
        let title = prompt("Inserisci il nome del film: ");
        let favorite;
        let n = random(0, 2);
        if (n == 0)
            favorite = true;
        else
            favorite = false;
        let date = new Date(); //restituisce un oggetto date contenente la data corrente (bisogna partire dall'oggetto date)
        let strDate = date.toLocaleDateString(); //restituisce la data gg/mm/aaaa in stringa
        let rating = random(1, 6);

        let vet = [];
        vet.push(id);
        vet.push(title);
        vet.push(favorite);
        vet.push(strDate);
        vet.push(rating);
        films.push(vet);

        visualizza();
    }

}

function random(min, max) {
    return Math.floor((max - min) * Math.random() + min);
}