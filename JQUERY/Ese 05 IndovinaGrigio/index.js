"use strict"

window.onload = function(){
    const wrapper = $("#wrapper");
    const tooltip = $("#tooltip");

    const txtPosizione = $("#txtPosizione");
    const txtColore = $("#txtColore");
    $("#btnOk").on("click", function(){
        if(txtPosizione.val() && txtColore.val() && parseInt(txtPosizione.val()) >= 0 &&
        parseInt(txtPosizione.val()) < 9 && parseInt(txtColore.val()) >= 0 && parseInt(txtColore.val()) <= 255)
        {
            const div = wrapper.children().eq(parseInt(txtPosizione.val()));
            /* SOLUZIONE 1
            const itemColor = div.css("background-color");
            let userColor = parseInt(txtColore.val());
            userColor = `rgb(${userColor}, ${userColor}, ${userColor})`;
            */
            if(div.prop("colore") == parseInt(txtColore.val()))
                alert("Bravo hai indovinato");
            else if(div.prop("colore") > parseInt(txtColore.val()))
                alert("Numero troppo basso");
            else
                alert("Numero troppo alto");
        }
        else
            alert("Valori non validi");

        txtColore.val("");
        txtPosizione.val("");
    })

    wrapper.css({
        "backgroundColor": "#ffa",
        "float": "left"
    });
    tooltip.hide();

    creaDivs();

    function creaDivs(){
        for (let i = 0; i < 9; i++) 
        {
            const grigio = random(0, 256);
            const color = `rgb(${grigio}, ${grigio}, ${grigio})`;

            $("<div>", {
                "css": {
                    "background-color": color
                },
                "addClass": "box",
                "appendTo": wrapper,
                "prop": {
                    "colore": grigio
                },
                "on": {
                    "mouseover": function(){
                        //.stop(true) -> svuota completamente la coda
                        tooltip.text(color).stop(true).fadeIn(1000);
                    },
                    "mouseout": function(){
                        tooltip.stop(true).fadeOut(1000);
                    }
                }
            });

            //div[0].colore = grigio
            //div.get(0).colore = grigio
        }
    }
}

function random(min, max){
    return Math.floor((max-min) * Math.random()) + min;
}