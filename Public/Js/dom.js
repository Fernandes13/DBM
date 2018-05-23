function addReference() {
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", "Enter reference");

    var selectModel = document.createElement("select");
    var optionModel = document.createElement("option");
    optionModel.textContent = "Model";

    var selectRelation = document.createElement("select");
    var optionRelation = document.createElement("option");
    var optionRelation1 = document.createElement("option");
    var optionRelation2 = document.createElement("option");
    var optionRelation3 = document.createElement("option");
    optionRelation.textContent = "Relation Type";
    optionRelation1.textContent = "Relation 1-1";
    optionRelation2.textContent = "Relation 1-M";
    optionRelation3.textContent = "Relation M-M";

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    var label = document.createElement("label");
    
    label.classList += "checkbox-inline";
    label.appendChild(checkbox);
    label.innerHTML += "Parent";

    input.className += "form-control";
    selectModel.className += "form-control marginInput";
    selectRelation.className += "form-control marginInput";

    selectModel.appendChild(optionModel);
    selectRelation.appendChild(optionRelation);
    selectRelation.appendChild(optionRelation1);
    selectRelation.appendChild(optionRelation2);
    selectRelation.appendChild(optionRelation3);

    var element = document.getElementById("reference");
    element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("br"));
    element.appendChild(input);
    element.appendChild(selectModel);
    element.appendChild(selectRelation);
    //element.appendChild(checkbox);
    element.appendChild(label);
}

function addPropriety() {
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", "Enter propriety");

    var selectPropriety = document.createElement("select");
    var optionPropriety = document.createElement("option");
    optionPropriety.textContent = "Propriety Type";
    selectPropriety.appendChild(optionPropriety);

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    var checkbox2 = document.createElement("input");
    checkbox2.setAttribute("type", "checkbox");
    
    var label = document.createElement("label");
    label.classList += "checkbox-inline";
    label.appendChild(checkbox);
    label.innerHTML += "Unique";

    var label2 = document.createElement("label");
    label2.classList += "checkbox-inline";
    label2.appendChild(checkbox2);
    label2.innerHTML += "Required";

    input.className += "form-control";
    selectPropriety.className += "form-control";

    var element = document.getElementById("propriety");
    element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("br"));
    element.appendChild(input);
    element.appendChild(selectPropriety)
    //element.appendChild(checkbox);
    element.appendChild(label);
    element.appendChild(label2);
}

function switchToSchemas(){
    document.getElementById("generate").style.display = "none";
    document.getElementById("schemas").style.display = "block";
}

function switchToGenerate(){
    document.getElementById("schemas").style.display = "none";
    document.getElementById("generate").style.display = "block";
}