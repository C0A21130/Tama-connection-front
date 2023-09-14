import * as React from "react";
import GoldMedal from "./../static/images/library/medal/gold_medal.svg";
import SilverMedal from "./../static/images/library/medal/silver_medal.svg";
import BronzeMedal from "./../static/images/library/medal/bronze_medal.svg";

// 投稿数によって表示される文章とメダルを変更
const selectMedal = (count: number, id: number) => {
    if(count >= 10) { // 投稿数が10個以上のとき
        return { p: "多摩地域マスター記者", medal: <div className="pic"><GoldMedal /></div> };
    } else if(count >= 5) { // 投稿数が5個以上のとき
        return { p: "多摩地域プロ記者", medal: <div className="pic"><SilverMedal /></div> };
    } else if(count >= 1 && id != 0) { // 投稿数が1個以上のとき
        return { p: "多摩地域アマチュア記者", medal: <div className="pic"><BronzeMedal /></div> };
    } else if(!count) { // 投稿数が0個のとき
        return { p: "写真を投稿するとメダルをゲット!!", medal: "" }
    }
}

export default selectMedal;