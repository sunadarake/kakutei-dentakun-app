#!/bin/sh
# Ubuntu と Windows のインストーラーを作る
set -eu
cd "$(dirname "$0")/.."

if ! command -v wine >/dev/null 2>&1; then
  echo "wine が見つかりません (sudo apt install wine)" >&2
  exit 1
fi

rm -rf dist
npm run build:linux
npm run build:win

echo "できたファイル:"
ls dist/*.deb dist/*.exe
