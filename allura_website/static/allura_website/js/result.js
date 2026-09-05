const title = document.getElementById("title");

const desc = document.getElementById("desc");

const mostRecentScore = localStorage.getItem('mostRecentScore');








showText = num => {
    if(num >=1 && num <=16){
        return "Recommended level of care: Low";
    } else if (num >=17 && num <=32){
        return "Recommended level of care: Medium";
    } else if (num >=33  && num <=48){
        return "Recommended level of care: High";
    }
};

showDesc = score => {
    if(score >=1 && score <=16){
        return "This level of care would benefit individuals who have the capacity to make best interest decisions and require support from 1 care worker for a short period of time during the day. This can mean you are mostly independent but may need reminders or a low level of supervision/assistance to ensure that daily living activities are performed correctly and safely.";
    } else if (score >=17 && score <=32){
        return "This level of care would be best for individuals who are not as active as they used to be due to one or two health conditions which affect their safety and independence. It may also mean you’re independent with some activities of daily living but require frequent support with other activities from one or two care workers.";
    } else if (score >=33  && score <=48){
        return "This level of care would benefit individuals who have impairments which affect daily living activities such as lacking the capacity to make best interest decisions, being bed-bound and/or requiring specialised equipment to support with mobility and transfers. You may require a comprehensive level of assistance from multiple caregivers to manage and maintain your nutrition, personal hygiene, toileting, dressing, or medication.";
    }
};



// var config = {
//     data: {
//         labels: ['Success', 'Warning', 'Warning', 'Fail'],
//         datasets: [{
//             data: data,
//             value: value,
//             backgroundColor: ['green', 'yellow', 'orange', 'red'],
//             borderWidth: 2
//         }]
//     },
// }


// var opts = {
//     angle: 0, // The span of the gauge arc
//     lineWidth: 0.5, // The line thickness
//     radiusScale: 1, // Relative radius
//     pointer: {
//         length: 0.3, // // Relative to gauge radius
//         strokeWidth: 0.035, // The thickness
//         color: '#000000' // Fill color
//     },
//     limitMax: false,     // If false, max value increases automatically if value > maxValue
//     limitMin: false,     // If true, the min value of the gauge will be fixed
//     colorStart: '#6FADCF',   // Colors
//     colorStop: '#8FC0DA',    // just experiment with them
//     strokeColor: '#E0E0E0',  // to see which ones work best for you
//     generateGradient: true,
//     highDpiSupport: true,     // High resolution support
//     staticLabels: {
//         font: "10px sans-serif",  // Specifies font
//         labels: [300, 900, 1750, 1500],  // Print labels at these values
//         // color: "#000000",  // Optional: Label text color
//         // fractionDigits: 0,  // Optional: Numerical precision. 0=round off.

//     },
    // staticLabelsWithText: {
    //     font: "13px arial", // Specifies font
    //     labels: [
    //         { label: "Jan", value: 0 },
    //         { label: "Feb", value: 750 },
    //         { label: "Mar", value: 1500 },
    //         { label: "Apr", value: 2250 },
    //         { label: "May", value: 3000 }
    //     ],
    //     color: "#000000", // Optional: Label text color
    //     fractionDigits: 0 // Optional: Numerical precision. 0=round off.
    // },
    // staticZones: [
    //     { strokeStyle: "#F03E3E", min: 0, max: 750 }, // Red from 100 to 130
    //     { strokeStyle: "#FFDD00", min: 750, max: 1500 }, // Yellow
    //     { strokeStyle: "#30B32D", min: 1500, max: 2250 }, // Green
    //     { strokeStyle: "#FFDD00", min: 2250, max: 3000 } // Yellow
    //     // { strokeStyle: "#F03E3E", min: 260, max: 300 }  // Red
    // ],
    // plugins: {
    //     datalabels: {
    //         display: true,
    //         formatter: function (value, context) {
    //             return context.chart.data.labels[context.dataIndex];
    //         },
    //         //color: function (context) {
    //         //  return context.dataset.backgroundColor;
    //         //},
    //         color: 'rgba(0, 0, 0, 1.0)',
    //         //color: 'rgba(255, 255, 255, 1.0)',
    //         backgroundColor: null,
    //         font: {
    //             size: 20,
    //             weight: 'bold'
    //         }
    //     }
    // },


// };


