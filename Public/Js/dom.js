var fieldsNumber = 0;
var fieldsNumberP = 0;

function addReference() {
    var idNameRelation = "relation" + fieldsNumber;
    var idNameModel = "model" + fieldsNumber;

    var selectModel = document.createElement("select");
    var optionModel = document.createElement("option");
    var optionModel1 = document.createElement("option");
    var optionModel2 = document.createElement("option");
    optionModel.textContent = "Select a Model";
    optionModel.selected = true;
    optionModel.disabled = true;
    optionModel1.textContent = "Model1";
    optionModel1.value = "Model1";
    optionModel2.textContent = "Model2";
    optionModel2.value = "Model2";

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

    selectModel.id = idNameModel;
    selectModel.className += "form-group form-control";
    selectRelation.id = idNameRelation;
    selectRelation.className += "form-group form-control";

    selectModel.appendChild(optionModel);
    selectModel.appendChild(optionModel1);
    selectModel.appendChild(optionModel2);
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
    var idNameProperty = "property" + fieldsNumberP;
    var idNamePropertyType = "propertyType" + fieldsNumberP;
    var idNameUnique = "unique" + fieldsNumberP;
    var idNameRequired = "required" + fieldsNumberP;

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter property");
    input.id = idNameProperty;

    var selectProperty = document.createElement("select");
    var optionProperty = document.createElement("option");
    var optionProperty1 = document.createElement("option");
    var optionProperty2 = document.createElement("option");

    optionProperty.textContent = "Select a Property Type";
    optionProperty.disabled = true;
    optionProperty.selected = true;
    optionProperty1.textContent = "Property Type1";
    optionProperty1.value = "Property Type1";
    optionProperty2.textContent = "Property Type2";
    optionProperty2.value = "Property Type2";
    selectProperty.appendChild(optionProperty);
    selectProperty.appendChild(optionProperty1);
    selectProperty.appendChild(optionProperty2);

    selectProperty.id = idNamePropertyType;

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.id = idNameUnique;

    var checkbox2 = document.createElement("input");
    checkbox2.setAttribute("type", "checkbox");
    checkbox2.id = idNameRequired;


    var label = document.createElement("label");
    label.classList += "checkbox-inline";
    label.appendChild(checkbox);
    label.innerHTML += "Unique";

    var label2 = document.createElement("label");
    label2.classList += "checkbox-inline";
    label2.appendChild(checkbox2);
    label2.innerHTML += "Required";

    input.className += "form-control";
    selectProperty.className += "form-control marginInput";

    var element = document.getElementById("propertyDiv");
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
    var propertiesArray = propertyElements();
    object.properties = {};
    object.required = [];
    object.references = [];
    for (i = 0; i < propertiesArray.length; i++) {
        if (propertiesArray[i] !== "") {
            var property = propertiesArray[i].property;
            var propertyType = propertiesArray[i].propertyType;
            var obj = { "description": property, "type": propertyType };
            object.properties[property] = obj;

            if (propertiesArray[i].unique === true) {
                obj["unique"] = propertiesArray[i].unique;
            }
        }
        if (propertiesArray[i].required === true) {
            object.required.push(propertiesArray[i].property);
        }
    }
    var references = referenceElements();
    var i;
    for (i = 0; i < references.length; i++) {
        if (references[i].value !== "") {
            object.references.push({ "model": references[i].value, "relation": references[++i].value });
        }
    }
    return object;
};

function propertyElements() {
    var result = [];
    var obj = {
        "property": document.getElementById("property").value,
        "propertyType": document.getElementById("propertyType").value,
        "unique": document.getElementById("unique").checked,
        "required": document.getElementById("required").checked
    };
    result.push(obj);
    var i;
    for (i = 0; i < fieldsNumberP; i++) {
        var objI = {
            "property": document.getElementById("property" + i).value,
            "propertyType": document.getElementById("propertyType" + i).value,
            "unique": document.getElementById("unique" + i).checked,
            "required": document.getElementById("required" + i).checked
        };
        result.push(objI);
    }
    return result;
};

function referenceElements() {
    var result = [];
    result.push(document.getElementById("model"));
    result.push(document.getElementById("relation"));
    var i;
    for (i = 0; i < fieldsNumber; i++) {
        result.push(document.getElementById("model" + i));
        result.push(document.getElementById("relation" + i));
    }
    return result;
};