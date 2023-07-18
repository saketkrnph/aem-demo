/* Handle car model dropdown javascript */

/*Populate models based on selection from make dropdown*/
document.getElementById("make").addEventListener("change", function(event) {
    document.getElementById("model").disabled = event.target.value === "makeaselection";

    fetch(carDataPath)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            populateData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
//Check selected car make and populate model
    function populateData(data) {
        for (var i = 0; i < data.length; i++) {
            let makeval = document.getElementById("make").value;
            let tmpMake = data[i].makename;
            if(makeval === tmpMake)    {
                let modelSelectElement = document.getElementById("model");
                modelSelectElement.options.length = 0;
                iterateModels(data,i)

            }
        }
    }
//Iterate over model dropdown and populate that
    function iterateModels(data,i) {
        var modelSelect = document.getElementById("model");
        for (var j = 0; j < data[i].models.length; j++) {
            let opt = data[i].models[j];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            modelSelect.appendChild(el);
        }
    }
})

/*Set the selected data in html paragraph*/
document.getElementById("model").addEventListener("change", function(event) {
    let makeval = document.getElementById("make").value;
    let modelval = document.getElementById("model").value;
    var selectionValue = document.getElementById("selectedDataValue").value;
    if(makeval !== "makeaselection" && modelval !== "makeaselection")  {
        document.getElementById("cardatadisplay").innerHTML = selectionValue + makeval + " make and " + modelval + " model";
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
    document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        let opt = data[i].makename;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        makeSelect.appendChild(el);
    }
}
