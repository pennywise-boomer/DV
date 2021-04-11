var iscr_per_year;
var glob_year;
var anagrafica;
var iscrizioni;
var piani;
var area_keys = [4, 1, 2, 9, 10, 7, 8, 27, 6, 28, 5];
var area_values = ["rgb(183,154,129)", "rgb(0,97,160)", "rgb(0, 167, 181)", "rgb(87, 70, 118)",
 "rgb(244, 99, 58)", "rgb(0, 124, 88)", "rgb(224, 164, 161)", "rgb(164, 188, 194)", 
 "rgb(239, 51, 64)", "rgb(241, 196, 0)", "rgb(155, 50, 89)"];

 var area_colors = new Map();
 
for (var i = 0; i<area_keys.length; i++)
  area_colors.set(area_keys[i], area_values[i]);


function clearPage() {
  d3.select('#schools').attr('class', 'deselection');
  d3.select('#students').attr('class', 'deselection');
  d3.select('#global').attr('class', 'deselection');
  d3.select('#careers').attr('class', 'deselection');
  d3.select("#tendina").remove();
  d3.select('#fix').selectAll("svg").remove(); 
}


function generate_pies(glob_year, subgroups){
 
  var width = 400
      height = 400
      margin = 40

  var radius = Math.min(width, height) / 2 - margin

  // var color = d3.scaleOrdinal()
  //     .domain([9, 30])
  //     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

iscr_per_year = iscrizioni.filter(d => d.ANAC_ISCR == glob_year);
// iscr_per_year_per_studies = iscrizioni.filter(d => d.ANAC_ISCR == glob_year);
var counts = d3.rollup(iscr_per_year, v => v.length, d => d.DECO_AREA);


//var counts = d3.groups(iscr_per_year, d => d.DECO_AREA);

counts = Array.from(counts);
console.log(counts);

// for (i = 0; i < counts.length; i++){
// counts[i][1] = Array.from(counts[i][1]);
// }
//console.log(counts);

// var counts_vec = {};
// var i;
//   for (i = 0; i < counts.length; i++){

//  counts_vec[String(counts[i][0])] = [counts[i][1][0][1], counts[i][1][0][0]];
// }

// console.log(counts_vec);


// var pie1 = d => d.entries();

//  var data_ready1 = pie1(counts);

//  console.log(data_ready1);


 var pie = d3.pie()
  .value(d => d);



 var data_ready = pie(counts);

 console.log(data_ready);

var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

var g = d3.select("#fix")
      .append("svg")
      .attr('class', 'plot')
      .attr('id', 'graph')
      .append("g")
      .attr('id', 'torta')
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

g.selectAll('path')
       .data(data_ready)
       .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', d =>  })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

  // g.selectAll('text')
  //     .data(data_ready)
  //     .enter()
  //     .append('text')
  //    // .text(function(d){ return d[0]})
  //     .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  //     .style("text-anchor", "middle")
  //    .style("font-size", 17);


  g.selectAll("circle")
  .data(area_colors)
  .enter()
  .append("circle")
  .attr("cx",200)
  .attr("cy",160)
  .attr("r", 6)
  .style("fill", d => d.value)
  
 // svg.append("text").attr("x", 220).attr("y", 130).text("variable A").style("font-size", "15px").attr("alignment-baseline","middle")
     



}


//*********************************************************************** */



function timeline() {


  var history_years = [[1481, 10], [1569, 25], [1777,40], [1781,55], [1784,70], [1870,85], [2021,100]];

var time_dots = d3.scaleLinear()
     .domain([1481, 2021])
     .range([0,100]);
    
  d3.select("#fix")
    .append("svg")
    .attr("id", "chart")
    .attr("class", "time")
    .attr("viewBox", "0 0 120 80")
   // .attr("zoom", "3000%")
    .append("g")
    .append("polyline")
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("stroke-width", "1")
    .attr("points", "0, 20 110, 20");

  g =  d3.select("#chart")
    .selectAll(".dots")
    .data(history_years)
    .enter()
    .append("g");

  g.attr("id", ".dots")
    .append("circle", "text")
    .attr("cx", d => {return d[1]})
    .attr("cy", "20")
    .attr("r", "1");

  g.append("text")
    .text(d => {return d[0]})
    .attr("x", d => {return d[1] - 2} )
    .attr("y", 25)
    .attr("font-size", "2px");

}


//**************************************************************


function years_option(){

  var select_year = d3.select('#fix')
  .append('div')
  .attr("id", "tendina")
  .attr('margin-left', '0%')
  .append("div")
  .append('p')
  .attr('id','p_years');


  select_year.append('label')
  .attr('for','nValue')
  .attr('text-align', 'right')
  .text('YEAR=')
  .append('span')
  .attr('id', 'nValue-value');

  select_year.append('input')
  .attr("id", "input_year")
  .attr('type', 'number')
  .attr('min', '2010')
  .attr('max', '2020')
  .attr('step', '1')
  .attr("value", "2020")
  .on("click", function() {
    update(+this.value);
  });

update(2020);

function update(glob_year) {

  //glob_year = year
  d3.select("#input_year").attr("value", glob_year );
  generate_pies(glob_year, "1");

}
}

