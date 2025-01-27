"use strict"

$(function () {
    let _head = $('.head')[0];
    let _info = $('.info')[0];
    let _img = $('.img')[0];
    let _btnPrev = $('button')[0];
    let _btnNext = $('button')[1];
	let _wrapperAdd = $('.wrapper')[1];
	
    _btnPrev.disabled = true;
	
    getArtists();

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
            input.artista = artist;
            lbl.appendChild(input);
            lbl.innerHTML += artist.name;
        }

        let nArtista = random(0, artists.length);

        _head.querySelectorAll("input[type=radio]")[nArtista].checked = true;

    }
})

function random(min, max)
{
    return Math.floor((max-min)*Math.random()) + min;
}
