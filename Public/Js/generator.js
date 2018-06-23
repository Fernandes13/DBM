
function generatePublish() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/generate", true);
    xhr.send();
}

function generateNewSchema() {
    $.ajax({
        type: "POST",
        url:"/saveModule",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(processar())
    })
}
/*
function deleteSchema() {
    $.ajax({
        type: "POST",
        url:"/deleteModule",
        contentType: "application/json; charset=utf-8",
        data: deleteRow()
    })
}*/