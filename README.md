# Hello NFT Web

ブラウザ拡張のソフトウェア ウォレット MetaMask と接続する機能を持ち、任意の NFT コントラクト アドレスに対してウォレットのアドレスが保有しているトークンを問い合わせることができるフロントエンドです。

## このブランチについて

この `upgradable` ブランチのコードは、アップグレード可能な NFT コントラクトに特化しています。

## 動作方法

前提条件として、[Upgradable NFT](https://github.com/takeiyuto/upgradable-nft) レポジトリのコントラクトのデプロイがすでに終わっているものとします。

1. 適切なディレクトリでこのレポジトリをクローンし、ライブラリをダウンロードします。
```bash
git clone https://github.com/takeiyuto/hello-nft-web.git
cd hello-nft-web
yarn
```

2. ローカル Web サーバを起動して、フロントエンドを開始します。
```bash
yarn http-server .
```

3. MetaMask などのソフトウェア ウォレットが入ったブラウザで、http://127.0.0.1:8080/ を開きます。フロントエンドの表示どおりで、現在の NFT の保有数を確認することができます。

## `npm`と`yarn`

`yarn` は `npm` と同様、Node.js 向けのパッケージ マネージャです。次のコマンドで、システム全体で使えるように、インストールできます (macOS や Linux では、システム ディレクトリに書き込む権限を得るため、先頭に `sudo` が必要になるかもしれません)。
```bash
npm install -g yarn
```

`yarn` を使わない場合、上記の手順を次のように読み替えると、`npm` でも同じように実行できます。
* 引数のない単独の `yarn` コマンドは `npm install` にする。
* `yarn http-server` コマンドは、`yarn` を `npx` に読み替える。

## ライセンス表示

このサンプル コードは、[MIT License](LICENSE)で提供しています。

# 参照

[徹底解説 NFTの理論と実践](https://www.ohmsha.co.jp/book/9784274230608/)の第5章3節を参照してください。[本書の Web サイト](https://takeiyuto.github.io/nft-book)も参考にしてください。
