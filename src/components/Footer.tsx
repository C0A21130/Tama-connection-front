import * as React from "react";

const Footer: React.FC = () => {
    return (
        <div className="footer">
        <footer>
            <div className="link-block">
                <h3>リンク</h3>
                <a href="https://sites.google.com/d/1FqlL4lFenh7EqO03_cBpDhnI1eUZ_L14/p/1ztR1fQ4chkE8zqWthh7TGH51bjHd2aZV/edit">
                    <p>ホームページ</p>
                </a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSf6GxLNn_mkP2j_jzppZb2K2-9hzKOLrAr1XDS2BkVd3TRCew/viewform">
                    <p>お問い合わせフォーム</p>
                </a>
            </div>
            <div className="tag-block">
                <h3>タグの説明</h3>
                <p>たまファーム：収穫体験や収穫した野菜、農地の美しい自然を投稿</p>
                <p>グルメ：多摩地域で食べた料理を投稿</p>
                <p>たまさんぽ：お散歩中に見つけた新しい発見を投稿</p>
                <p>お土産：多摩地域で購入したお土産を投稿</p>
            </div>
        </footer>
        </div>
    )
}

export default Footer