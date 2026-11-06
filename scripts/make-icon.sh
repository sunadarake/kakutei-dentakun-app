#!/bin/sh
# icon.png から icon.ico を作る
set -eu
cd "$(dirname "$0")/.."

if command -v magick >/dev/null 2>&1; then
  IM="magick"
elif command -v convert >/dev/null 2>&1; then
  IM="convert"
else
  echo "ImageMagick が見つかりません" >&2
  exit 1
fi

if [ ! -f icons/icon.png ]; then
  echo "icons/icon.png が見つかりません" >&2
  exit 1
fi

$IM icons/icon.png -define icon:auto-resize=256,128,64,48,32,16 icons/icon.ico
echo "作成しました: icons/icon.ico"
