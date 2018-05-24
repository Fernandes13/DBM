function generateSchema() {
    $.ajax({
        type:"POST",
        url: "/newSchema",
        data:JSON.stringify(processar()),
        datatype:"json"
    })
}

function generatePublish() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/generate", true);
    xhr.send();
}

