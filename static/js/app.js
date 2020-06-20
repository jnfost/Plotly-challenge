function buildCharts(sample) {
    d3.json("/samples.json").then(function(data) {
        console.log(data);

        // Find data for selected sample
        var sampleData = data.samples;
        console.log(sampleData);
        console.log(sample);
        var filteredSample = sampleData.filter(function(sampleObj){
            return sampleObj.id == sample;
        })
        actualSample = filteredSample[0];
        console.log(actualSample);
        // Zip 3 arrays of actualSample together
        // function zip(arrays) {
        //     return arrays[1].map(function(_,i){
        //         return arrays.map(function(array){return array[i]})
        //     });
        // }
        // zippedSample = zip(actualSample.otu_ids, actualSample.otu_labels, actualSample.sample_values);
        // console.log(zippedSample);

        // zip1 = actualSample.otu_ids.map(function(e, i) {
        //     return [e, actualSample.otu_labels[i]];
        // });
        // console.log(zip1);
        // zip2 = zip1.map(function(e,i) {
        //     return [e, actualSample.sample_values[i]];
        // });
        // // returns 2 zipped into an array and 1 zipped outside
        // console.log(zip2);

        // Sort sample values
        // sortedSample = actualSample.sort((a,b) => b - a);
        // console.log(sortedSample);

        // // Slice to get top 10 sample values
        // topSample = sortedSample.slice(0,10);
        // console.log(topSample);
        // reversedSample = topSample.reverse();
        // console.log(reversedSample);

    
        // Create bar chart
        // var trace1 = {
        //     x: reversedSample,
        //     // y: reversedSample.otu_ids,
        //     text: reversedSample.otu_labels,
        //     y: actualSample.map(object => object.otu_ids),
        //     // text: actualSample.map(object => object.otu_labels),
        //     type: "bar",
        //     orientation: "h"
        // };

        // var data = [trace1];

        // var layout= {
        //     title: `Top 10 Bacteria for Sample # ${sample}`
        // }

        // Plotly.newPlot("bar", data, layout);

        // Creat Bubble Chart
        var trace2 = {
            x: actualSample.otu_ids,
            y: actualSample.sample_values,
            mode: "markers",
            marker: {
                size: actualSample.sample_values,
                color: actualSample.otu_ids,
                showscale: true
            },
            text: actualSample.otu_labels
        };

        var data1 = [trace2];

        var layout = {
            title: `All Data for Sample# ${sample}`
        }

        Plotly.newPlot("bubble", data1, layout);

    })
}



function getMetadata(sample) {
    d3.json("/samples.json").then(function(data) {
        // console.log(data);
        var sampleData = data.metadata;
        console.log(sampleData);
        console.log(sample);
        var filteredSample = sampleData.filter(function(sampleObj){
            return sampleObj.id == sample;
        })
        actualSample = filteredSample[0];
        console.log(actualSample);
        
        // Identify where to place demographic info
        var demographicInfo = d3.select("#sample-metadata");

        // Clear old data from location before inserting data for new sample
        demographicInfo.html("");

        // Append new data
        Object.entries(actualSample).forEach(function(key, value){
            // console.log(key);
            
            demographicInfo.append("p").text(`${key}`)
        })
      
    })
}


// Initialize page with data from first sample
function init() {
    d3.json("/samples.json").then(function(data) {
        // console.log(data);
        var testId = data.names;
        // console.log(testId);

        var dropdownMenu = d3.select("#selDataset");
    
        testId.forEach(function(value) {
            var option = dropdownMenu.append("option")
            // console.log(value);
            .text(value)
            .property("value", value);
            // console.log(option)
            
        });
      
        firstId = testId[0];
        buildCharts(firstId);
        getMetadata(firstId);
    })
}


function optionChanged(changedSample) {
    console.log(changedSample);
    buildCharts(changedSample);
    getMetadata(changedSample);
}

init()