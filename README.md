# Tama-connection-front
![package](https://img.shields.io/github/stars/C0A21130/Tama-connection-front?style=social)  
![package](https://img.shields.io/github/repo-size/C0A21130/Tama-connection-front)
![package](https://img.shields.io/github/languages/top/C0A21130/Tama-connection-front)
![package](https://img.shields.io/github/package-json/dependency-version/C0A21130/Tama-connection-front/react)  
"tama-connection-front"はたまこねくしょんアプリのフロントエンドアプリのリポジトリです。[アプリはこちらのリンク](https://tama-connect.com)からご利用できます。
[バックエンドのレポジトリ](https://github.com/C0A21130/tama-connection)はこちらです。  
![サムネイル](https://user-images.githubusercontent.com/85671824/221559900-26dbf6be-469d-4d31-ac87-fd3ab46e428b.png)

## 概要説明
たまこねくしょんアプリとは多摩地域の魅力を外部に発信するための農観連携アプリです。私たちたまこねくしょんは地域住民が見つけた新たな魅力を写真から共有することで地域活性化を目指します。
### 4つの機能
- ホームタブ：ユーザーが投稿した多摩地域の魅力を4つのタグから確認できます。
- マップタブ：近場で撮影された写真を確認できます。
- カメラタブ：外部のARカメラを起動します。
- 投稿タブ：写真の投稿と写真の確認ができます。投稿数によってメダルが表示されます。
### 4つのタグ
- たまファームタグ：収穫体験や収穫した野菜、農地の美しい自然を投稿
- グルメタグ：多摩地域で食べた料理を投稿
- たまさんぽタグ：お散歩中に見つけた新しい発見を投稿
- お土産タグ：多摩地域で購入したお土産を投稿

## 開発者向け情報
### ブランチ
- main：本番環境用
- Develop：開発環境用、変更を確認後問題がなければmainブランチにマージする
### 利用している言語
- HTML
- SCSS
- TypeScript
### 利用しているライブラリ
- React：アプリViewを担うJavaScriptライブラリ
    - React-router：SPAのルーティングを行う
- Compressor.js：画像の圧縮を行う
- Axios：外部のAPIの送受信を行う
- WebPack：TypeScriptや画像ファイル、SCSSなどをビルドする
    - Sass-loader：SCSSのビルドを行う
    - ts-loader：TypeScriptのビルドを行う
    - react-svg-loader：SVGファイルをコンポーネント化する
### ディレクトリ構成
``` txt
Tama-connection-front
├─.github：githubの設定ファイル
├─dist：ビルド後のファイルが保存される
├─node_modules：npmライブラリの保存先
|─src：コードを保存するフォルダ
|  ├─components：一部のブロックなど
|  ├─lib：Reactを利用しないTSファイルの保存先
|  ├─pages：Routesで表示されたページに追加して表示する
|  | 　├─CheckPage.tsx：自身の投稿とメダルを確認(Post.tsx)
|  | 　├─Gaid.tsx：ホームタブの写真の詳細ページ(Home.tsx)
|  | 　├─Login.tsx：ログインページ(Account.tsx)
|  | 　├─PostPage.tsx：写真投稿ページ(Post.tsx)
|  | 　├─Signup.tsx：サインアップページ(Account.tsx)
|  | 　└─Success.tsx：サインアップ・ログインに成功した際に表示するページ
|  ├─Routes：メインとなる４つの機能の画面の遷移先
|  | 　├─Account.tsx：アカウントのサインアップ・ログイン
|  | 　├─Eroor.tsx：表示エラーが起こったとき
|  | 　├─Home.tsx：ホームタブ
|  | 　├─Map.tsx：マップタブ
|  | 　└─Post.tsx：投稿タブ
|  └─static
|      ├─css：SCSSやCSS
|      └─images：画像(.jpg/.png/.gif/.svg)
├─.gitnore：gitに追跡されたくないものを設定
├─.package-lock.json：インストールされたnpmライブラリのすべてを明記
├─.package.json：npmライブラリなどを管理
├─README.md
├─Staticwebapp.config.json：Azure用の設定ファイル
├─tsconfig.json：TypeScriptのトランスパイル設定を記載
└─webpack.config.js：Webpackの設定を記載
```
### 使い方
#### テスト方法
``` shell
$ git clone https://github.com/C0A21130/Tama-connection-front.git
$ cd Tama-connection-front
$ npm install
$ npm run start
```
#### ビルド方法
``` shell
$ git clone https://github.com/C0A21130/Tama-connection-front.git
$ cd Tama-connection-front
$ npm install
$ npm run build
```