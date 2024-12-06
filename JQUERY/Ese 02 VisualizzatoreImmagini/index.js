"use strict"

$(document).ready(function() {
    let btns = $("#btnIndietro").add($("#btnAvanti"));

    const body = $("body");
    body.css({
        "display": "flex",
        "align-items": "center",
        "justify-content": "center"
    });

    let index = 1;

    btns.css({
        "width": "140px",
        "height": "40px",
        "font-weight": "bold",
        "background-color": "orange",
        "border-radius": "50%",
        "margin": "20px"
    });

    const img = $("img");
    img.css({"width": "400px"});
    img.prop("src", "./img/img1.jpg");

    btns[0].disabled = true;

    btns.eq(1).on("click", function(){
        index++;
        if(index != 1)
            btns[0].disabled = false;
        else
            btns[0].disabled = true;

        if(index == 7)
            this.disabled = true;

        img.prop("src", "./img/img" + index + ".jpg");
    })

    btns.eq(0).on("click", function(){
        index--;
        if(index != 7)
            btns[1].disabled = false;
        else
            btns[1].disabled = true;

        if(index == 1)
            this.disabled = true;

        img.prop("src", "./img/img" + index + ".jpg");
    })
});