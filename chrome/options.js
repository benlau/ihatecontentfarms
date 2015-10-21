$(document).ready(function() {
    // i18n of UI
    $("#sitelist p").text(chrome.i18n.getMessage("sitelist"));
    $("#save").text(chrome.i18n.getMessage("saveBtn"));
    $("#reset").text(chrome.i18n.getMessage("resetBtn"));

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
            try {
                localStorage.setItem("sites", JSON.stringify(newsites))
                window.close()
            } catch (e) {
                // Ignore if quota exceed
                $("#msg").text(chrome.i18n.getMessage("saveFailed"));
            }
        }
    });

    $("#reset").click(function() {
        try {
            localStorage.removeItem("sites")
        } catch (e) {
            // ignore: Nothing wrong if you don't have it in localStorage
        };
        // Clear message and reset textarea to default
        $("#msg").text('');
        $("#input").val(sites.join("\n"));
    });
});
