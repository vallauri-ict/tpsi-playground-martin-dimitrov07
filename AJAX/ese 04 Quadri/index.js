"use strict"

let quadri = [];
let checkedArtist;
let indexPainting = 0;

$(function () {
    let _head = $('.head')[0];
    let _info = $('.info')[0];
    let _img = $('.img')[0];
    let _btnPrev = $('button')[0];
    let _btnNext = $('button')[1];
	let _wrapperAdd = $('.wrapper')[1];


    _btnPrev.disabled = true;
	
    getArtists();

    let btns = $(_btnPrev).add($(_btnNext));

    btns.on("click", function(){
        if(this.textContent.trim() == "Avanti")
            indexPainting++;
        else
            indexPainting--;

        statusBtns();

        loadPaintings(checkedArtist);
    })

    async function getArtists()
    {
        let response = await inviaRichiesta("GET", "/artisti").catch(errore);
        
        let artists = response.data;

        for (const artist of artists) {
            const lbl = document.createElement("label");
            _head.appendChild(lbl);
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "artisti";
            input.setAttribute("data-artista", JSON.stringify(artist)); //solo stringhe quindi convertire in stringa il JSON
            input.addEventListener("click", function(){
                indexPainting = 0;
                statusBtns();
                checkedArtist = JSON.parse(this.getAttribute("data-artista"));
                loadPaintings(checkedArtist);
            })
            lbl.appendChild(input);
            //riscrive il contenuto dell'oggetto label e quindi gli oggetti interni perdono sia gli eventi sia gli attributi personalizzati
            // lbl.innerHTML += artista.name;
            const span = document.createElement("span");
            span.textContent = artist.name;
            lbl.appendChild(span);
        }
        
        let nArtista = random(0, artists.length);

        checkedArtist = JSON.parse(_head.querySelectorAll("input[type=radio]")[nArtista].getAttribute("data-artista"));
        //console.log(checkedArtist);
        _head.querySelectorAll("input[type=radio]")[nArtista].checked = true;

        loadPaintings(checkedArtist);
    }

    async function loadPaintings(artista)
    {
        //console.log(artista);

        let response = await inviaRichiesta("GET", "/quadri", { "artist": artista.id }).catch(errore);

        quadri = response.data;

        //console.log(quadri);

        showPaintings();
    }

    async function showPaintings()
    {
        let quadro = quadri[indexPainting];

        _info.innerHTML = "";
        _img.innerHTML = "";
        
        //INFO
        let div = document.createElement("div");
        div.innerHTML = `ID = <b>${quadro.id}</b>`;
        _info.appendChild(div);

        div = document.createElement("div");
        div.innerHTML = `Titolo = <b>${quadro.title}</b>`;
        _info.appendChild(div);

        div = document.createElement("div");
        div.innerHTML = `Genere = <b>${checkedArtist.gender}</b>`;
        _info.appendChild(div);

        div = document.createElement("div");
        const span = document.createElement("span");
        span.innerHTML = `Like = <b>${quadro.nLike}</b>`;;
        span.id = "nLike";
        div.appendChild(span);
        const imgLike = document.createElement("img");
        imgLike.src = "./img/like.jpg";
        imgLike.classList.add("like");
        imgLike.addEventListener("click", () => {
            quadro.nLike++;
            document.getElementById("nLike").innerHTML = `Like = <b>${quadro.nLike}</b>`;
            let request = inviaRichiesta("PATCH", "/quadri/" + quadro.id, { "nLike": quadro.nLike });
            request.catch(errore);
            request.then(function(response){
                alert("Hai messo un piace a questo quadro");
            })
        });
        div.appendChild(imgLike);
        _info.appendChild(div);

        //IMG
        const img = document.createElement("img");
        img.style.width = "200px";
        //se l'immagine non è base64
        if(!quadro.img.startsWith("data:image/"))
            img.src = `./img/${quadro.img}`;
        else //se l'immagine è base64
            img.src = quadro.img;
        _img.appendChild(img);
    }

    function statusBtns()
    {
        if(indexPainting <= 0)
            _btnPrev.disabled = true;
        else
            _btnPrev.disabled = false;
        
        if(indexPainting >= quadri.length - 1)
            _btnNext.disabled = true;
        else
            _btnNext.disabled = false;
    }

    btnSalva.addEventListener("click", function(){
        let blob = txtFile.files[0];
        let title = txtTitolo.value;

        if(!title || !blob)
            alert("Scegliere un file e assegnare un titolo");
        else
        {
            let promise = base64Convert(blob);

            promise.catch(function(err){ alert("Errore conversione immagine: \n" + err) });
            promise.then(function(base64Img){
                let artist = JSON.parse(_head.querySelector("input[type=radio]:checked").getAttribute("data-artista"));
                console.log(artist.id);

                let quadro = {
                    "artist": artist.id,
                    "title": title,
                    "img": base64Img,
                    "nLike": 0
                }

                let request = inviaRichiesta("POST", "/quadri", quadro);

                request.catch(errore);
                request.then(function(HTTPResponse){
                    console.log(HTTPResponse);
                    alert("Quadro inserito correttamente");
                    showPaintings();
                })
            })
        }
    })
    
})

function random(min, max)
{
    return Math.floor((max-min)*Math.random()) + min;
}

function base64Convert(blob) {
    return new Promise(function(resolve, reject){
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (event) {
    resolve(event.target.result); // event.target sarebbe reader
    };
    reader.onerror = function (error) {
    reject(error);
    };
    })
   }
   