import * as d3 from "d3";

const geoJson = require("./japan.geo.json");

const MAG_RATE = 20

const drawMap = ():void => {
    // console.log(geoJson)

    const svg = d3.select("#svg")
        .append("svg")
        .attr("width", 370)
        .attr("height", 350)
        .attr("fill", "none")
        .attr("transform", "matrix(1, 0, 0, -1, 0, 0)")

    const line = d3.line()
        .x((d) => (d[0] - 128) * MAG_RATE)
        .y((d) => (d[1] - 30) * MAG_RATE)
    
    geoJson.features.map((ken, index) => {
        // console.log(ken.properties.name_ja)
        if (ken.geometry.type == "MultiPolygon"){
            ken.geometry.coordinates.map((multiPolygon) => {
                multiPolygon.map((d) => {
                    svg.append("path")
                        .attr("d", line(d))
                        .attr("stroke", "black")
                        .attr("stroke-width", 5)
                })
            })
        } else {
            ken.geometry.coordinates.map((polygon) => {
                svg.append("path")
                    .attr("d", line(polygon))
                    .attr("stroke", "black")
                    .attr("stroke-width", 5)
            })
        }
        
    })
}

export default drawMap;