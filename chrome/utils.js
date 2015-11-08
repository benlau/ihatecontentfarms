
function tr(selector,message) {
    $(selector).text(chrome.i18n.getMessage(message));
}

function hostname(url) {
    var parser = document.createElement("a");
    parser.href = url;
    return parser.hostname;
}

function trFromTable(table) {
    for (var i in table) {
        $(i).text(chrome.i18n.getMessage(table[i]));
    }
}

module.exports = {
    tr: tr,
    hostname: hostname,
    trFromTable: trFromTable
}