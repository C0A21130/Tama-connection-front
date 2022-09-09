import * as d3 from "d3";

const geoJson = require("./japan.geo.json");

const MAG_RATE = 20;
const CENTER_X = 128;
const CENTER_Y = 30;

interface ResponseData {
    file_name: number,
    x: number,
    y: number,
    r: number
}

const drawMap = ( data: ResponseData[], x:number, y:number, z:number):void => {
    // 座標をsvgのpath形式に変換
    const line = d3.line()
        .x((d) => (d[0] - CENTER_X) * MAG_RATE - x)
        .y((d) => (d[1] - CENTER_Y) * MAG_RATE - y)

    // 黒、太さ3の線を描く関数
    const drawPath = (d) => {
        d3.select("#svg").select("svg")
            .append("path")
            .attr("d", line(d))
            .attr("stroke", "black")
            .attr("stroke-width", 3)
    }

    // const zoom = d3.zoom().on("zoom", () => {console.log("aa")})

    // 前に描画されていたsvgを削除
    d3.select("#svg").select("svg").remove()

    // svgを生成
    const svg = d3.select("#svg")
        .append("svg")
        .attr("width", 370)
        .attr("height", 350)
        .attr("fill", "none")
        .attr("transform", `scale(${z}, ${z})`)
        // .call(zoom)

    // 都道府県を表示
    geoJson.features.map((ken, index) => {
        // 離島が存在する場合
        if (ken.geometry.type == "MultiPolygon"){
            ken.geometry.coordinates.map((multiPolygon) => {
                multiPolygon.map((polygon) => {
                    drawPath(polygon);
                })
            })
        // 離島が存在しない場合
        } else {
            ken.geometry.coordinates.map((polygon) => {
                drawPath(polygon);
            })
        }
        
    })

    // 座標データから地図にマッピング
    svg.selectAll("svg")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => (d.x - CENTER_X) * MAG_RATE - x )
        .attr("cy", (d) => (d.y - CENTER_Y) * MAG_RATE - y )
        .attr("r", 2)
        .attr("fill", "red")

}

export default drawMap;