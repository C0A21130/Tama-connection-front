import * as d3 from "d3";

const c1 = [150, 100]
const c2 = [200, 100]
const carray = [c1, c2]

const drawMap = ():void => {
    const svg = d3.select("#svg")
        .append("svg")
        .attr("width", 400)
        .attr("height", 300)
    
    svg.append("circle")
        .attr("cx", 100)
        .attr("cy", 90)
        .attr("r", 20)
        .attr("fill", "#000")

    const line = d3.line()
        .x((d) => d[0])
        .y((d) => d[1])

    svg.append("path")
        .attr("d", line(carray))
        .attr("stroke", "lightgreen")
        .attr("stroke-width", 5)
}

export default drawMap;