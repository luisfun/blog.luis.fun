---
emoji: twemoji:input-latin-letters
title: font-familyを適切に指定したい 2025
description: CSS font-familyの指定を見直したメモ
created: 2025-09-21
---

このサイトのfont-familyを見直した時のメモ

## 結論

```css
html {
  font-family: Arial, "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif;
}
code {
  font-family: "SF Mono", Consolas, monospace;
}
```

## 一般フォント

今回の調査で最も参考にしたのは[ICS MEDIAの記事](https://ics.media/entry/200317/)です。

この記事のコンセプトに、次の自己流コンセプトを加えました。

- iOS、Android、Windowsを主対象（[OSシェア](https://gs.statcounter.com/os-market-share/all/japan)参照）
- OS間の表示差をできるだけ減らす
- 総称フォントを活用

### ICS MEDIAとの違い

ICS MEDIAの結論

```css
font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
```

|ICS MEDIA|このサイト|
|:-:|:-:|
|"Helvetica Neue"|（なし）|
|"Hiragino Sans"|（なし）|
|Meiryo|"Noto Sans JP"|

#### "Helvetica Neue"除外

- HelveticaはApple製品のみ搭載
  - 統一可能な類似フォントは`Arial`

#### "Hiragino Sans"除外

- Apple製品の`sans-serif`はHiragino Sansが基本
- コンセプトとしてmacOSを考慮外としている

#### Meiryo → "Noto Sans JP"

- Noto Sans JPは2025年4月にWindowsに標準搭載
  - `sans-serif`が`"Noto Sans JP", Meiryo`として機能
- Androidの和文フォントはNoto Sans CJK JP
  - `"Noto Sans JP"`の方がOS間の表示差を減らせる

### sans-serif (2025)

多くの場合、次のフォントが使われるようです。

- Apple製品：Hiragino Sans
- Android：Noto Sans CJK JP / OS独自
- Windows：Noto Sans JP / Meiryo

### 対応表と完成物

|OS|欧文フォント|和文フォント|
|:-:|:-:|:-:|
|iOS|Arial|Hiragino Kaku Gothic ProN|Hiragino Sans|
|Android|(Roboto)|(Noto Sans CJK JP)|
|Windows|Arial|Noto Sans JP|

```css
font-family: Arial, "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif;
```

## コードフォント

コードフォントの調査では、[stack overflowの記事](https://stackoverflow.com/questions/59578361/using-apple-system-for-monospace-and-serif)と[Qiitaの記事](https://qiita.com/Paalon/items/5ec1dfe92832a3da44ec)を参考にしました。

一般フォントを参考にApple製品、Windows、フォールバックの3種類を指定するように選択しました。

- Apple製品
  - Xcodeを参考
  - `"SF Mono", Menlo, Monaco`
- Windows
  - VSCodeを参考
  - `Consolas, "Courier New"`
- フォールバック
  - `monospace`

### 対応表と完成物

|OS|フォント|
|:-:|:-:|
|iOS|SF Mono|
|Android|monospace|
|Windows|Consolas|

```css
font-family: "SF Mono", Consolas, monospace;
```

## その他

Apple製品がBIZ UDGothicを標準搭載するようになれば、一般フォントを統一できそうだなぁと思いました。（現在はユーザーが任意で[ダウンロード可能](https://developer.apple.com/fonts/system-fonts/?q=BIZ%20UDGothic)という状態）

もしかすると2026年か2027年の最適なフォント指定は、次のようになっているかもしれません。

```css
font-family: Arial, "BIZ UDGothic", sans-serif;
```
