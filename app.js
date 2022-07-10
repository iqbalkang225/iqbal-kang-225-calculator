'use sctrict';

const btns = document.querySelectorAll('.btn');
const equationEl = document.querySelector('.equation');
const resultEl = document.querySelector('.result');
// const historyEl = document.querySelector('.history');


let str = '';
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    
    // Calculating
    if (btn.textContent.trim() === '=') {
      //result update
      resultEl.textContent = eval(str);
      str = '';
    }
    // Deleting
    else if (btn.textContent.trim() === '←') {
      str = str.slice(0, -1);
      equationEl.textContent = str;
    }
    // Clearing
    else if (btn.textContent.trim() === 'C') {
      str = '';
      equationEl.textContent = str;
      resultEl.textContent = 0;
    }
    else{
      str += btn.textContent;
      // equation update
      equationEl.textContent = str;
    }
  });
});





