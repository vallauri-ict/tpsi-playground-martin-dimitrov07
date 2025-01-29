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
        div.innerHTML = `Like = <b>${quadro.nLike}</b>`;
        const imgLike = document.createElement("img");
        imgLike.src = "./img/like.jpg";
        imgLike.classList.add("like");
        div.appendChild(imgLike);
        _info.appendChild(div);

        //IMG
        const img = document.createElement("img");
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
    
})

function random(min, max)
{
    return Math.floor((max-min)*Math.random()) + min;
}
