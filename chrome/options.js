$(document).ready(function() {
    // i18n of UI
    $("#sitelist p").text(chrome.i18n.getMessage("sitelist"));
    $("#save").text(chrome.i18n.getMessage("saveBtn"));

    // Fill in on load
    var userSites;
    try {
        userSites = JSON.parse(localStorage.getItem("sites") || "");
    } catch (e) {
        userSites = []
    }
    if (!userSites || userSites.length==0) {
        userSites = sites;
    };
    $("#input").val(userSites.join("\n"));

    // Button action
    $("#save").click(function() {
        var newsites = $.map($("#input").val().split("\n"), function(s){
            s = s.trim()
            return s.length ? s : null;
        });
        if (newsites.length) {
            sites = newsites;
            try {
                localStorage.setItem("sites", JSON.stringify(newsites))
                window.close()
            } catch (e) {
                // Ignore if quota exceed
                $("#msg").text(chrome.i18n.getMessage("saveFailed"));
            }
        }
    });
});
