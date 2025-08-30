---
emoji: twemoji:no-entry
title: Cloudflare Pages の設定について
description: Pages へデプロイしたあと、設定したことのメモ
created: 2022-03-24
---

Pages へデプロイしたあと、設定したことのメモ

## カスタムドメイン
著者の場合、Cloudflare でドメインを購入し、そのままカスタムドメインの設定を行った。

Pages の「カスタムドメイン」タブからポチポチやっていけば、そのまま設定できた。

### project.pages.dev を noindex
カスタムドメイン設定後、元のドメインページはそのまま残り続ける。  
何もしなければ、元ドメインも検索エンジンにインデックスされてしまう。  
その対策として、次の事をやる。

- `_headers`ファイルの作成（拡張子なし）
- `_headers`を`public`直下へ置く  
  Gatsbyの場合、`static`直下へ置く

_headers
```
https://:project.pages.dev/*
  X-Robots-Tag: noindex
```

できているかどうかの確認は、「レスポンスヘッダ 確認」でググる。

参考：[Custom Headers for Cloudflare Pages](https://blog.cloudflare.com/custom-headers-for-pages/)

### xxx.project.pages.dev へのアクセス制限
Cloudflare Pages の場合、各ビルド毎にプレビューページを作成してくれる。  
こちらのページも何もしなければ、一般公開されるので、制限したい。

Pages の「設定」タブから「Access ポリシー」があるので、有効化する。  
進めていくと、途中で月額料金を聞かれるので、特に理由がなければ「$0 / user / month」を選択する。  
これが完了すると、自動でアクセス制限をかけてくれる。

以前は、トグルボタンのようなもので、設定するようだったが、(2022/03/24)時点では、  
Access アカウントを作成して、Applications にページが含まれていれば、完了するもよう。


## Web Analytics のバグ？に遭遇
症状と問題
- Web Analytics が機能しない
- Pages の「設定」タブから Web Analytics を無効化できない
- Beacon はあるが、エラーが出ている

関係あるかもしれないこちらの行動
- Pages の「設定」タブから Web Analytics を有効化したり無効化したりした

### 解決策
プロジェクトを一旦削除して再デプロイ
1. カスタムドメインの解除  
   解除時に一旦エラーが出るが、数秒後解除された
2. プロジェクトを削除
3. 再デプロイ
4. カスタムドメインの再設定

これで、Web Analytics から「サイトを追加」で追加するとアクセス解析ができるようになる。
