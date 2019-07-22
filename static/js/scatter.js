'use strict';

// IIFE
(function () {

    // Init data
    let data = [];

    // Fetch json data
    d3.json('/load_data', (d) => {

        return d;
    }).then((d) => {

        // Redefine data
        data = d['users'];

        createVis();
    }).catch((err) => {

        console.error(err);
    });

    /*
     Function :: createVis()
     */
     function createVis() {

        // Get svg
        const svg = d3.select('#scatter');


        const margin = {top: 20, right: 20, bottom: 50, left: 70};
        const width = +svg.attr('width') - (margin.left + margin.right);
        const height = +svg.attr('height') - (margin.top + margin.bottom);


     // Create and position container
        const container = svg.append('g')
            .attr('class', 'container')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style('transform', `translate(${margin.left}px, ${margin.top}px)`);



        //x previous experience
        const expMap = data.map(function (d) { return d.experience_yr; });
        const scX = d3.scaleLinear()
            .domain(d3.extent(expMap, (d) => {
                return d;
            }))
            .range([0, width]);



        //y time spent on HW1
        const hwHrsMap = data.map(function (d) { return d.hw1_hrs; }); 
        const scY = d3.scaleLinear()
            .domain(d3.extent(hwHrsMap, function (d) {
                return d;
            }))
            .range([ height, 0]);


        //tooltip age
        const age = data.map(function (d) { return d.age; }); 
     //   const color = d3.scale.category10();



         // x-axis
        const xAxis = container.append('g')
            .attr('transform', `translate(0, ${height + 10})`)
            .call(d3.axisBottom(scX).ticks(5));

        //y-axis
        const yAxis = container.append('g')
            .call(d3.axisLeft(scY));

        //x label
        container.append("text")             
            .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 25) + ")")
            .style("text-anchor", "middle")
            .text("Programming Experience(yrs)");
        
        //y label
        container.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 10 - margin.left)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Hours Spent on Homework 1");  


        // Define the div for the tooltip
        const div = d3.select("body").append("div")   
            .attr("class", "tooltip")               
            .style("opacity", 0);


        container.append("g")
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", function(d) {return scX(d.experience_yr)})
                .attr("cy", function(d) {return scY(d.hw1_hrs)})
                .attr("r", 5)
                .style("fill", "#1b7688")
                .on("mouseover", function(d){
                    d3.select(this)
                       .attr("class", "yellow")
                       .style("fill", "#f9d057")
                    div.transition()        
                        .duration(200)      
                        .style("opacity", .9);      
                    div .html("Age: " + d.age)
                        .style("left", (d3.event.pageX) + "px")     
                        .style("top", (d3.event.pageY - 28) + "px");

                })
                .on('mouseout', function(d) {
                    div.transition()        
                        .duration(500)      
                        .style("opacity", 0);   
                    d3.select(this)
                        .style("fill", "#1b7688" )
                    
            })
              
               




     }
})();
