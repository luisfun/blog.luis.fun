---
emoji: twemoji:bread
title: 【WordPress】初回訪問のみ広告表示する方法
description: リピーターへの広告表示を少なめにする方法
created: 2021-09-18
---

やりたいこと
- ブログの目次上に広告を表示したけど，やや邪魔に感じる
- リピーターやサイト回遊者向けに，2回目以降は広告を非表示にしたい

## 追加したプログラム
AICP込のコード

functions.php
```php
function ad01Func() {
  if( 'visited' !== $_COOKIE['first_visit_site'] ) {
    if( aicp_can_see_ads() ) {
      $adCode = '
      <div class="aicp">
//**** ここにAdSenseの広告コード ****
      </div>
    '; return $adCode; } else { return '
      <div class="error">広告の表示がブロックされています。</div>
'; } } } add_shortcode('ad01', 'ad01Func');
```

javascript.js
```js
if(navigator.cookieEnabled){
  //サイトへの訪問記録を7日保存（604800秒）
  document.cookie = "first_visit_site=visited; path=/; max-age=604800";
}
```

作成したショートコード`ad01`を適当な場所に配置すればOK．

## Tips
Google AdSense の規約について  
コードの内容は，2回目の訪問時は広告コードそのものを記載しないため，隠すなどの違反には当たらない．

SEOについて  
広告が表示されないときは，無駄な`<div>`が発生する可能性がある．  
しかし，現状のSEOには99.9999%影響がない．