//**************************************************************


function radio_bottom(){

  var bottom = d3.select('#tendina')
  .attr("class", "selector")
  .append('div')
  .attr('id', 'radio_bottom');

  
 var radio1 = bottom.append('input')
  .attr("id", "r1")
  .attr('type', 'radio')
  .attr('name', 'Cycle of study')
  .attr('value', 'Bachelor / Ciclo Unico');


radio1.node().outerHTML = radio1.node().outerHTML + "Bachelor / Ciclo Unico <br>";

d3.select("#r1").property("checked", true);


radio1.append("br");

var radio2 = bottom.append('input')
.attr("id", "r2")
.attr('type', 'radio')
.attr('name', 'Cycle of study')
.attr('value', 'Bachelor / Ciclo Unico');

radio2.node().outerHTML = radio2.node().outerHTML + "Master <br>";

}

//**************************************************************


function homepage() {
  clearPage()
  timeline()
}

//**************************************************************

function schools() {

  clearPage();
  years_option();
  radio_bottom();
  d3.select('#schools').attr('class', 'active');
  glob_year = d3.select("#input_year").property("value");

}

//**************************************************************


function students() {
  clearPage();
  d3.select('#students').attr('class', 'active');
}

//**************************************************************

function global() {
  clearPage();
  d3.select('#global').attr('class', 'active');
}

//**************************************************************

function careers() {
  clearPage()
  d3.select('#careers').attr('class', 'active');
  d3.select('#search').attr('class','search');
}

//**************************************************************
 
Promise.all([
  d3.csv("/data/anagrafica1.csv"),
  d3.csv("/data/anagrafica2.csv"),
]).then(function(allData) {
  anagrafica = d3.merge(allData);
  homepage();
  // console.log(anagrafica);
});
 
Promise.all([
  d3.csv("/data/iscrizioni1.csv"),
  d3.csv("/data/iscrizioni2.csv"),
  d3.csv("/data/iscrizioni3.csv"),
  d3.csv("/data/iscrizioni4.csv"),
  d3.csv("/data/iscrizioni5.csv"),
  d3.csv("/data/iscrizioni6.csv"),
]).then(function(allData) {
  iscrizioni = d3.merge(allData);






// for (i = 0; i < iscrizioni.length; i++){

//   //lettere e filosofia
//   if (iscrizioni[i].COD_AREA == 4) {
//     iscrizioni[i]['COLOR'] = "rgb(183,154,129)"; 
//    }

//    // giurisprudenza
//    if (iscrizioni[i].COD_AREA == 1) {
//     iscrizioni[i]['COLOR'] = "rgb(0,97,160)"; 
//    }

//    // scienze politiche
//    if (iscrizioni[i].COD_AREA == 2) {
//     iscrizioni[i]['COLOR'] = "rgb(0, 167, 181)"; 
//    }  

//    // ingegneria
//    if (iscrizioni[i].COD_AREA == 9) {
//     iscrizioni[i]['COLOR'] = "rgb(87, 70, 118)"; 
//    }

//    // architettura e design
//    if (iscrizioni[i].COD_AREA == 10) {
//     iscrizioni[i]['COLOR'] = "rgb(244, 99, 58)"; 
//    }

//    // scienze MFN
//    if (iscrizioni[i].COD_AREA == 7) {
//     iscrizioni[i]['COLOR'] = "rgb(0, 124, 88)"; 
//    }

//    //farmacia
//    if (iscrizioni[i].COD_AREA == 8) {
//     iscrizioni[i]['COLOR'] = "rgb(224, 164, 161)"; 
//    }

//    //lingue e culture moderne
//    if (iscrizioni[i].COD_AREA == 27) {
//     iscrizioni[i]['COLOR'] = "rgb(164, 188, 194)"; 
//    }

//    // medicina
//    if (iscrizioni[i].COD_AREA == 6) {
//     iscrizioni[i]['COLOR'] = "rgb(239, 51, 64)"; 
//    }

// // economia
//    if (iscrizioni[i].COD_AREA == 28) {
//     iscrizioni[i]['COLOR'] = "rgb(241, 196, 0)"; 
//    }

//    // scienze formazione
//    if (iscrizioni[i].COD_AREA == 5) {
//     iscrizioni[i]['COLOR'] = "rgb(155, 50, 89)"; 
//    }

 //}


  //console.log(iscrizioni);

});
 
Promise.all([
  d3.csv("/data/piani.csv"),
]).then(function(allData) {
  piani = d3.merge(allData);
  // console.log(piani);
});

// var counts = d3.rollup(iscr_per_year, v => v.length, d => d.DECO_AREA);




