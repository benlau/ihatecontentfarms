var sites = require("./sites"),
    Filter = require("cfblocker/Filter");

function hostname(url) {
    var parser = document.createElement("a");
    parser.href = url;
    return parser.hostname;
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    var filter = new Filter();
    
    filter.appendBlackList(sites);
        
    if (filter.match(hostname(tab.url))) {
        var whiteList ;
        try {
            whiteList = JSON.parse(localStorage.getItem("whiteList") || "");
        } catch (e) {
            whiteList = {};            
        }
        
        if (whiteList.hasOwnProperty(tab.url)) {
            var timestamp = (new Date()).getTime();
            var threshold = 10 * 60 * 1000; // Ten minutes
            if (timestamp - whiteList[tab.url] > threshold) {
                delete whiteList[tab.url];
                
                try {
                    localStorage.setItem("whiteList",JSON.stringify(whiteList));
                } catch (err) {
                    console.error(err);
                }
            }
        }
        
        if (!whiteList.hasOwnProperty(tab.url))
            chrome.tabs.update(tab.id,{ url: "stop.html?to=" + encodeURIComponent(tab.url)});    
    }    
});
