    
$(document).ready(function() {
    $("#continue").click(function() {
        var queryString = window.location.search.substring(1);
        var token = queryString.split("&");
        var to = "";
        for (var i = 0; i < token.length; i++) {
            var pair = token[i].split('=');
            if (decodeURIComponent(pair[0]) == "to") {
                to = decodeURIComponent(pair[1]);
                break;
            }
        }

        var whiteList 
        try {
            whiteList = JSON.parse(localStorage.getItem("whiteList") || "");
        } catch (e) {
            whiteList = {};
        }
        
        whiteList[to] = new Date().getTime();
        
        try {
            localStorage.setItem("whiteList",JSON.stringify(whiteList));
        } catch (err) {
            // e.g. quote exceed. Just purge old data
            whiteList = {from: true}; 
            localStorage.setItem("whiteList",JSON.stringify(whiteList));
        }

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
    
