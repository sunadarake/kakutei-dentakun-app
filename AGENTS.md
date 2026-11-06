# Kakutei Dentaku App

確定申告で使える電卓アプリ。
足し算ができる。


## ディレクトリ構造

- src/main/index.js
- src/renderer/index.js (画面操作)
- src/renderer/calc.js (計算処理)
- icons/ (icon.png が元画像、icon.ico は生成物)
- scripts/ (make-icon.sh, release.sh, publish.sh)

## コマンド

- `npm run icon`: icon.png から icon.ico を作る (ImageMagick)
- `npm run release`: dist/ に .deb と .exe を作る (Wine が必要)
- `npm run publish`: dist/ のファイルを GitHub Release で公開する (gh が必要)

## ライブラリ

- Electron
- ES2015
- Vite

## プロジェクトの取り組み方について

* なるべくコードやコメントをシンプルに簡潔にすること。 
* コメントはUTF-8の日本語で書くこと。 
* 問題に取り組む前に、コードや仕様を読んで理解すること。 

