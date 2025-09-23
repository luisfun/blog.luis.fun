---
emoji: twemoji:package
title: Trusted Publishingでnpmパッケージを公開
description: npmパッケージのセキュリティを少し強化したメモ
created: 2025-09-23
---

自分のnpmパッケージのセキュリティを少し強化したときのメモ

## 前置き

詳細については、[azuさんの記事](https://efcl.info/2025/09/07/npm-oidc/)を見た方が正確です。

私の記事では、私が実際に行ったことを紹介します。

## 導入の流れ

もともと`--provenance`（認証バッジ）を付ける設定をしていました。そこから次の設定を追加しました。

- Trusted Publisherを[設定](https://docs.npmjs.com/trusted-publishers)
  - 必要な情報を入力
  - `[Set up connection]`ボタンで何事もなく完了
- npm-publish.ymlの[編集](https://github.com/luisfun/discord-hono/commit/7b8f5dbf17280bc6967041bcdbaba03a1a334958#diff-8a5ce8b612395836520d0655143f732d08e747af57f3cfe76b5e283600106240)
  - `npm i -g npm@latest`を追加
  - `env: NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}`を削除
- トークン削除
  - リポジトリとnpmjsの両方

私の場合はこれだけで問題なく移行できました。

ただし、2FAの必須化はしていません。~~めんどくさかった~~

## Tips: npm publishの違い

npm publishのフローが異なるため、簡単にまとめます。ymlファイルを参照する際の参考にしてください。

### azuさんのフロー

1. ブラウザからRun workflow（リリースPRを作成）
2. リリースPRをレビューしてリリースノートを書く
3. リリースPRをマージ
4. npm publish

### 公式例のフロー

1. tagを付けてpush
2. npm publish

### 私のフロー

1. ブラウザからRun workflow
2. npm publish
3. バージョン更新用のPRが作成されるのでマージ

### 気になる違い

||azu|公式|私|
|:-:|:-:|:-:|:-:|
|デフォルトブランチ保護|可|❌|可|
|タグ自動作成|✅|❌|✅|
|リリースノート自動作成|✅|❌|❌|
