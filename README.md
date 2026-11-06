# 確定申告足し算くん

## 目的
確定申告の作業で、たくさんの数字をまとめて足し算するためのデスクトップアプリ。
全角の数字やカンマ区切りの数字を、そのまま貼り付けて合計できる。

## セットアップ
```bash
# node.js v22.17.0 で動作確認
git clone git@github.com:sunadarake/kakutei-dentakun-app.git
cd kakutei-dentakun-app
npm install

# 開発用に起動する (Windows は npm run dev:win)
npm run dev:linux
```

## 使い方
テキストボックスに数字を入れ、「集計」ボタンを押すと、画面の上に合計が表示される。
「×」ボタンで入力と結果を消す。入力が残ったまま閉じると、確認ダイアログが出る。

## 仕様

| 項目 | 内容 |
|:-|:-|
| 数字 | 整数のみ。負数 (`-50`) も使える。小数は無視される |
| 全角 | `１２３` のような全角数字と、全角の `、` を使える |
| カンマ | `13,543` のような桁区切りを使える |
| 区切り | 半角スペース、全角スペース、タブ、改行 |

| コマンド | 説明 |
|:-|:-|
| `npm run dev:linux` | Linux で開発用に起動 |
| `npm run dev:win` | Windows で開発用に起動 |
| `npm run icon` | `icons/icon.png` から `icons/icon.ico` を作る (ImageMagick) |
| `npm run release` | `dist/` に `.deb` と `.exe` を作る (Wine が必要) |
| `npm run publish` | `dist/` のファイルを GitHub Release で公開する (gh が必要) |
| `npm run build:linux` | `.deb` だけ作る |
| `npm run build:win` | Windows 用インストーラーだけ作る |