// var target = document.getElementById('foo'); // your canvas element
// var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
// gauge.maxValue = 3000; // set max gauge value
// gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
// gauge.animationSpeed = 32; // set animation speed (32 is default value)
// gauge.set(1250); // set actual value

// percentColors = [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]];






// var config = {
//     type: 'gauge',
//     data: {
//         labels: ['Success', 'Warning', 'Warning', 'Fail'],
//         datasets: [{
//             data: data,
//             value: value,
//             backgroundColor: ['green', 'yellow', 'orange', 'red'],
//             borderWidth: 2
//         }]
//     },
//     options: {
//         responsive: true,
//         title: {
//             display: true,
//             text: 'Gauge chart with datalabels plugin displaying labels'
//         },
//         layout: {
//             padding: {
//                 bottom: 30
//             }
//         },
//         needle: {
//             // Needle circle radius as the percentage of the chart area width
//             radiusPercentage: 2,
//             // Needle width as the percentage of the chart area width
//             widthPercentage: 3.2,
//             // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
//             lengthPercentage: 80,
//             // The color of the needle
//             color: 'rgba(0, 0, 0, 1)'
//         },
//         valueLabel: {
//             display: false
//         },
//         plugins: {
//             datalabels: {
//                 display: true,
//                 formatter: function (value, context) {
//                     return context.chart.data.labels[context.dataIndex];
//                 },
//                 //color: function (context) {
//                 //  return context.dataset.backgroundColor;
//                 //},
//                 color: 'rgba(0, 0, 0, 1.0)',
//                 //color: 'rgba(255, 255, 255, 1.0)',
//                 backgroundColor: null,
//                 font: {
//                     size: 20,
//                     weight: 'bold'
//                 }
//             }
//         }
//     }
// };

// window.onload = function () {
//     var ctx = document.getElementById('chart').getContext('2d');
//     window.myGauge = new Chart(ctx, config);
// };

// document.getElementById('randomizeData').addEventListener('click', function () {
//     config.data.datasets.forEach(function (dataset) {
//         dataset.data = randomData();
//         dataset.value = randomValue(dataset.data);
//     });

//     window.myGauge.update();
// });

var randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
};

var randomData = function () {
    return [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
    ];
};

var randomValue = function (data) {
    return Math.max.apply(null, data) * Math.random();
};

var data = [33.33, 66.67, 100];

showAnswer = num => {
    if (num >= 1 && num <= 16) {
        return 16.67;
    } else if (num >= 17 && num <= 32) {
        return 50;
    } else if (num >= 33 && num <= 48) {
        return 83.34;
    }
};



var value = showAnswer(mostRecentScore);

var config = {
    type: 'gauge',
    data: {
        labels: [["LOW"], ["MEDIUM"], ["HIGH"]],
        datasets: [{
            data: data,
            value: value,
            backgroundColor: ['#009e73', '#56b4e9', '#cc79a7'],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        title: {
            display: false,
            text: 'Recommended level of care:'
        },
        layout: {
            padding: {
                bottom: 30
            }
        },
        needle: {
            // Needle circle radius as the percentage of the chart area width
            radiusPercentage: 3,
            // Needle width as the percentage of the chart area width
            widthPercentage: 5.2,
            // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
            lengthPercentage: 10,
            // The color of the needle
            color: 'rgba(0, 0, 0, 1)'
        },
        valueLabel: {
            display: false
        },
        plugins: {
            datalabels: {
                display: true,
                formatter: function (value, context) {
                    return context.chart.data.labels[context.dataIndex];
                },
                //color: function (context) {
                //  return context.dataset.backgroundColor;
                //},
                color: '#fff',
                //color: 'rgba(255, 255, 255, 1.0)',
                backgroundColor: null,
                font: function (context) {
                    var width = context.chart.width;
                    var size = Math.round(width / 28);
                    return {
                        size: size,
                        weight: 'bold'
                    };
                }
            }
        }
    }
};

window.onload = function () {
    var ctx = document.getElementById('chart').getContext('2d');
    window.myGauge = new Chart(ctx, config);
};

// document.getElementById('randomizeData').addEventListener('click', function () {
//     config.data.datasets.forEach(function (dataset) {
//         dataset.data = randomData();
//         dataset.value = randomValue(dataset.data);
//     });

//     window.myGauge.update();
// });


title.innerText = showText(mostRecentScore);

desc.textContent = showDesc(mostRecentScore);
