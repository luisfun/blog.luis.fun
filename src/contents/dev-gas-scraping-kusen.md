---
emoji: twemoji:confounded-face
title: GAS×webスクレイピング - 苦戦した点
description: GASでwebスクレイピングを行ったときに、苦戦したポイント
created: 2021-08-31
---

特定のサイトから，ワンポチで簡単に情報を収集したかったので，GASを使ってWebスクレイピングをするプログラムを書いた．  
その時に書いてて苦戦した部分のメモ．

参考サイト  
[【Parser】GASでHTML解析する方法](https://pankobo.me/blog/post/202104-gas-parser-html)  
[GASでスクレイピングする方法](https://auto-worker.com/blog/?p=2460)

参考サイトの通りにやってて，詰まったのは
- Parserでエラー
- URLが404でエラー
- Parserが機能しない時がある


## Parserでエラー
```
TypeError: Cannot read property 'indexOf' of undefined
Parser_.build	@ Parser.gs:69
```
エラーの中身  
Parserで指定しているfromの中身の，検索用の文字列を見つけられなかった．

### 対策
if文で場合分け


## URLが404でエラー

URLが404で返ってくると，UrlFetchApp.fetchで処理が止まるエラー

### 対策（例）
```js
var name = [];
const options = {
  "muteHttpExceptions": true,　    // 404エラーでも処理を継続する
};
for (let i=0; i<xxx.length; i++) {
  Utilities.sleep(5000);
  const url = "https://xxx/"+ xxx[i][0] +"/";
  const html = UrlFetchApp.fetch(charaUrl,options);
  if (charaHtml.getResponseCode() == 200) {
    name[i] = Parser.data(html.getContentText("UTF-8"))
      .from('<xxx>').to('</xxx>').build();
  }else {
    name[i] = "";
  }
}
```

参考サイト  
[GASでのWebスクレイピングについて雑多に書いてみた](https://webird-programming.tech/archives/262)  
[Handle 404 errors in UrlFetchApp.fetch()（英語）](https://stackoverflow.com/questions/31891694/handle-404-errors-in-urlfetchapp-fetch)


## Parserが機能しない時がある
よく分かってないエラー

Parserで切り取ってるのに，切り取れてないことがある．

エラー？の中身  
Parserでいらない文字列を排除する過程で，HTMLの「”」（ダブルクォーテーション）が無くなることがある．無くならないこともある．

### 対策
1. デバックでParserした文を確認する
1. 意図した場所で切り取りが出来ているか確認する
1. from と to の検索語に「”」を入れたり抜いたりする

もっと効率的な対策があるかもしれない．
