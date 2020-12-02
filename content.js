let dataset;
let roll_numbers;
let format;
const processData = (request) => {
    let sortedNumbers = [];
    roll_numbers = roll_numbers.filter(function (item, pos) {
        return roll_numbers.indexOf(item) == pos;
    });
    roll_numbers.forEach((e) => {
        if (parseFloat(request.start) <= parseFloat(e) && parseFloat(e) <= parseFloat(request.end)) 
            sortedNumbers.push(e);
        

    });
    return sortedNumbers.sort((a, b) => a - b);
};

const isValid = (request) => {
    if (request.format.includes("%d")) {
        format = request.format.indexOf("%d");
        return true;
    } else {
        return false;
    }
};

const findData = (request) => {
    
    if (isValid(request)) {
        var msgs = document.getElementsByClassName("oIy2qc");
        dataset = [].slice.call(msgs).map((e) => {
            return e.textContent;
        });
        dataset.forEach((e) => {
            let rest = e.substr(0, format).toLowerCase();
            let number = e.substr(format);
            if (!isNaN(number) && request.format.substr(0, format).toLowerCase() == rest) {
                roll_numbers.push(number);
            }
        });
    }
};
const saveAsCsv = (data, request) => {
    let time = new Date().toLocaleString();
    let csvContent = "data:text/csv;charset=utf-8,Attendance\n" + request.details + "\nDate,Time\n" + time + "\n";
    if (request.absent) {
        csvContent += "Absent Students\n";
        for (let i = parseInt(request.start); i <= parseInt(request.end); i++) {
            if (!data.includes(i.toString())) 
                csvContent += i.toString() + "\r\n";
            

        }
    }
    if (request.present) {
        csvContent += "Present Students\n";
        data.forEach(function (e) {
            csvContent += e + "\r\n";
        });
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", request.save + ".csv");
    document.body.appendChild(link);
    link.click();
};
chrome.runtime.onMessage.addListener(function (request) {
    dataset = "";
    roll_numbers = [];
    format = "";
    var msg_scrn = document.getElementsByClassName("NPEfkd RveJvd snByac");
    msg_scrn[4].click();
    setTimeout(()=>{
      findData(request);
      saveAsCsv(processData(request), request);},1000);
    
});
