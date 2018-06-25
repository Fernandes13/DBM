
function generatePublish() {
    //var xhr = new XMLHttpRequest();
    //xhr.open("POST", "/generate", true);
    //xhr.send();
    $.ajax({
        type: "POST",
        url: "/generate",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(getTheme())
    })
    window.open("localhost:8082");
}

function generateNewSchema() {
    $.ajax({
        type: "POST",
        url: "/saveModule",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(processar())
    })
    window.location.reload();
}

function editSchema() {
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
            var schemaObj = JSON.parse(this.response);
            console.log(schemaObj.title);
            console.log(schemaObj.description);
            console.log(schemaObj.type);

            document.getElementById("title").value = schemaObj.title;
            document.getElementById("description").value = schemaObj.description;
            document.getElementById("type").value = schemaObj.type;

            console.log(schemaObj.properties);
            for (let i = 0; i < schemaObj.properties.length; i++) {
                document.getElementById("property").value = schemaObj.properties[i].description;
                console.log(schemaObj.properties[i].description);
                document.getElementById("propertyType").value = schemaObj.properties[i].type;
                console.log(schemaObj.properties[i].type);
                if (schemaObj.properties[i].unique === 1) {
                    document.getElementById("unique").checked = true;
                }
                document.getElementById("unique").checked = false;
                console.log("Unique: ");
                console.log("Unique: " + document.getElementById("unique").checked);
                if (schemaObj.requires !== void 0) {
                    document.getElementById("required").checked = true;
                }
                document.getElementById("required").checked = false;
            }
        }
    }
    xhr.open("GET", "/get/" + name, true);
    xhr.send();
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
        input.className = "filled-in form-check-input";
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

function showModelsToOptions(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            populateModel(id, this.response);
        }
    }
    xhr.open("GET", "/modelOptions", true);
    xhr.send();
}