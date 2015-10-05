var data = [{"name": "Proxima Centauri", "x": 2.94, "y": -3.25, "z": -0.14, "spec": "M5 Ve", "planets": false, "mag": {"double": 11.05}},
{"name": "Alpha Centauri A", "x": 3.13, "y": -3.05, "z": -0.05, "spec": "G2 V", "planets": false, "mag": {"double": 0.01}},
{"name": "Alpha Centauri B", "x": 3.53, "y": -3.15, "z": -0.05, "spec": "K0 V", "planets": true, "mag": {"double": 1.34}},
{"name": "Barnard's Star", "x": 4.97, "y": 2.99, "z": 1.45, "spec": "M3.5 V", "planets": false, "mag":  {"double": 9.57}},
{"name": "Wolf 359", "x": -1.90, "y": -3.90, "z": 6.46, "spec": "M5.5 V", "planets": false, "mag": {"double": 13.53}},
{"name": "Lalande 21185", "x": -3.44, "y": -0.31, "z": 7.54, "spec": "M2 V", "planets": false, "mag": {"double": 7.47}},
{"name": "Sirius A", "x": -5.76, "y": -6.22, "z": -1.33, "spec": "A1 V", "planets": true, "mag": {"double": -1.43}},
{"name": "Sirius B", "x": -3.76, "y": -4.22, "z": -1.33, "spec": "DA2", "planets": false, "mag": {"double": 8.44}},
{"name": "Luyten 726-8 A", "x": -2.15, "y": 0.17, "z": -8.46, "spec": "M5.5 V", "planets": true, "mag": {"double": 12.61}},
{"name": "Luyten 726-8 B", "x": -2.55, "y": 1.17, "z": -8.46, "spec": "M6 V", "planets": false, "mag": {"double": 13.06}},
{"name": "Ross 154", "x": 9.33, "y": 1.87, "z": -1.73, "spec": "M3.5 Ve", "planets": true, "mag": {"double": 10.44}},
{"name": "Ross 248", "x": -3.37, "y": 9.27, "z": -3.00, "spec": "M5.5 V", "planets": false, "mag": {"double": 12.29}},
{"name": "Epsilon Eridani", "x": -6.74, "y": -1.91, "z": -7.79, "spec": "K2 V", "planets": true, "mag": {"double": 3.73}}];

var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//Create scale functions
var xScale = d3.scale.linear()
                     .domain([d3.min(data, function(d) {return d.x}) - 1, d3.max(data, function(d) { return d.x; }) + 1])
                     .range([margin.right, width - margin.left]);
var yScale = d3.scale.linear()
                     .domain([d3.min(data, function(d) {return d.y}) - 1, d3.max(data, function(d) { return d.y; }) + 1])
                     .range([height - margin.bottom, margin.top]);


//Create SVG element
var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var labelOffset = 15
    svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "middle")
            .attr("x", width/2)
            .attr("y", height + labelOffset)
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .text("X Distance Away (Ly)");
    svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("x", -1*(height/2))
            .attr("y", -labelOffset)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .text("Y Distance Away (Ly)");
    svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 30 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "14px") 
            .style("text-decoration", "bold") 
            .text("Nearest Stars");

var tickFormat = d3.format("f");
var xAxis = d3.svg.axis()
    .scale(xScale)
   // .ticks(6)
    .tickSize(6, 0)
    .tickFormat(tickFormat)
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(yScale)
    //.ticks(6)
    .tickSize(6, 0)
    .tickFormat(tickFormat)
    //.tickValues(yScale.domain())
    .orient("left");
//Create X axis
var gx = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + yScale(0.0) + ")")
    .call(xAxis);
// gx.selectAll("g").filter(function(d) { return d; })
//     .classed("minor", true);

//Create Y axis
var gy = svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + xScale(0.0) + ", 0)")
    .call(yAxis);
// gy.selectAll("g").filter(function(d) { return d; })
//     .classed("minor", true);

var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

function mouseover() {
    div.transition()
       .duration(400)
       .style("opacity",.7);
}
function mouseout() {
    div.transition()
       .duration(700)
       .style("opacity",1e-6);
}



//make plot points
svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                 return xScale(d.x);
            })
            .attr("cy", function(d) {
                 return yScale(d.y);
            })
            .attr("r", function(d) {
                 return 2.5*Math.sqrt(Math.abs(d.mag.double));
            })
            .style("fill", function(d) {
                 if (d.planets == true) {
                    return "rgba(165,81,220, .9)"
                 } else {
                    return "rgba(226,40,40, .7)"
                 }
            })
            .on("mouseover", mouseover)
            .on("mousemove", function(d) {
                div.html("<b>Star Name:</b>  " + d.name + "<br\>" +
                         "<b>Spectral Class:</b>  " + d.spec + "<br\>" +
                         "<b>Planet Found:</b>  " + d.planets)
                     .style("left",d3.select(this).attr("cx") + 55 + "px")
                     .style("top", d3.select(this).attr("cy") - 29 + "px"); 
                })
                
            .on("mouseout" , mouseout)


























