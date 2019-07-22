'use strict';

// IIFE
(function() {
    // Init Data
    let data = [];
 
    // Fetch json data
    let promise = d3.json('/load_data', (d) => {
         
            return d;
    }).then((d) => {
        
        data = d['users'];
        
        // Delegate to createVis
            createVis();
    }).catch((err) => {
             
      console.error(err);
                     
    })
 /*
  Function :: createVis()
  */
 function createVis(){
 
    //Get total number of users
    const total = data.length;
 
    // get total users text and append total
    const textEl = d3.select('#total_users_text')
        .append('text')
        .text(total)
        .style('font-size', '32px')
        .style('font-style', 'italic')
        .style('color', 'rgb(67, 0, 0)');
 
 }

})();
