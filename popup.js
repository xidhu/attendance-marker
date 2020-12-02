document.addEventListener("DOMContentLoaded", () => {
    let options = getData("attendance_marker");
    if (options != null) {
        document.getElementById("start_roll").value = options.start;
        document.getElementById("end_roll").value = options.end;
        document.getElementById("format").value = options.format;
        document.getElementById("det").value = options.details;
        document.getElementById("defaultChecked").checked = options.absent;
        document.getElementById("defaultChecked1").checked = options.present;
        document.getElementById("save").value = options.save;
    }
    document.querySelector(".take_attendance").addEventListener("click", onClick, true);

    function onClick() {
        let first_rn = document.getElementById("start_roll").value;
        let last_rn = document.getElementById("end_roll").value;
        let format = document.getElementById("format").value;
        let details = document.getElementById("det").value;
        let save = document.getElementById("save").value;
        let absent = document.getElementById("defaultChecked").checked;
        let present = document.getElementById("defaultChecked1").checked;
        let request = {
            start: first_rn,
            end: last_rn,
            format: format,
            details: details,
            absent: absent,
            present: present,
            save: save
        };
        setData("attendance_marker", request);
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, request);
        });
    }
}, false);
