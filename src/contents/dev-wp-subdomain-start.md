---
emoji: "twemoji:baby"
title: '【WordPress】サブドメインで最初にやったこと'
description: 'サブドメインで新しいサイトを作ったときのメモ'
created: '2021-10-31'
---

サブドメインで新しいサイトを作ったときのメモ。  
環境はXserver。

## SSL化
参考：[無料独自SSL設定](https://www.xserver.ne.jp/manual/man_server_ssl.php)  
- 参考サイトを見ながらやる
- 反映待ち がなくなる
- 【WordPressの設定 > 一般から】アドレス２つにsをつける

間違って、反映前にアドレスにsを付けたとき。（実際にやらかしました）  
参考：[SSL化に失敗、サイトが開けない、ログインもできない状態です。](https://ja.wordpress.org/support/topic/ssl%E5%8C%96%E3%81%AB%E5%A4%B1%E6%95%97%E3%80%81%E3%82%B5%E3%82%A4%E3%83%88%E3%81%8C%E9%96%8B%E3%81%91%E3%81%AA%E3%81%8F%E3%81%AA%E3%81%A3%E3%81%A6%E3%81%97%E3%81%BE%E3%81%84%E3%81%BE%E3%81%97/)

### CDNでCloudflareを利用している場合
- ネームサーバーをXserverのものに変更
- Cloudflareを開発者モードに（関係ないかもしれない）

これである程度時間がたったら、SSLが追加できるようになった。  
追加後のネームサーバーを戻す作業も忘れずにすること。

## Cocoonのインストール
[Cocoon ダウンロード](https://wp-cocoon.com/downloads/)

インストール後の細かい設定は、個々で変わってくると思うので、割愛する。

## 必要なプラグインのインストール
1. UpdraftPlus  
自動バックアップと復元
1. SiteGuard WP Plugin  
セキュリティー  
Cloudflareを使う場合、管理ページアクセス制限は OFF の方が使いやすいかもしれない  
新しいログインページのURLをブックマークするのを忘れずに
1. WP-Optimize  
データベースのお掃除  
`Always keep 2 post revisions ...`みたいなのは  
指定された数の投稿リビジョンを保持し、その他のリビジョンを削除します。というもの  
`Take a backup with UpdraftPlus ...`は  
最適化スケジュールを実行する前にUpdraftPlusでバックアップを取る。というもの
1. EWWW Image Optimizer  
画像の圧縮  
[勝手に画像がJPEGに変換されて困る場合](https://affilife.sainoa.com/archives/4105.html)
1. WP Multibyte Patch  
日本語の文字に関するバグ対策
1. XML Sitemaps  
Google先生がサイト構造を理解する手助け
1. WebSub (FKA. PubSubHubbub)  
Google先生に自動でサイト更新を伝えてくれる

これらのプラグインについては、下記のサイトがよく解説してくれている。  
[WordPressプラグインのおすすめ一覧](https://blog-bootcamp.jp/start/wordpress-plugin/)

これらの設定が終わったら、自動更新が必要なモノだけ、プラグイン管理画面から自動更新を有効化する。

### 自動更新の弊害（体験談）
過去に全てのプラグインを自動更新にしていて、1度だけサイトがクラッシュしたことがあった。  
その時はトップページも管理画面も開けない状態で割と焦ったが、サーバー管理画面の方からゴニョゴニョしたら普通に直った。

そんなこともあるので、人によっては自動更新を無効化していたほうが良いかもしれない。  
でも、無効の方がセキュリティーに問題が出やすいかもしれない。
