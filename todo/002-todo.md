# リリース用スクリプトの追加（Ubuntu / Windows インストーラーを GitHub Release で公開）

## 概要
Ubuntu の `.deb` と Windows の `.exe`（NSIS）を作り、`gh release create` で公開する仕組みを `scripts/` と npm scripts で用意する。

## 調査結果
- `package.json`: scripts は `dev:*` / `build:*` のみ。`build.icon` と `win.icon` / `linux.icon` は `icons/plus.png`。`linux.target` は `AppImage, deb`、`win.target` は `nsis, portable`
- `icons/` には `plus.png`（512x512）のみ。`icon.png` / `icon.ico` はない（`src/renderer/plus.png` は別ファイルで、今回は触らない）
- `scripts/` は未作成。`.gitignore` に `dist/` あり
- `AGENTS.md` には「コマンド」の節がない（ディレクトリ構造のみ）
- `README.md` のビルド手順は `npm run build` と書かれているが、現在の scripts には存在しない（今回の範囲外）
- 環境: `magick` / `convert` / `wine` / `gh` はすべてインストール済み。remote は `github.com/sunadarake/kakutei-dentakun-app`
- `productName` は「確定申告足し算くん」。生成ファイル名に日本語が入る

## 実装計画
- [x] ステップ1: `icons/plus.png` を `icons/icon.png` に `git mv` し、`package.json` の `icon` 指定（`build.icon` / `linux.icon`）を `icons/icon.png` に変更する
- [x] ステップ2: `scripts/make-icon.sh` を作成する（`set -eu`、`magick` が無ければ `convert`、どちらも無い／`icons/icon.png` が無ければメッセージを出して終了、`-define icon:auto-resize=256,128,64,48,32,16` で `icons/icon.ico` を生成）
- [x] ステップ3: `scripts/release.sh` を作成する（`wine` が無ければ終了、`dist/` を削除、`npm run build:linux` と `npm run build:win` を実行、できた `.deb` と `.exe` を表示。ファイル名はクォートする）
- [x] ステップ4: `scripts/publish.sh` を作成する（`gh` が無い、または `dist/` に `.deb` / `.exe` が無ければ「先に release.sh を実行」と表示して終了、`package.json` の version から `vX.Y.Z` を決め、`gh release create` で両方を添付、リリースノートは概要2〜3行とインストール方法のみ）
- [x] ステップ5: 3つのスクリプトに `chmod +x` する
- [x] ステップ6: `package.json` を更新する（scripts に `icon` / `release` / `publish` を `sh scripts/xxx.sh` で追加、`linux.target` を `["deb"]`、`win.target` を `["nsis"]`、`win.icon` を `icons/icon.ico`）
- [x] ステップ7: `AGENTS.md` のディレクトリ構造に `scripts/` と `icons/` を、コマンド節（新規）に `npm run icon` / `release` / `publish` を追記する

## テスト・確認方法
- [x] `npm run icon` で `icons/icon.ico` ができる
- [x] `npm run release` で `dist/` に `.deb` と `.exe` ができ、ファイル名が表示される
- [x] `dist/` を空にして `npm run publish` を実行すると、メッセージを出して終了する（`gh release create` まで進まない）
- [ ] `npm run publish` の本番実行は公開リポジトリに Release ができるため、実行前にユーザーへ確認する（確認なしでは実行しない）

## 決定事項
- アイコンは `icons/plus.png` を `icons/icon.png` にリネームして、依頼文どおりの名前にそろえる
- `productName`（日本語）はそのままにする。ファイル名の問題が出たら報告し、勝手に設定は足さない
- ユーザーの依頼文どおり、`icon.ico` を自前で作って `win.icon` に指定する

## 懸念点・未決事項
- `build:win` を Linux 上で実行するので Wine が必須（インストール済み）。初回は Wine の初期化で時間がかかる可能性がある
- `.exe` の名前に日本語が入ると、`gh release create` の添付名や `publish.sh` のファイル検索で問題が出ないか、確認時に見る
- `productName` に空白は無いが、スクリプトでは念のため変数をクォートする
- `README.md` の `npm run build` の記述が現状と合っていない（今回は範囲外。必要なら別 TODO にする）
- `AppImage` と `portable` を外すので、配布形式は `.deb` と NSIS インストーラーだけになる（依頼どおり）
- 確認のため `npm install` を実行した（`node_modules` が未インストールだったため）
- `dist/` が空のときの `publish` は、`dist/` を一時退避して確認済み（`gh release create` には進まない）
- 日本語名の `.exe`（`確定申告足し算くん Setup 1.0.1.exe`）はビルドできた。`gh release create` での添付は、本番の公開時に確認する
- `publish` の本番実行は未実施（ユーザーの確認待ち）
