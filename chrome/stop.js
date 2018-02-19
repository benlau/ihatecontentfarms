var LocalStorageStore = require("cfblocker/LocalStorageStore"),
    Utils = require("./utils"),
    UrlFormatter = require("cfblocker/UrlFormatter");


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

function unblockTemp(hostname) {
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

    // Disable web request filter
    LocalStorageStore.blockWebRequestFilter();
}

$(document).ready(function() {
    var to = decodeQuery();
    var hostname = Utils.hostname(to);

    $("#warningText").text(chrome.i18n.getMessage("header") + " : " + hostname);

    var trTable = {
        "#detailsLink" : "details",
        "title" : "title",
        "#messageText" : "body",
        "#back" : "backBtn",
        "#continue" : "contBtn",
        "#continueNoAds" : "contNoAdsBtn"
    }

    Utils.trFromTable(trTable);

    $("#continue").click(function() {
        unblockTemp(hostname);
        window.location.href = to;
    });

    $("#continueNoAds").click(function() {
        // Only disable web request so that it could load images.
        // In case user need to switch to full version in cache.
        LocalStorageStore.blockWebRequestFilter();
        window.location.href = UrlFormatter.googleWebCache(to);
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
