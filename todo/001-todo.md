# 役割ごとにコードを整理する

## 概要
main / preload / renderer の役割を明確にする。計算処理を画面操作から分離し、重複した終了確認と空の preload を整理する。

## 調査結果
- `src/main/index.js`: ウィンドウ作成と、閉じる時の確認ダイアログ（`executeJavaScript` で `#input` を読む）
- `src/preload/index.js`: `contextBridge` を読み込むだけで何も公開していない
- `src/renderer/index.js`: 計算（`calculateSum` など）、DOM操作、`beforeunload` が同居
- `src/renderer/index.html`: `<script type="module" src="./index.js">` で読み込み（module なので `import` が使える）
- `package.json` の `files` は `src/**/*` なので、新規ファイルは自動でビルド対象になる

## 実装計画
- [x] ステップ1: 計算関数（`zenkakuToHankaku` / `normalizeComma` / `calculateSum`）を `src/renderer/calc.js` に移し、`export` する
- [x] ステップ2: `src/renderer/index.js` を DOM操作のみにし、`calc.js` を `import` する
- [x] ステップ3: `src/renderer/index.js` の `beforeunload` を削除する（終了確認は main に一本化）
- [x] ステップ4: `src/preload/index.js` を削除し、`src/main/index.js` の `webPreferences.preload` を外す
- [x] ステップ5: `AGENTS.md` のディレクトリ構造を更新する（preload 削除、calc.js 追加）

## テスト・確認方法
- [ ] `npm run dev:linux` で起動し、複数の数字（全角・カンマ・改行区切り）を集計して合計が変わらないこと
- [ ] リセットボタンで入力と結果が初期化されること
- [ ] 入力がある状態で閉じると確認ダイアログが1回だけ出て、「閉じる」で終了し、「キャンセル」で残ること
- [ ] 入力が空なら確認なしで閉じること

## 決定事項
- 整理は最小限にする（さらなるファイル分割はしない）
- 終了確認は main 側のダイアログを残す（renderer の beforeunload を削除）
- preload は使わず削除する

## 懸念点・未決事項
- main が `executeJavaScript` で `#input` に依存する点は残る（今回は許容）
- preload 削除後に将来 API が必要になれば作り直す
- 小数への対応は今回の範囲外
