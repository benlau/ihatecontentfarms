var LocalStorageStore = require("cfblocker/LocalStorageStore"),
    Utils = require("./utils");

function decodeQuery() {
    var queryString = window.location.search.substring(1);
    var token = queryString.split("&");
    var to = "";
    for (var i = 0; i < token.length; i++) {
        var pair = token[i].split("=");
        if (decodeURIComponent(pair[0]) == "to") {
            to = decodeURIComponent(pair[1]);
            break;
        }
    }
    return to;
}

$(document).ready(function() {
    var to = decodeQuery();
    var hostname = Utils.hostname(to);

    $("title").text(chrome.i18n.getMessage("title"));
    $("h1").text(chrome.i18n.getMessage("header") + " : " + hostname);
    $("p").text(chrome.i18n.getMessage("body"));
    $("#back").text(chrome.i18n.getMessage("backBtn"));
    $("#continue").text(chrome.i18n.getMessage("contBtn"));

    $("#continue").click(function() {
        var key = "tmpWhitelist";

        var Whitelist
        try {
            Whitelist = JSON.parse(localStorage.getItem(key) || "");
        } catch (e) {
            Whitelist = {};
        }

        var field = hostname;

        Whitelist[field] = new Date().getTime();

        try {
            localStorage.setItem(key,JSON.stringify(Whitelist));
        } catch (err) {
            // e.g. quote exceed. Just purge old data
            Whitelist = {};
            Whitelist[field] = true;
            localStorage.setItem(key,JSON.stringify(Whitelist));
        }

        LocalStorageStore.blockWebRequestFilter();
        window.location.href = to;
    });

    $("#back").click(function() {

        if (history.length <= 2) {
            if (window.opener || window.parent) {
                window.close();
            } else {
                window.history.go(-1);
            }
        } else {
            window.history.go(-2);
        }
    });

});
