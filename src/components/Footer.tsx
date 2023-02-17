import * as React from "react";
import UniversityLogo from "./../static/images/UniversityLogo.png"

const Footer: React.FC = () => {
    const [count, setCount] = React.useState(0);
    const delAccout = ():void => {
        setCount(count + 1);
        if (count > 5) {
            localStorage.removeItem("token")
        }
    }

    return (
        <div className="footer">
        <footer>
            <div className="link-block">
                <h3>関連サイト</h3>
                <a href="https://www.teu.ac.jp/">
                    <div className="university-logo"><img src={UniversityLogo} alt="東京工科大学のロゴ"></img></div>
                </a>
                <a href="https://sites.google.com/d/1FqlL4lFenh7EqO03_cBpDhnI1eUZ_L14/p/1ztR1fQ4chkE8zqWthh7TGH51bjHd2aZV/edit">
                    <p>公式ホームページ</p>
                </a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeT0MGdGbpRLZp7F63V9n_bZsjm72PS0GcY0cMME92Z1VC9eA/viewform?usp=sf_link">
                    <p>問い合わせフォーム</p>
                </a>
            </div>
            <div className="tag-block">
                <h3>タグの説明</h3>
                <p>たまファーム：収穫体験や収穫した野菜、農地の美しい自然を投稿</p>
                <p>グルメ：多摩地域で食べた料理を投稿</p>
                <p>たまさんぽ：お散歩中に見つけた新しい発見を投稿</p>
                <p onClick={() => delAccout()}>お土産：多摩地域で購入したお土産を投稿</p>
            </div>
        </footer>
        </div>
    )
}

export default Footer