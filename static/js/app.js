function buildBar(sample) {
    d3.json("/samples.json").then(function(data) {
        console.log(data);
        var id = d3.selectAll("option").property("value");
        console.log(id)
    })
}

buildBar()

function init() {
    d3.json("/samples.json").then(function(data) {
        console.log(data);
        var testId = data.names;
        console.log(testId);

        var dropdownMenu = d3.select("#selDataset");
    
        testId.forEach(function(value) {
            var option = dropdownMenu.append("option")
            // console.log(value);
            .text(value)
            .property("value", value);
            
        });
        // var id = data.samples[0].id;
        // console.log(id);
        // var sampleValues = data.samples[0].sample_values;
        // console.log(sampleValues);
        // var otuIds = data.samples[0].otu_ids;
        // console.log(otuIds);
        // var otuLabels = data.samples[0].otu_labels;
        // console.log(otuLabels);  
        // console.log(data.samples[0].sample_values);
        // var sampleSort = data.sammples[0].sample_values.sort((a,b) => b - a);
        // var topSample = sampleSort.slice(0,10);
        // console.log(topSample);

        firstId = testId[0];
        buildBar(firstId);
        getMetadata(firstID);
    })
}


function optionChanged(sample) {
    buildBar(sample);
    getMetadata(sample);
}

init()

// function setOptions() {
//     // Add each test subject id to dropdown menu
//     d3.json("/samples.json").then(function(data) {
//         // console.log(data);
//         var testId = data.names;
//         console.log(testId);
//         // var demographics = data.metadata;
//         // console.log(demographics);
//         // var id = data.metadata[0].id;
//         // var ethnicity = data.metadata[0].ethnicity;
//         // var gender = data.metadata[0].gender;
//         // var age = data.metadata[0].age;
//         // var location = data.metadata[0].location;
//         // var bbtype = data.metadata[0].bbtype;
//         // var wfreq = data.metadata[0].wfreq;
//         // console.log(id, ethnicity, gender, age, location, bbtype, wfreq);
        
//         // Add each test subject id to dropdown menu

//         var dropdownMenu = d3.select("#selDataset");
    
//         testId.forEach(function(value) {
//             var option = dropdownMenu.append("option")
//             // console.log(value);
//             .text(value)
//             .property("value", value);
            
//         });
       
//     })
    

// }

// setOptions()

d3.selectAll("#selDataset").on("change", getData)
function getData() {

}

// function getMetadata() {
//     d3.json("/samples.json").then(function(data) {
//         // console.log(data);
//         var testId = data.names;
//         var demographics = data.metadata;
//         console.log(demographics);
//         var demographicInfo = d3.select("#sample-metadata");
//         console.log(demographics[12])  
//         // for (var i= 0; i < demographics.length; i++) {
//             demographics.forEach(function(key, value) {
//                 var infoLine = demographicInfo.append("p");
//                 console.log(infoLine[i]);
//                 infoLine.text(value[i]);
//             })
//         // }
      
//     })
// }

// getMetadata()
    //


// Load json data and identify variables

// function init() {
//     d3.json("/samples.json").then(function(data) {
//         console.log(data);
//         var id = data.samples[0].id;
//         console.log(id);
//         var sampleValues = data.samples[0].sample_values;
//         console.log(sampleValues);
//         var otuIds = data.samples[0].otu_ids;
//         console.log(otuIds);
//         var otuLabels = data.samples[0].otu_labels;
//         console.log(otuLabels);  

//         // var CHART = d3.selectAll("#bar").node();

//         // Plotyly.newPlot(CHART, data);
//     })
// }
// init()


// Set variables for each data value needed





// Get data for each new test subject selected

