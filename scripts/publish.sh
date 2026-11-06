#!/bin/sh
# dist/ のインストーラーを GitHub Release で公開する
set -eu
cd "$(dirname "$0")/.."

if ! command -v gh >/dev/null 2>&1; then
  echo "gh が見つかりません" >&2
  exit 1
fi

deb=$(ls dist/*.deb 2>/dev/null | head -n 1 || true)
exe=$(ls dist/*.exe 2>/dev/null | head -n 1 || true)
if [ -z "$deb" ] || [ -z "$exe" ]; then
  echo "dist/ に .deb / .exe がありません。先に release.sh を実行してください" >&2
  exit 1
fi

tag="v$(node -p "require('./package.json').version")"

notes="確定申告で使える足し算電卓アプリです。
全角数字やカンマ区切りの数字をまとめて入力すると、合計を表示します。

## インストール方法
- Ubuntu: \`sudo apt install ~/Downloads/$(basename "$deb")\`
- Windows: \`.exe\` を実行して、画面の指示に従う"

gh release create "$tag" "$deb" "$exe" --title "$tag" --notes "$notes"
