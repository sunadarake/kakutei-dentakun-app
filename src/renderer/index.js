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
function calculateSum(input) {
  // 全角を半角に変換
  let normalized = zenkakuToHankaku(input);
  // 全角カンマを半角カンマに変換
  normalized = normalizeComma(normalized);

  // 区切り文字で分割（半角スペース、タブ、全角スペース、改行）
  const tokens = normalized.split(/[\s\u3000\t\n\r]+/);

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

// DOM要素の取得
const inputElement = document.getElementById('input');
const resultElement = document.getElementById('result');
const saveButton = document.getElementById('save-btn');
const resetButton = document.getElementById('reset-btn');

// 集計ボタンのクリックイベント
saveButton.addEventListener('click', () => {
  const inputValue = inputElement.value;
  const sum = calculateSum(inputValue);
  resultElement.textContent = sum.toLocaleString('ja-JP');
});

// リセットボタンのクリックイベント
resetButton.addEventListener('click', () => {
  inputElement.value = '';
  resultElement.textContent = '0';
});

// ブラウザで閉じようとしたら確認ダイアログを表示
window.addEventListener('beforeunload', (e) => {
  if (inputElement.value.trim()) {
    e.preventDefault();
  }
});
