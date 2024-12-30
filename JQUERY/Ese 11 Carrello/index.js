"use strict"

const CARRELLO = [];

window.onload = function(){
    const carrello = $("#carrello");
    const table = $("table");
    const elencoArticoli = $("#elencoArticoli");
    const details = $(".details");
    const btnCarrello = $("#btnCarrello");

    details.hide();

    loadElencoArticoli();

    btnCarrello.on("click", function(){
        if(!btnCarrello.html().includes("Chiudi"))
            btnCarrello.html("&#708 Chiudi Carrello ");
        else
            btnCarrello.html("&#709 Apri Carrello ");
        carrello.slideToggle(1000);
        showCarrello();
    });

    function loadElencoArticoli(){

        articoli.forEach(function(article, i){
            $("<div>", {
                "id": "article-" + i,
                "prop": { "nameCamera": article.nome },
                "addClass": "article",
                "appendTo": elencoArticoli,
                "append": [
                    $("<img>", {
                        "src": "./img/" + article.src + ".jpg",
                        "title": "Aggiungi al carrello",
                        "addClass": "image"
                    }),
                    $("<div>", {
                        "addClass": "name",
                    })
                ],
                "on": {
                    "mouseover": function(){
                        $("#" + this.id + " .name").text($(this).prop("nameCamera"));
                        //console.log($("#" + this.id + " .name"))
                    },
                    "mouseout": function(){
                        $("#" + this.id + " .name").text("");
                    },

                    "click": showDetails
                }
            })
        })
    }

    function showDetails(){
        details.slideDown(1000);
        details.html("");
        let selectedCamera = this;

        let article = articoli.find(function(article){
            return article.nome == $(selectedCamera).prop("nameCamera");
        });

        $("<div>").addClass("detail-close").appendTo(details).append("<span>X</span>");
        $("<div>").addClass("detail-img").appendTo(details).append($("<img>").attr("src", "./img/" + article.src + ".jpg"));
        
        const h4 = $("<h4>").addClass("item-title").text(article.nome);
        const pDescription = $("<p>").text(article.descrizione);
        const pPrice = $("<p>").text("$ " + article.prezzo);
        const button = $("<button>").addClass("item-add").text("Aggiungi al carrello").on("click", function(){ aggiungiAlCarrello(article) });
        $("<div>").addClass("detail-info").appendTo(details).append(h4, pDescription, pPrice, button);    
        
        
        $(".detail-close span").on("click", function(){
            details.slideUp(1000, function(){
                details.html("");
            });
        })
    }

    function aggiungiAlCarrello(article){
        let articlesInCarrello = CARRELLO.map(function(item){
            return item.article.nome;
        })

        if(articlesInCarrello && articlesInCarrello.includes(article.nome))
        {
            let indexArticle = articlesInCarrello.findIndex(function(item){
                return item == article.nome;
            })

            CARRELLO[indexArticle].quantity++;
        }
        else
        {
            let articleCarrello = { 
                "article": article,
                "quantity": 1
            }

            CARRELLO.push(articleCarrello);
        }

        console.log(CARRELLO);

        showCarrello();
    }

    function showCarrello(){
        table.html(`				
            <tr>
			    <th width="30%">nome</th>
				<th width="30%">prezzo</th>
				<th width="30%">quantità</th>
				<th width="10%"></th>
			</tr>
        `)

        console.log(btnCarrello.value);

        for (const item of CARRELLO) {
            $("<tr>", {
                "appendTo": table,
                "append": [
                    $("<td>", {
                        "text": item.article.nome
                    }),
                    $("<td>", {
                        "text": item.article.prezzo
                    }),
                    $("<td>", {
                        "text": item.quantity
                    }),
                    $("<td>", {
                        "append": [
                            $("<img>", {
                                "src": "./img/_cestino.png",
                                "on": {
                                    "click": function(){
                                        let index = CARRELLO.findIndex(function(itemCarrello){
                                            return itemCarrello.article.nome == item.article.nome;
                                        })

                                        CARRELLO.splice(index, 1);

                                        showCarrello();
                                    }
                                }
                            })
                        ]
                    })
                ]
            })
        }
    }
}