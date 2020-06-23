function buildCharts(sample) {
    d3.json("/data/samples.json").then(function(data) {
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
        zippedSample = d3.zip(actualSample.otu_ids, actualSample.otu_labels, actualSample.sample_values);
        // console.log(zippedSample);
        
        // Sort sample values ascending
        sortedSample = zippedSample.sort((a,b) => a[2] - b[2]);
        // console.log(sortedSample);

        // // Slice to get top 10 sample values (last 10 entries)
        topSample = sortedSample.slice(-10);
        console.log(topSample);
        reversedSample = topSample.reverse();
        console.log(reversedSample);
       
    
        // Create bar chart (values = sample_values[2], labels= otu_ids[0], hovertext = otu_labels[1])
        var trace1 = {
            x: reversedSample.map(testSample => testSample[2]),
            y: reversedSample.map(testSample => testSample[0].toString()),
            hovertext: reversedSample.map(testSample => testSample[1]),
            type: "bar",
            orientation: "h"
        };
        console.log(reversedSample.map(testSample => testSample[2]));
        var data = [trace1];

        var layout= {
            title: `Top 10 Bacteria for Sample # ${sample}`,
            
            // margin: {
            //     l: 100,
            //     r: 100,
            //     t: 100,
            //     b: 100
            //   }
        }

        Plotly.newPlot("bar", data, layout);

        // Creat Bubble Chart
        var trace2 = {
            x: actualSample.otu_ids,
            y: actualSample.sample_values,
            mode: "markers",
            marker: {
                size: actualSample.sample_values,
                color: actualSample.otu_ids,
                colorscale: "Viridis"
            },
            hovertext: actualSample.otu_labels
        };

        var data1 = [trace2];

        var layout = {
            title: `All Data for Sample# ${sample}`
        }

        Plotly.newPlot("bubble", data1, layout);

    })
}

function buildGauge(sample){
    d3.json("/data/samples.json").then(function(data) {
        console.log(data);

        // Find data for selected sample
        var sampleData = data.metadata;
        console.log(sampleData);
        console.log(sample);
        var filteredSample = sampleData.filter(function(sampleObj){
            return sampleObj.id == sample;
        })
        actualSample = filteredSample[0];
        console.log(actualSample);

        // Build gauge plot
        var data = [
            {
              type: "indicator",
              value: 200,
              delta: { reference: 160 },
              gauge: { axis: { visible: false, range: [0, 250] } },
              domain: { row: 0, column: 0 }
            }];
        // var trace3 = [
        //     {
        //         domain: { x: [0, 1], y: [0, 1] },
        //         value: actualSample.wfreq,
        //         title: { text: "Belly Button Washing Frequency (Scrubs per Week)" },
        //         type: "indicator",
        //         mode: "gauge+number",
        //         gauge: { 
        //             axis: {
        //                 visible: false,
        //                 range: [0-7]
        //             },
        //         },

        //     }
        // ];
        // var data2 = [trace3];
        var layout = { width: 500, height: 400, margin: { t: 10, b: 10 } };
        Plotly.newPlot("gauge", data, layout);
    })

}



function getMetadata(sample) {
    d3.json("/data/samples.json").then(function(data) {
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
    d3.json("/data/samples.json").then(function(data) {
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
        buildGauge(firstId);
    })
}


function optionChanged(changedSample) {
    console.log(changedSample);
    buildCharts(changedSample);
    getMetadata(changedSample);
    buildGauge(changedSample)
}

init()