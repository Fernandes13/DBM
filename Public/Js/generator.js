/*function generateSchema() {
    $.ajax({
        type:"POST",
        url: "/newSchema",
        data:JSON.stringify(processar()),
        datatype:"json"
    })
}*/

function generatePublish() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/generate", true);
    xhr.send();
}

function generateNewSchema() {
    $.ajax({
        type:"POST",
        url: "./saveModule",
        data:JSON.stringify(processar()),
        datatype:"json"
    })
}
