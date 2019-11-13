//const d3 = require("d3");
const d3 = require("d3"),
    jsdom = require("jsdom");
const document = jsdom.jsdom(),
	svg = d3.select(document.body).append("svg");
	
// //  the data that powers the bar chart, a simple array of numeric values
// var chartdata = [40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];
 
// //  the size of the overall svg element
// var height = 200,
//     width = 720,
 
// //  the width of each bar and the offset between each bar
//     barWidth = 40,
//     barOffset = 20;
 
 
// d3.select('#bar-chart').append('svg')
//   .attr('width', width)
//   .attr('height', height)
//   .style('background', '#dff0d8')
//   .selectAll('rect').data(chartdata)
//   .enter().append('rect')
//     .style({'fill': '#3c763d', 'stroke': '#d6e9c6', 'stroke-width': '5'})
//     .attr('width', barWidth)
//     .attr('height', function (data) {
//         return data;
//     })
//     .attr('x', function (data, i) {
//         return i * (barWidth + barOffset);
//     })
//     .attr('y', function (data) {
//         return height - data;
//     });

