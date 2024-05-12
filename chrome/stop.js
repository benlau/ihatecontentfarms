import * as Utils from "./utils.js";
import {UrlFormatter} from "./cfblocker/UrlFormatter.js";
import LocalStorageStore from "./cfblocker/LocalStorageStore.js";

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

    let unblcoking = false;

    const unblockTemp = async (hostname) => {
        if (unblcoking) {
            return;
        }
        unblcoking = true;
        try {
            await LocalStorageStore.addTempWhiteList(hostname);
            await new Promise(resolve => {
                chrome.runtime.sendMessage({type: "content_farm_blocker.refreshRules"}, resolve);
            });
        } finally {
            unblcoking = false;
        }
    }

    $("#continue").click(async () => {
        await unblockTemp(hostname);
        window.location.href = to;
    });

    $("#continueNoAds").click(async() => {
        // Image / CSS is not longer blocked
        // So it only need to redirect to the google cache
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
