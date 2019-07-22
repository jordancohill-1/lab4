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
        const svg = d3.select('#donutChart');
        
        //color   
        const color = d3.scaleOrdinal()
            .range(['#1b7688','#1b7676','#f9d057','#f29e2e','#9b0a0a', '#d7191c']);

        // margin and radius
        const margin = {'top': 0, 'right': 0, 'bottom': 0, 'left': 0};
        const width = +svg.attr('width') - (margin.right + margin.left);
        const height = +svg.attr('height') - (margin.top + margin.bottom);
        const radius = Math.min(width, height)/2;
            console.log(radius);
        //container
         const container = svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${width/2}px, ${height/2}px)`);


        //arc generator
        const arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(65);



        const pie = d3.pie()
            .sort(null)
            .value(function(d) {
                return d.value;
            });


    
         //map data
        const langMap = d3.nest()
            .key(function(d) { return d.prog_lang; })
            .rollup(function(x){ return x.length; })
            .entries(data);
            console.log(langMap);



        //append g elements (arc)
        const g = container.selectAll(".arc")
            .data(pie(langMap))
            .enter()
            .append("g")
            .attr("class", "arc")
            .on('mouseover', function(d)
            {
                d3.select(this)
                    .append("text")
                    .attr("class", "key")
                    .text(d.data.key)
                    .attr("font-weight", "bold")
                    .style("fill", "gray")
                    .attr("text-anchor", "middle")
                    .attr("dy", "1px");
                d3.select(this)
                    .append("text")
                    .attr("class", "value")
                    .text(d.data.value)
                    .style("font-size", "32px")
                    .style("fill", "gray")
                    .attr("text-anchor", "middle")
                    .attr("dy", "30px");
                d3.select(this).select("path")
                    .style("opacity", .5)

            })
            .on('mouseout', function(d) {
                d3.select(this)
                    .select(".key").remove();

                d3.select(this)
                    .select(".value").remove();

                d3.select(this).select("path")
                    .style("opacity", 1)

            })

        //append path of arc
        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) {return color(d.data.key)});



       



    }



})();
