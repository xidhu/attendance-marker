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

function getCookie(name) { // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if (name == cookiePair[0].trim()) { // Decode the cookie value and return
            return cookiePair[1];
        }
    }

    // Return null if not found
    return null;
}
function setData(name, data) {
    setCookie(name, JSON.stringify(data), 365);
}
function getData(name) {
    return JSON.parse(getCookie(name));
}
