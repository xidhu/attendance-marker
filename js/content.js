let names = [];
let roll_numbers;
let format;
let openChatBar = "/html/body/div[1]/c-wiz/div[1]/div/div[9]/div[3]/div[1]/div[3]/div/div[2]/div[3]/span/span";
let closeChatBar = "/html/body/div[1]/c-wiz/div[1]/div/div[9]/div[3]/div[4]/div/div[2]/div[1]/div[2]/div/span/button/i"
let chatMessages = "/html/body/div[1]/c-wiz/div[1]/div/div[9]/div[3]/div[4]/div/div[2]/div[2]/div[2]/span[2]/div/div[2]";
let chatNames = "/html/body/div[1]/c-wiz/div[1]/div/div[9]/div[3]/div[4]/div/div[2]/div[2]/div[2]/span[1]/div[3]/div[2]/div";

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
        var msgs = getElementByXpath(chatMessages).children;
        let dataset = [].slice.call(msgs).map((e) => {
            return e.lastElementChild.firstElementChild.textContent;
        });
        let nameSet = [].slice.call(msgs).map((e) => {
            return e.firstElementChild.firstElementChild.textContent;
        });
        dataset.forEach((e, i) => {
            let rest = e.substr(0, format).toLowerCase();
            let number = e.substr(format);
            if (!isNaN(number) && request.format.substr(0, format).toLowerCase() === rest) {
                roll_numbers.push(number);
                names.push({rn: number, name: nameSet[i]});
            }
        });
    }
};
const saveAsCsv = (data, request) => {
    let time = new Date().toLocaleString();
    let present_no = 0;
    let absent_no = 0;
    let csvContent = "data:text/csv;charset=utf-8,Attendance\n" + request.details + "\nDate,Time\n" + time + "\n";
    if (request.mode == 1) {
        if (request.absent) {
            csvContent += "Absent Students\n";
            for (let i = parseInt(request.start); i <= parseInt(request.end); i++) {
                if (!data.includes(i.toString())) {
                    absent_no++;
                    csvContent += i.toString() + "\r\n";
                }
            }
            csvContent += "Absentees," + absent_no + "\n";
        }
        if (request.present) {
            csvContent += "Present Students\n";
            data.forEach(function (e) {
                present_no++;
                let name;
                names.forEach((nam) => {
                    if (nam.rn == e) 
                        name = nam.name;
                });
                csvContent += e + "," + name + "\r\n";
            });
            csvContent += "Present," + present_no;
        }
    } else {
        let count = 0;
        csvContent += "Present Students\n";
        data.forEach((e, i) => {
            i != 0 && e != data[0] ? (csvContent += e + "\r\n") : -- count;
            count++;
        });
        csvContent += "\nPresent," + count;
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", request.save + ".csv");
    document.body.appendChild(link);
    link.click();

};

const findNames = (request) => {
    var msgs = getElementByXpath(chatNames).children;
    let dataset = [].slice.call(msgs).map((e) => {
        return e.firstElementChild.lastElementChild.textContent;
    });
    return dataset;
};

chrome.runtime.onMessage.addListener(function (request) {
    dataset = "";
    roll_numbers = [];
    format = "";
    getElementByXpath(openChatBar).click();
    setTimeout(() => {
        if (request.mode == 1) {
            findData(request);
            saveAsCsv(processData(request), request);
        } else {
            saveAsCsv(findNames(request), request);
        }
        getElementByXpath(closeChatBar).click()
    }, 1000);
});

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }



