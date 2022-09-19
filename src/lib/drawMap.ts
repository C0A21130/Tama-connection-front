import * as d3 from "d3";

const geoJson = require("./japan.geo.json");

interface ResponseData {
    file_name: number,
    title: string,
    tag: string,
    x: number,
    y: number,
    r: number,
    image: string
}

const drawMap = ( data: ResponseData[], myx: number, myy: number):void => {
    const MAG_RATE = 2000;
    const CENTER_X = myx - 0.10;
    const CENTER_Y = myy - 0.10;

    let x = 0;
    let y = 0;
    let z = 0;

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

    // スクロールした際に呼び出される関数
    const zoom = d3.zoom()
        .scaleExtent([0.1, 50])
        .on("zoom", (event) => {
            z = event.transform.k;
            x = event.transform.x;
            y = event.transform.y;
            d3.select("#svg").select("svg").selectAll("path")
                .attr("transform", `translate(${x}, ${y}) scale(${z}, ${z})`)
            d3.select("#svg").select("svg").selectAll("circle")
                .attr("transform", `translate(${x}, ${y}) scale(${z}, ${z})`)
        })

    // 前に描画されていたsvgを削除
    d3.select("#svg").select("svg").remove()

    // svgを生成
    const svg = d3.select("#svg")
        .append("svg")
        .attr("width", 350)
        .attr("height", 350)
        .attr("fill", "#dbffb7")
        .call(zoom)

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
        .attr("cx", (d) => (d.x - CENTER_X) * MAG_RATE )
        .attr("cy", (d) => (d.y - CENTER_Y) * MAG_RATE )
        .attr("r", 10)
        .attr("fill", "red")
        .attr("id", (d) => (d.tag))

    // 自身の座標をマッピング
    d3.select("#svg").select("svg")
        .append("circle")
        .attr("cx", (myx - CENTER_X) * MAG_RATE )
        .attr("cy", (myy - CENTER_Y) * MAG_RATE )
        .attr("r", 15)
        .attr("fill", "#7fffff")
    
    d3.select("#svg").select("svg")
        .append("circle")
        .attr("cx", (myx - CENTER_X) * MAG_RATE)
        .attr("cy", (myy - CENTER_Y) * MAG_RATE)
        .attr("r", 8)
        .attr("fill", "white")

    // d3.select("#svg").select("svg")
    //     .append("text")
    //     .attr("x", (myx - CENTER_X) * MAG_RATE)
    //     .attr("y", (myy - CENTER_Y) * MAG_RATE)
    //     .text("my")
    //     .attr("font-size", 20)
    //     .attr("fill", "black")
        

    // svg.selectAll("svg")
    //     .append("path")
    //     .attr("d", (d) => line([[d.x, d.y], [d.x - 0.05, d.y + 0.1], [d.x, d.y + 0.15], [d.x + 0.05, d.y + 0.1], [d.x, d.y]]) )
    //     .attr("stroke", "black")
    //     .attr("stroke-width", 0.25)

}

export default drawMap;