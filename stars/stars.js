
var data;
d3.json('data.json', function(error, data) {
  if (error) return console.warn(error);
  
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
    
    var tickFormat = d3.format("f");
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickSize(6, 0)
        .tickFormat(tickFormat)
        .tickValues([-6,-4,-2,2,4,6,8,10])
        .orient("bottom")
    
    var yAxis = d3.svg.axis()
        .scale(yScale)
        //.ticks(6)
        .tickSize(6, 0)
        .tickFormat(tickFormat)
        .tickValues([-6,-4,-2,2,4,6,8,10])
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
                         .style("left",d3.select(this).attr("cx") + 25 + "px")
                         .style("top", d3.select(this).attr("cy") - 2 + "px"); 
                    })
                    
                .on("mouseout" , mouseout)
    
  });


