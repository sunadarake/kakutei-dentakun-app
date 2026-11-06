// 全角数字を半角に変換
function zenkakuToHankaku(str) {
  return str.replace(/[０-９]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 0xFEE0);
  });
}

// 全角カンマを半角カンマに変換
function normalizeComma(str) {
  return str.replace(/、/g, ',');
}

// 入力文字列から数字を抽出して合計を計算
export function calculateSum(input) {
  const normalized = normalizeComma(zenkakuToHankaku(input));

  // 区切り文字で分割（半角スペース、タブ、全角スペース、改行）
  const tokens = normalized.split(/[\s　\t\n\r]+/);

  let sum = 0;

  for (const token of tokens) {
    if (!token) continue;

    // カンマを削除
    const cleanToken = token.replace(/,/g, '');

    // 数字のみの場合
    if (/^-?\d+$/.test(cleanToken)) {
      sum += parseInt(cleanToken, 10);
    }
  }

  return sum;
}
