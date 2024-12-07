"use strict";

var utenti = [
    { "user": "pippo", "pwd": "pwd1Pippo" },
    { "user": "pluto", "pwd": "pwd1Pluto" },
    { "user": "minnie", "pwd": "pwd1Minnie" }
];

$(document).ready(function () {
    const txtUser = $("#txtUser");
    const txtPwd = $("#txtPwd");
    const msgUser = $("#msgUser");
    const msgPwd = $("#msgPwd");

    const users = utenti.map(function(utente){
        return utente.user;
    });
    const pwds = utenti.map(function(utente){
        return utente.pwd;
    });

    txtUser.on("change", function () {
        if(users.includes($(this).val()))
            validateInput(txtUser, msgUser, "OK");
        else
        validateInput(txtUser, users, msgUser, "Utente non valido");
    });

    txtPwd.on("change", function () {
        if(txtPwd.val().length >= 8 && validateLetter(txtPwd.val()) && validateNumber(txtPwd.val()) && txtPwd.val() == pwds[users.indexOf(txtUser.val())])
            validateInput(txtPwd, msgPwd, "OK");
        else
            validateInput(txtPwd, msgPwd, "Password non valida");
    });

    $("#txtUser, #txtPwd").on("mouseover", function(){
        $(this).css("border", "2px solid blue");
        $(this).css("background-color", "#CCF");
    })

    $("#txtUser, #txtPwd").on("mouseout", function(){
        $(this).css("border", "");
        $(this).css("background-color", "");
    })

    function validateInput(txt, msg, msgText) {
        msg.hide();

        if(msgText == "OK")
            txt.css("border", "2px solid black");
        else
            txt.css("border", "2px solid red");

        msg.fadeIn();
        msg.text(msgText);
        if(msgText == "OK")
            msg.css("color", "green")
        else
            msg.css("color", "red");
    }

    function validateLetter(inputPwd)
    {
        for (let i = 0; i < inputPwd.length; i++) {
            let c = inputPwd.charAt(i)
            if(isLetter(c))
                return true;
        }

        return false;
    }


    function isLetter(c){
        if (c.toLowerCase() == c.toUpperCase())
            return false;

        return true;
    }

    function validateNumber(inputPwd)
    {
        for (let i = 0; i < inputPwd.length; i++) {
            let c = inputPwd.charAt(i)
            if($.isNumeric(c))
                return true;
        }

        return false;
    }
});
