var fieldsNumber = 0;
var fieldsNumberP = 0;

function addReference() {
    var className = "reference" + fieldsNumber;

    var selectModel = document.createElement("select");
    var optionModel = document.createElement("option");
    var optionModel2 = document.createElement("option");
    var optionModel3 = document.createElement("option");
    optionModel.textContent = "Select a Model";
    optionModel.selected = true;
    optionModel.disabled = true;
    optionModel2.textContent = "Model";
    optionModel3.textContent = "Model2";

    var selectRelation = document.createElement("select");
    var optionRelation = document.createElement("option");
    var optionRelation1 = document.createElement("option");
    var optionRelation2 = document.createElement("option");
    var optionRelation3 = document.createElement("option");
    var optionRelation4 = document.createElement("option");
    optionRelation.textContent = "Select a Relation Type";
    optionRelation.disabled = true;
    optionRelation.selected = true;
    optionRelation1.textContent = "Relation 1-1";
    optionRelation1.value = "1-1";
    optionRelation2.textContent = "Relation 1-M";
    optionRelation2.value = "1-M";
    optionRelation3.textContent = "Relation M-M";
    optionRelation3.value = "M-M";
    optionRelation4.textContent = "None";
    optionRelation4.value = "";

    selectModel.className += "form-control marginInput " + className;
    selectRelation.className += "form-control marginInput " + className;

    selectModel.appendChild(optionModel);
    selectRelation.appendChild(optionRelation);
    selectRelation.appendChild(optionRelation1);
    selectRelation.appendChild(optionRelation2);
    selectRelation.appendChild(optionRelation3);

    var element = document.getElementById("reference");
    element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("br"));
    element.appendChild(selectModel);
    element.appendChild(selectRelation);
    fieldsNumber++;
}

function addProperty() {
    var className = "property" + fieldsNumberP;
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter property");

    var selectProperty = document.createElement("select");
    var optionProperty = document.createElement("option");
    var optionProperty2 = document.createElement("option");

    optionProperty.textContent = "Select a Property Type";
    optionProperty.disabled = true;
    optionProperty.selected = true;
    optionProperty2.textContent = "Property Type";
    selectProperty.appendChild(optionProperty);
    selectProperty.appendChild(optionProperty2);

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    var checkbox2 = document.createElement("input");
    checkbox2.setAttribute("type", "checkbox");

    var label = document.createElement("label");
    label.classList += "checkbox-inline " + className;
    label.appendChild(checkbox);
    label.innerHTML += "Unique";

    var label2 = document.createElement("label");
    label2.classList += "checkbox-inline " + className;
    label2.appendChild(checkbox2);
    label2.innerHTML += "Required";

    input.className += "form-control " + className;
    selectProperty.className += "form-control marginInput " + className;

    var element = document.getElementById("property");
    element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("br"));
    element.appendChild(input);
    element.appendChild(selectProperty)
    element.appendChild(label);
    element.appendChild(label2);
    fieldsNumberP++;
}

function switchToSchemas() {
    document.getElementById("generate").style.display = "none";
    document.getElementById("schemas").style.display = "block";
}

function switchToGenerate() {
    document.getElementById("schemas").style.display = "none";
    document.getElementById("generate").style.display = "block";
}

function processar() {
    var object = {};
    object.title = document.getElementById("title").value;
    object.description = document.getElementById("description").value;
    var properties = propertyElements();
    object.properties = {};
    object.required = [];
    object.references = [];
    for (i = 0; i < properties; i++) {
        var propertiesRow = properties[i];
        object.properties[propertiesRow[0].textContent]["type"] = propertiesRow[1].value;
        object.properties[propertiesRow[0].textContent]["unique"] = propertiesRow[2].checked;
        if (propertiesRow[3].checked) {
            object.required.push(propertiesRow[3]);
        }
    }
    var references = referenceElements();
    for (i = 0; i < references; i++) {
        var referencesRow = references[i];
        if (referencesRow[0].value !== "" && referencesRow[1].value !== "") {
            object.references.push({ "model": referencesRow[0].value, "relation": referencesRow[1].value });
        }
    }
    return object;
};

function propertyElements() {
    var result = [];
    for (i = 1; i < fieldsNumberP; i++) {
        result.push(document.getElementsByClassName("property" + i));
    }
    return result;
};

function referenceElements() {
    var result = [];
    for (i = 1; i < fieldsNumber; i++) {
        result.push(document.getElementsByClassName("reference" + i));
    }
    return result;
};