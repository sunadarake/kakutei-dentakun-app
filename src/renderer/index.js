import { calculateSum } from './calc.js';

// DOM要素の取得
const inputElement = document.getElementById('input');
const resultElement = document.getElementById('result');
const saveButton = document.getElementById('save-btn');
const resetButton = document.getElementById('reset-btn');

// 集計ボタンのクリックイベント
saveButton.addEventListener('click', () => {
  const sum = calculateSum(inputElement.value);
  resultElement.textContent = sum.toLocaleString('ja-JP');
});

// リセットボタンのクリックイベント
resetButton.addEventListener('click', () => {
  inputElement.value = '';
  resultElement.textContent = '0';
});
