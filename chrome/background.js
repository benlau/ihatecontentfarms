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
        key = "tmpWhiteList";
    
    filter.appendBlackList(sites);
    filter.appendBlackList(ListFormatter.parse(LocalStorageStore.userBlackList));

    filter.appendWhiteList(ListFormatter.parse(LocalStorageStore.userWhiteList));

    if (filter.match(domain)) {
        var whiteList ;
        try {
            whiteList = JSON.parse(localStorage.getItem(key) || "");
        } catch (e) {
            whiteList = {};            
        }
        
        if (whiteList.hasOwnProperty(domain)) {
            var timestamp = (new Date()).getTime();
            var threshold = 10 * 60 * 1000; // Ten minutes
            if (timestamp - whiteList[domain] > threshold) {
                delete whiteList[domain];
                
                try {
                    localStorage.setItem(key,JSON.stringify(whiteList));
                } catch (err) {
                    console.error(err);
                }
            }
        }
        
        if (!whiteList.hasOwnProperty(domain)) {
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
//        console.log(info.url,"isWebRequestFilterBlocked",LocalStorageStore.isWebRequestFilterBlocked);

    if (!LocalStorageStore.isWebRequestFilterBlocked ) {
        var cancel = block(info.url);
//        if (cancel) {
//            console.log("Block",info.url);
//        }
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
