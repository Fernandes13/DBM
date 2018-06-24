
function generatePublish() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/generate", true);
    xhr.send();
}

function generateNewSchema() {
    $.ajax({
        type: "POST",
        url: "/saveModule",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(processar())
    })
}

function poupulateTable(schemas) {
    var bodyTable = document.getElementById("tbody");
    let schemasArr = JSON.parse(schemas.toString());
    schemasArr.forEach(schema => {
        var line = document.createElement("tr");
        var lineDataSelect = document.createElement("td");
        var lineData = document.createElement("td");
        var lineDataText = document.createTextNode(schema);
        var input = document.createElement("input");
        input.className = "checkBox";
        input.type = "checkBox";
        lineData.appendChild(lineDataText);
        lineDataSelect.appendChild(input);
        line.appendChild(lineDataSelect);
        line.appendChild(lineData);
        bodyTable.appendChild(line);
    });
};

function showModels() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            poupulateTable(this.response);
        }
    }
    xhr.open("GET", "/models", true);
    xhr.send();
}

function deleteRowTable() {
    var r = document.getElementsByClassName("checkBox");
    var deleteRow;
    for (i = 0; i < r.length; i++) {
        if (r[i].checked) {
            deleteRow = r[i].parentNode.parentNode;
            deleteRow.remove();
        }
    }
};

function deleteModels() {
    var xhr = new XMLHttpRequest();
    var r = document.getElementsByClassName("checkBox");
    var name;
    for (i = 0; i < r.length; i++) {
        if (r[i].checked) {
            var row = r[i].parentNode.parentNode;
            name = row.lastChild.innerHTML;
        }
    }
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            deleteRowTable();
            window.location.reload();
        }
    }
    xhr.open("DELETE", "/delete/" + name, true);
    xhr.send();
}