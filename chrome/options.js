var sites = require("./sites"),
    Filter = require("cfblocker/Filter"),
    ListFormatter = require("cfblocker/ListFormatter"),
    LocalStorageStore = require("cfblocker/LocalStorageStore");

$(document).ready(() => {
    
    var submitButton = "#submitButton";
    
    var userBlacklistTextArea = "#userBlacklist textarea";
    var userWhitelistTextArea = "#userWhitelist textarea";
    
    function submit() {
        $(submitButton).addClass("disabled");
        $(submitButton).text("Saved");
        
        LocalStorageStore.userBlacklist = ListFormatter.parse($(userBlacklistTextArea).val());
        LocalStorageStore.userWhitelist = ListFormatter.parse($(userWhitelistTextArea).val());

    }
    
    function enableButton() {
        $(submitButton).removeClass("disabled");
        $(submitButton).text("Save");
        $(submitButton).one("click", (e) => {
            e.preventDefault();
            submit();
        });
    }
    
    $("#systemBlacklist textarea").val(ListFormatter.stringify(sites));
    
    $(userBlacklistTextArea).on("change keyup paste", enableButton);
    
    $(userBlacklistTextArea).val(ListFormatter.stringify(LocalStorageStore.userBlacklist));
    
    $(userWhitelistTextArea).on("change keyup paste", enableButton);
    
    $(userWhitelistTextArea).val(ListFormatter.stringify(LocalStorageStore.userWhitelist));

    $("#submitButton").click(function() {
        $("#submitButton").addClass("disabled");
    });
});