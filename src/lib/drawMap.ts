import * as d3 from "d3";

const geoJson = require("./japan.geo.json");

const MAG_RATE = 20;

const testData = [
    {name: "tokyokoukadai", x: 139.34212301443, y: 35.626093236309 },
    {name: "hatioujieki", x: 139.33910123176, y: 35.655485591286 }
]

const drawMap = ():void => {
    // console.log(geoJson)

    // svgを生成
    const svg = d3.select("#svg")
        .append("svg")
        .attr("width", 370)
        .attr("height", 350)
        .attr("fill", "none")        

    // 座標をsvgのpath形式に変換
    const line = d3.line()
        .x((d) => (d[0] - 128) * MAG_RATE)
        .y((d) => (d[1] - 30) * MAG_RATE)
    
    // 都道府県を表示
    geoJson.features.map((ken, index) => {
        // console.log(ken.properties.name_ja)
        if (ken.geometry.type == "MultiPolygon"){
            ken.geometry.coordinates.map((multiPolygon) => {
                multiPolygon.map((d) => {
                    svg.append("path")
                        .attr("d", line(d))
                        .attr("stroke", "black")
                        .attr("stroke-width", 3)
                })
            })
        } else {
            ken.geometry.coordinates.map((polygon) => {
                svg.append("path")
                    .attr("d", line(polygon))
                    .attr("stroke", "black")
                    .attr("stroke-width", 3)
            })
        }
        
    })

    // 座標データから地図にマッピング
    svg.selectAll("svg")
        .data(testData)
        .enter()
        .append("circle")
        .attr("cx", (d) => (d.x - 128)*MAG_RATE )
        .attr("cy", (d) => (d.y - 30)*MAG_RATE )
        .attr("r", 2)
        .attr("fill", "red")

}

export default drawMap;