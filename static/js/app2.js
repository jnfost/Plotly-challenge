

function getMetadata(sample) {
    d3.json("/samples.json").then(function(data) {
        // console.log(data);
        var demographics = data.metadata;
        console.log(demographics);
        var demographicInfo = d3.select("#sample-metadata");
        console.log(demographics[12]) 
        Object.entries(demographics).forEach(function(key, value){
            console.log(key);
            demographicInfo.append("p").text(`${key}:${value}`)
        })
      
    })
}



function init() {
    d3.json("/samples.json").then(function(data) {
        console.log(data);
        testId = data.names;
        console.log(testId);
    
        var dropdownMenu = d3.select("#selDataset");
    
        testId.forEach(function(value) {
            var option = dropdownMenu.append("option")
            // console.log(value);
            .text(value)
            .property("value", value);
            console.log(option)
            
        });
    })
    
    firstId = testId[0];
    buildBar(firstId);
    getMetadata(firstId);
}

function optionChanged(changedSample) {
    var selectedSample = changedSample.value;
    console.log(selectedSample)
    buildBar(changedSample);
    getMetadata(changedSample);
}

init()