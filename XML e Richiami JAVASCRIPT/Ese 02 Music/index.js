"use strict"

window.addEventListener("load", function() {
	const content = document.getElementById("content")
	const genderElements = document.querySelectorAll(".dropdown-menu li");
	for (let genderElement of genderElements){
		genderElement.addEventListener("click", genderClick)
	}		
		
    const iFriends = document.getElementById("i-friends");
    iFriends.addEventListener("click", showAlert);
	const alertFriends = document.getElementById("alert-friends");

    const iSearch = document.getElementById("i-search");
    iSearch.addEventListener("click", toggleSearch);
	const txtSearch = document.getElementById("txt-search");

	const title = document.createElement("h3");
		
    loadSongs("All");

	function loadSongs(gender){
		let cont = 0;
		if(gender == "All")
			gender = "";


		content.innerHTML = "";
		content.appendChild(title);
		for (const song of songs) {
			if(gender == "" || gender == song[5])
			{
				cont++;
				const mainDiv = document.createElement("div");
				mainDiv.classList.add("row", "border", "rounded", "p-2", "m-2");
				content.appendChild(mainDiv);

				const coverDiv = document.createElement("div");
				coverDiv.classList.add("col-md-4", "col-xl-3");
				mainDiv.appendChild(coverDiv);

				const coverImg = document.createElement("img");
				coverImg.src = "./img/cover" + song[0] + ".jpg";
				coverImg.classList.add("w-100", "rounded");
				coverDiv.appendChild(coverImg);

				const divInfo = document.createElement("div");
				divInfo.classList.add("col-md-8", "col-xl-9");
				mainDiv.appendChild(divInfo);

				const hTitle = document.createElement("h2");
				hTitle.textContent = song[1];
				divInfo.appendChild(hTitle);

				const pArtist = document.createElement("p");
				pArtist.textContent = "Artist: " + song[2];
				divInfo.appendChild(pArtist);

				const pAlbum = document.createElement("p");
				pAlbum.textContent = "Album: " + song[3];
				divInfo.appendChild(pAlbum);

				const pDuration = document.createElement("p");
				let m = Math.floor(song[4]/60); 
				let s = song[4] % 60;
				if(s == 0)
					pDuration.textContent = "Duration: " + m + " min ";
				else
					pDuration.textContent = "Duration: " + m + " min " + s + " s";
				divInfo.appendChild(pDuration);

				const pGender = document.createElement("p");
				pGender.textContent = song[5];
				divInfo.appendChild(pGender);

				const pStream = document.createElement("p");
				pStream.textContent = "Streams: " + song[6].toLocaleString();
				divInfo.appendChild(pStream);
				
				const btnPlay = document.createElement("button");
				btnPlay.classList.add("btn", "btn-secondary");
				btnPlay.textContent = "Play";
				divInfo.appendChild(btnPlay);
				btnPlay.addEventListener("click", function(){
					const newModal = new bootstrap.Modal("#play-modal");
					const spanSong = document.getElementById("song-title-modal");
					spanSong.textContent = song[1];
					newModal.show();
				});
			}
		}

		title.textContent = "Numero di dischi " + gender + ": " + cont;
	}
	
	function genderClick(){
		for (const li of genderElements) {
			const a = li.firstElementChild;
			a.classList.remove("active");
		}
		this.firstElementChild.classList.add("active");
		loadSongs(this.textContent);
	}

	function showAlert(){
		alertFriends.classList.remove("d-none");
		setTimeout(function(){ alertFriends.classList.add("d-none"); }, 3000);
	}

	function toggleSearch(){
		if(txtSearch.classList.contains("d-none"))
			txtSearch.classList.remove("d-none");
		else
			txtSearch.classList.add("d-none");
	}

});

