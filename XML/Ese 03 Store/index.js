"use strict"

window.addEventListener("load", function () {
	const content = document.getElementById("content")
  
    const btnSearch = document.getElementById("btn-search");
    btnSearch.addEventListener("click", showAlert);
    const alertSearch = document.getElementById("alert-search");

   loadProducts();

    function loadProducts(){
        const h3 = document.createElement("h3");
        h3.textContent = "Numero di Prodotti: " + products.length;
        content.appendChild(h3);

        const row = document.createElement("div");
        row.classList.add("row");
        content.appendChild(row);

        for (const product of products) {
            const col = document.createElement("div");
            col.classList.add("col-md-4");
            row.appendChild(col);
    
            const card = document.createElement("div");
            card.classList.add("card");
            col.appendChild(card);
    
            const cardImg = document.createElement("img");
            cardImg.classList.add("card-img-top");
            cardImg.src = "./img/products/product" + product[0] + ".jpg";
            card.appendChild(cardImg);   

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            card.appendChild(cardBody);

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = product[1];
            cardBody.appendChild(cardTitle);

            const cardText = document.createElement("p");
            cardText.classList.add("card-text");
            cardText.textContent = `Marca: ${product[2]} / Display: ${product[3]} / Processore: ${product[4]} / Memoria: ${product[5]} GB / Memoria di massa: ${product[6]} GB`;
            cardBody.appendChild(cardText);

            const btnCompra = document.createElement("a");
            btnCompra.classList.add("btn", "btn-secondary");
            btnCompra.text = "Compra";
            btnCompra.addEventListener("click", buyProduct);
            cardBody.appendChild(btnCompra);
        }
    }

    function showAlert(){
        alertSearch.classList.remove("d-none");
        setTimeout(function(){ alertSearch.classList.add("d-none") }, 3000);
    }

    function buyProduct(){
        const newModal = new bootstrap.Modal("#buy-modal");
        newModal.show();
    }



});
