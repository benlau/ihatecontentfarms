
function tr(selector,message) {
    $(selector).text(chrome.i18n.getMessage(message));
}

function hostname(url) {
    var parser = document.createElement("a");
    parser.href = url;
    return parser.hostname;
}

module.exports = {
    tr: tr,
    hostname: hostname
}