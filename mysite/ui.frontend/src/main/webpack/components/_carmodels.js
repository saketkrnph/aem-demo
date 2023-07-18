/* Handle car model dropdown javascript */

/*Disable model until a make is selected*/
document.getElementById("make").addEventListener("change", function(event) {
    if(event.target.value !== "makeaselection") {
        document.getElementById("model").disabled = false;
    } else {
        document.getElementById("model").disabled = true;
    }
})

/*Set the selected data in html paragraph*/
document.getElementById("model").addEventListener("change", function(event) {
    let makeval = document.getElementById("make").value;
    let modelval = document.getElementById("model").value;
    var selectionValue = document.getElementById("selectedDataValue").value;
    if(makeval !== "makeaselection" && modelval !== "makeaselection")  {
        var tempVal = selectionValue + makeval + " make and " + modelval + " model"

        document.getElementById("cardatadisplay").innerHTML = tempVal;
    }
})


//Get the path from hidden field once selected in the carmodel component
var carDataPath = document.getElementById("carDataPath").value;

//Fetch the car data from API and set in the dropdowns
fetch(carDataPath)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
function appendData(data) {
    var makeSelect = document.getElementById("make");

    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.make.length; i++) {
        let opt = data.make[i].makename;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        makeSelect.appendChild(el);
    }
    var modelSelect = document.getElementById("model");
    for (var i = 0; i < data.model.length; i++) {
        let opt = data.model[i].modelname;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        modelSelect.appendChild(el);
    }
}