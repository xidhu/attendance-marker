document.addEventListener(
  "DOMContentLoaded",
  () => {
    let mode1 = document.getElementById("mode1").innerHTML;
    let mode2 = document.getElementById("mode2").innerHTML;
    document.getElementById("mode2").innerHTML = "";
    let mode = 1;
    const getInputs = () => {
      if (mode == 1) {
        let options = getData("attendance_marker1");
        if (options != null) {
          document.getElementById("start_roll").value = options.start;
          document.getElementById("end_roll").value = options.end;
          document.getElementById("format").value = options.format;
          document.getElementById("det").value = options.details;
          document.getElementById("defaultChecked").checked = options.absent;
          document.getElementById("defaultChecked1").checked = options.present;
          document.getElementById("save").value = options.save;
        }
      } else {
        let options = getData("attendance_marker2");
        if (options != null)
          document.getElementById("det").value = options.details;
      }
    };
    getInputs();
    document.getElementById("mode_selector").addEventListener("change", (e) => {
      if (e.target.checked) {
        document.getElementById("mode1").innerHTML = "";
        document.getElementById("mode2").innerHTML = mode2;
      } else {
        document.getElementById("mode1").innerHTML = mode1;
        document.getElementById("mode2").innerHTML = "";
      }
      mode = e.target.checked ? 2 : 1;
      getInputs();
    });

    document
      .querySelector(".take_attendance")
      .addEventListener("click", onClick, true);

    function onClick() {
      let request;
      if (mode == 1) {
        let first_rn = document.getElementById("start_roll").value;
        let last_rn = document.getElementById("end_roll").value;
        let format = document.getElementById("format").value;
        let details = document.getElementById("det").value;
        let save = document.getElementById("save").value;
        let absent = document.getElementById("defaultChecked").checked;
        let present = document.getElementById("defaultChecked1").checked;
        request = {
          start: first_rn,
          end: last_rn,
          format: format,
          details: details,
          absent: absent,
          present: present,
          save: save,
          mode: mode,
        };
        setData("attendance_marker1", request);
      } else {
        let save = document.getElementById("save").value;
        let details = document.getElementById("det").value;
        request = {
          details: details,
          save: save,
          mode: mode,
        };
        setData("attendance_marker2", request);
      }
      chrome.tabs.query(
        {
          currentWindow: true,
          active: true,
        },
        function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, request);
        }
      );
    }
  },
  false
);
