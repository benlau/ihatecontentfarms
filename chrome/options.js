var sites = require("./sites"),
    Filter = require("cfblocker/Filter"),
    ListFormatter = require("cfblocker/ListFormatter"),
    LocalStorageStore = require("cfblocker/LocalStorageStore");

$(document).ready(() => {
    
    var submitButton = "#submitButton";
    
    var userBlackListTextArea = "#userBlackList textarea";
    var userWhiteListTextArea = "#userWhiteList textarea";
    
    function submit() {
        $(submitButton).addClass("disabled");
        $(submitButton).text("Saved");
        
        LocalStorageStore.userBlackList = ListFormatter.parse($(userBlackListTextArea).val());
        LocalStorageStore.userWhiteList = ListFormatter.parse($(userWhiteListTextArea).val());

    }
    
    function enableButton() {
        $(submitButton).removeClass("disabled");
        $(submitButton).text("Save");
        $(submitButton).one("click", (e) => {
            e.preventDefault();
            submit();
        });
    }
    
    $("#systemBlackList textarea").val(ListFormatter.stringify(sites));
    
    $(userBlackListTextArea).on("change keyup paste", enableButton);
    
    $(userBlackListTextArea).val(ListFormatter.stringify(LocalStorageStore.userBlackList));
    
    $(userWhiteListTextArea).on("change keyup paste", enableButton);
    
    $(userWhiteListTextArea).val(ListFormatter.stringify(LocalStorageStore.userWhiteList));

    $("#submitButton").click(function() {
        $("#submitButton").addClass("disabled");
    });
});