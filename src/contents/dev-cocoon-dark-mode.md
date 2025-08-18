---
emoji: twemoji:first-quarter-moon
title: 【Cocoon】ダークモード対応 スキン切り替え
description: Cocoonをダークモードに対応したい
created: 2020-12-12
---

やりたいこと
- ダークモードに対応したい
- Cocoonの明るいスキンと暗いスキンを切り替えて使いたい

【追記】  
ダークモード対応スキンが実装した  
[「Simple Darkmode」スキンを同梱追加](https://wp-cocoon.com/simple-darkmode/)

こだわりがなければ、追加されたスキンが簡単でオススメ。  
以下はこだわりたい人用。

## 追加したプログラム
functions.php
```php
// スキン切り替え
function get_skin_url(){
  if( 'dark' === $_COOKIE['color_theme_value'] ) {
// skin-dark-ruri がスキンのフォルダ（ダークモード用）
    return get_template_directory_uri().'/skins/skin-dark-ruri/style.css';
  } else {
// skin-mixblue がスキンのフォルダ（ライトモード用）
    return get_template_directory_uri().'/skins/skin-mixblue/style.css';
  }
}
```
javascript.js
```js
/** モバイル端末なら true 、それ以外なら false を返す */
function isMobile(){
  var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return (window.navigator.userAgent.search(regexp) !== -1);
}

// ダークモードの判定
var os_color = '';
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  os_color = 'dark';
} else {
  os_color = 'light';
}

// クッキーの有効確認、読込、比較、保存
if(navigator.cookieEnabled){
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)color_theme_value\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  if ((os_color == 'light') && (!cookieValue)) {
  } else if (os_color != cookieValue) {
    if (os_color == 'dark') {
      document.cookie = "color_theme_value=dark; path=/; max-age=31536000";
    } else {
      document.cookie = "color_theme_value=light; path=/; max-age=31536000";
    }
// モバイル端末用のクッションアラート
    if (isMobile()) {
      if (os_color == 'dark') {
        alert("ダークモードへ移行します");
      } else {
        alert("ライトモードへ移行します");
      }
    }
// ページのリロード
    location.reload();
  }
}
```

### 参考サイト
[Cocoonテーマのスキン切り換えデモを実装する方法](https://wp-cocoon.com/skin-switch-demo/)  
[【JavaScript】【PHP】【WordPress】ダークモードの実装](https://add.sh/8fb5114487/)

Cookie関連  
[JavaScriptによるcookieが有効か無効かの判定](https://qiita.com/tatsuyankmura/items/8e09cbd5ee418d35f169)  
[.cookie | JavaScript 日本語リファレンス](https://js.studio-kingdom.com/javascript/document/cookie)

その他  
[JavaScriptでスマホかどうか判別する](https://pisuke-code.com/js-how-to-detect-whether-mobile/)


## 課題
1. ダークモード使用ユーザーが初回訪問時に一瞬だけフラッシュする
1. ダークルリのスキンがAMPに対応していない
1. モバイル端末のスキン切り替え時、1~2秒待ってからリロードしないと反映されないため、クッション用アラートを入れているが、人によっては不審に思ってしまうかもしれない

とりあえず、ダークモード使用者が少ないこと、今は記事を書くことを頑張ったほうがいいこと、を考慮して、1つ目と3つ目の課題はこのまま保留。

2つ目の課題のAMP対応は、普通のAMPページで表が崩れすぎて、修正もめんどくさそうだったので、そもそもAMP対応をやめる方向で、雑に解決。


## Tips
プログラムを書くときに試行錯誤して得た知見のまとめ
### クッキーの寿命
クッキーの寿命指定には、「max-age」と「expires」の2種類がある。

||max-age|expires|
|-|:-:|:-:|
|指定値|秒数|日数|
|優先度|強い|弱い|
|PCでの挙動|想定通り|想定通り|
|スマホでの挙動|想定通り|ブラウザ終了時に削除|

このため、「max-age」で指定したほうが想定通りの動きになる。  
「expires」の方が優しいクッキーのため、問題なければこちらの方が良い。

※各端末での挙動は、著者の端末で確認したもので、他の端末は未確認である点に注意。

### ページのリロード周りの動作
プログラムではモバイル端末に対して、クッションを挟んでいる。  
元々はクッションがなくても、即リロードでスキンの切り替えができていた。  
CDNを導入した前後で、即切り替えができなくなり、クッションを挟んだ。  
原因はCDNではないかもしれないが、メモとして。

### phpでのスキンの指定
本当は、Cocoon設定でのスキンでライトモードを、phpプログラムでのスキンでダークモードを、それぞれ個別に設定できるようにしたかった。  
しかし、開発環境がダークモードだと、プログラムのスキン指定が強いためか、Cocoon設定のスキンまで上書きされたり、変更できなかったりする。  
そのため、プログラムで、ダークモードとライトモードの両方を直接指定したほうが、変な挙動は起こしにくいと考えられる。
