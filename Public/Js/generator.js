function generateSchema() {
    $.ajax({
        type:"POST",
        url: "/newSchema",
        data:JSON.stringify(processar()),
        datatype:"json"
    })
}

