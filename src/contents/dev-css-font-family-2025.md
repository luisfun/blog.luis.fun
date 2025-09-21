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
  font-family: "Helvetica Neue", Arial, "Hiragino Sans", "Noto Sans JP", sans-serif;
}
code {
  font-family: "SF Mono", Consolas, monospace;
}
```

## 一般フォント

今回の調査で最も参考にしたのは[ICS MEDIAの記事](https://ics.media/entry/200317/)です。

私のフォントに対する考え方は、基本的にICS MEDIAと同じです。なので、ICS MEDIAとの違いを補足します。

ICS MEDIAの結論

```css
font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
```

### 違い

|ICS MEDIA|このサイト|
|:-:|:-:|
|"Hiragino Kaku Gothic ProN"|（なし）|
|Meiryo|"Noto Sans JP"|

#### Hiragino Kaku Gothic ProN

- 一部のApple系OSではこのフォントを廃止
  - Hiragino Sansに同胞されている
- `"Hiragino Kaku Gothic ProN"`のフォールバックが`"Hiragino Sans"`
- 一括指定として`"Hiragino Sans"`のみで問題ないと判断

#### Meiryo → "Noto Sans JP"

- Noto Sans JPは2025年4月にWindowsに標準搭載
  - `Meiryo`をフォールバックにしてもいいが今回は不採用
- Androidの和文フォントはNoto Sans CJK JP
  - `"Noto Sans JP"`の方がOS間の違いを減らせる

#### フォールバックフォント

- Androidは`sans-serif`指定が一般的になりつつある
- `sans-serif`をキャッチオール兼フォールバックとして利用

### 対応表と完成物

|OS|欧文フォント|和文フォント|
|:-:|:-:|:-:|
|Apple製品|Helvetica Neue|Hiragino Sans|
|Windows|Arial|Noto Sans JP|
|Android|sans-serif|sans-serif|
|フォールバック|sans-serif|sans-serif|

```css
font-family: "Helvetica Neue", Arial, "Hiragino Sans", "Noto Sans JP", sans-serif;
```

## コードフォント

コードフォントの調査では、[stack overflowの記事](https://stackoverflow.com/questions/59578361/using-apple-system-for-monospace-and-serif)と[Qiitaの記事](https://qiita.com/Paalon/items/5ec1dfe92832a3da44ec)を参考にしました。

一般フォントと同様にApple製品、Windows、フォールバックの3種類を指定するように選択しました。

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
|Apple製品|SF Mono|
|Windows|Consolas|
|Android|monospace|
|フォールバック|monospace|

```css
font-family: "SF Mono", Consolas, monospace;
```
