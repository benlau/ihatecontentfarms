var sites = require("./sites"),
    Filter = require("cfblocker/Filter"),
    ListFormatter = require("cfblocker/ListFormatter"),
    LocalStorageStore = require("cfblocker/LocalStorageStore");

function hostname(url) {
    var parser = document.createElement("a");
    parser.href = url;
    return parser.hostname;
}

function block(url) {
    var filter = new Filter(),
        ret = false,
        domain = hostname(url),
        key = "tmpWhitelist";

    filter.appendBlacklist(sites);
    filter.appendBlacklist(ListFormatter.parse(LocalStorageStore.userBlacklist));

    filter.appendWhitelist(ListFormatter.parse(LocalStorageStore.userWhitelist));

    if (filter.match(domain)) {
        var Whitelist ;
        try {
            Whitelist = JSON.parse(localStorage.getItem(key) || "");
        } catch (e) {
            Whitelist = {};
        }

        if (Whitelist.hasOwnProperty(domain)) {
            var timestamp = (new Date()).getTime();
            var threshold = 10 * 60 * 1000; // Ten minutes
            if (timestamp - Whitelist[domain] > threshold) {
                delete Whitelist[domain];

                try {
                    localStorage.setItem(key,JSON.stringify(Whitelist));
                } catch (err) {
                    console.error(err);
                }
            }
        }

        if (!Whitelist.hasOwnProperty(domain)) {
            ret = true;
        }
    }
    return ret;
}

function handle(tab) {
    if (block(tab.url)) {
        chrome.tabs.update(tab.id,{ url: "stop.html?to=" + encodeURIComponent(tab.url)});
    }
}

chrome.webRequest.onBeforeRequest.addListener(function(info) {
    var cancel = false;

    if (!LocalStorageStore.isWebRequestFilterBlocked ) {
        cancel = block(info.url);
    }

    return {cancel: cancel};

},{
    urls: ["*://*/*"]
},["blocking"]
);

chrome.tabs.onCreated.addListener(function(tab) {
    handle(tab);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    handle(tab);
});
