'use strict'

let textHelp = 
{
    "nome": "Inserisci il tuo Nome",
    "cognome": "Inserisci il tuo Cognome",
    "email": "Inserisci il tuo Indirizzo E-mail",
    "phone": "Inserisci il tuo Telefono"
}

$(document).ready(function() {

    const inputs = $("input[type=text]");
    const labels = $("label");
    const help = $(".help");
    const form = $("fieldset");
    const button = $("input[type=button]");

    let prevColor;

    help.hide();

    coloraLabels();

    inputs.on("mouseenter", function(){
        $(this).css({
            "border": "3px solid green",
            "margin": 0
        });
        help.fadeIn(1500);
        help.text(textHelp[$(this).prop("id")]);
    })

    inputs.on("mouseleave", function(){
        $(this).css({
            "border": "",
            "margin": ""
        })
        help.hide();
    })

    inputs.on("focus", function(){
        let label = $(this).prev();

        let posFinale = {
            "left": "+=190px"
        }

        label.animate(posFinale, 500);
        prevColor = label.css("color");
        label.css("color", "black");
    });

    inputs.on("blur", function(){
        if($(this).val() == "")
        {
            azzeraLabel(this);
        }
    })

    function azzeraLabel(input){
        let label = $(input).prev();

            let posIniziale = {
                "left": "7px"
            }

            label.animate(posIniziale, 1500);
            label.css("color", prevColor);
    }

    function azzeraLabels(){
        let posIniziale = {
            "left": "7px"
        }

        labels.animate(posIniziale, 1500);
    }

    button.on("click", animazioneForm);

    function coloraLabels(){
        const numColors = [ 50, 127, 200 ];

        for (const label of labels) {
            $(label).css("color", `rgb(${numColors[random(0, numColors.length)]}, ${numColors[random(0, numColors.length)]}, ${numColors[random(0, numColors.length)]})`);
        }
    }
	
    function animazioneForm(){
        
        let cssIniziale = {
            "width": "",
            "height": "",
            "top": "",
            "right": ""
        }

        let cssFinale = {
            "width": 0,
            "height": 0,
            "top": 60,
            "right": 60
        }

        form.animate(cssFinale, 4000, function(){
            $(this).hide();
            setTimeout(function(){
                form.show();
            }, 2000);
            $(this).css(cssIniziale);
            inputs.val("");
            azzeraLabels();
            help.hide();
            coloraLabels();
        })
    }
})

function random(min, max)
{
    return Math.floor((max-min)*Math.random()) + min;
}