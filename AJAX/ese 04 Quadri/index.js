"use strict"

$(function () {
    let _head = $('.head')[0];
    let _info = $('.info')[0];
    let _img = $('.img')[0];
    let _btnPrev = $('button')[0];
    let _btnNext = $('button')[1];
	let _wrapperAdd = $('.wrapper')[1];

    let quadri = [];
    let checkedArtist;
	let indexPainting = 0;

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
            input.setAttribute("artista", JSON.stringify(artist)); //solo stringhe quindi convertire in stringa il JSON
            lbl.addEventListener("click", function(){
                indexPainting = 0;
                statusBtns();
                checkedArtist = JSON.parse(this.querySelector("input").getAttribute("artista"));
                loadPaintings(checkedArtist);
            })
            lbl.appendChild(input);
            lbl.innerHTML += artist.name;
        }
        
        let nArtista = random(0, artists.length);

        checkedArtist = JSON.parse(_head.querySelectorAll("input[type=radio]")[nArtista].getAttribute("artista"));
        //console.log(checkedArtist);
        _head.querySelectorAll("input[type=radio]")[nArtista].checked = true;

        loadPaintings(checkedArtist);
    }

    async function loadPaintings(artista)
    {
        console.log(artista);

        quadri = [];

        let response = await inviaRichiesta("GET", "/quadri", { "artist": artista.id }).catch(errore);

        quadri = response.data;

        //console.log(quadri);

        showPaintings(quadri[indexPainting]);
    }

    async function showPaintings(quadro)
    {
        //console.log(quadro)

        let response = await inviaRichiesta("GET", "/artisti/" + quadro.artist).catch(errore);
        let artist = response.data;

        _info.innerHTML = "";
        _img.innerHTML = "";
        
        //INFO
        let div = document.createElement("div");
        div.textContent = `ID = ${quadro.id}`;
        _info.appendChild(div);

        div = document.createElement("div");
        div.textContent = `Titolo = ${quadro.title}`;
        _info.appendChild(div);

        div = document.createElement("div");
        div.textContent = `Genere = ${artist.gender}`;
        _info.appendChild(div);

        div = document.createElement("div");
        div.textContent = `Like = ${quadro.nLike}`;
        _info.appendChild(div);

        //IMG
        const img = document.createElement("img");
        img.src = `./img/${quadro.img}`;
        _img.appendChild(img);
    }

    function statusBtns()
    {
        if(indexPainting == 0)
            _btnPrev.disabled = true;
        else
            _btnPrev.disabled = false;
        
        if(indexPainting == quadri.length - 1)
            _btnNext.disabled = true;
        else
            _btnNext.disabled = false;
    }
    
})

function random(min, max)
{
    return Math.floor((max-min)*Math.random()) + min;
}
