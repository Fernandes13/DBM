function generatePublish() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/generate", true);
    xhr.send();
}
