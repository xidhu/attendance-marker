function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (
        value || ""
    ) + expires + "; path=/";
}

function getCookie(name) {
    var cookieArr = document.cookie.split(";");

    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if (name == cookiePair[0].trim()) {
            return cookiePair[1];
        }
    }
    return null;
}
function setData(name, data) {
    setCookie(name, JSON.stringify(data), 365);
}
function getData(name) {
    return JSON.parse(getCookie(name));
}
