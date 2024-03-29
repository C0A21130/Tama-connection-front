import * as React from "react";

const Success: React.FC = () => {
    return (
        <div className="success">
            <div>
                <h2>たまこねくしょんとは？</h2>
                <p>東京工科大学コンピュータサイエンス学部が多摩の魅力を沢山の人に拡散するために作成されたチームです。</p>
                <p>ぜひ皆さんの投稿をお待ちしております。</p>
                <p>たまこねくしょんアプリとは東京工科大学コンピュータサイエンス学部が多摩地域の魅力を外部に発信するための農観連携アプリです。たまこねくしょんは発見した新たな地域の魅力を写真で共有することで地域活性化を目指します。</p>
            </div>
            <div>
                <h2>ホーム</h2>
                <p>4つのタグを選択して多摩の魅力を共有</p>
                <div>
                    <p>たまファーム：収穫体験や収穫した野菜、農地の美しい自然を投稿</p>
                    <p>グルメ：多摩地域で食べた料理を投稿</p>
                    <p>たまさんぽ：お散歩中に見つけた新しい発見を投稿</p>
                    <p>お土産：多摩地域で購入したお土産を投稿</p>
                </div>
            </div>
            <div>
                <h2>マップ</h2>
                <p>気になる多摩地域名から写真を検索してみてください</p>
                <p>近場で投稿された写真が確認しよう</p>
            </div>
            <div>
                <h2>ARカメラ</h2>
                <div>
                    <p>稲城なしのすけと記念撮影：タップすると現れるキャラクターと一緒に散歩して写真を撮ろう</p>
                    <p>白狐と記念撮影：東伏見稲荷で白狐と記念撮影を撮ってみよう</p>
                    <p>白狐を探そう：東伏見稲荷に隠れた白狐を探してみましょう</p>
                </div>
            </div>
            <div>
                <h2>投稿</h2>
                <div>
                    <p>写真の投稿：自分で発見した多摩の魅力を写真から投稿しよう</p>
                    <p>写真を確認：自分で投稿した写真を確認しよう</p>
                </div>
            </div>
        </div>
    )
}

export default Success;