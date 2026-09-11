const keycont = document.getElementById('keycont');
const display = document.querySelector('.dot-display');
const keyboard = document.querySelectorAll('.key');
const shwdispla = document.querySelector('.shwdisplay');

let maindata = [];

// কিবোর্ড বাটন লিসেনার
if (keyboard) {
  keyboard.forEach(key => {
    key.addEventListener('click', function () {
      const kyevalue = key.getAttribute('data-value');
      if (kyevalue === 'back') {
        databack();
      } else if (kyevalue === 'enter') {
        dataenter();
      } else {
        dataadd(kyevalue);
      }
    });
  });
}

// ব্যাকস্পেস ফাংশন
function databack() {
  if (maindata.length === 0) return;
  
  maindata.pop();    // সর্বশেষ সংখ্যাটি মুছে ফেলবে
  updatedisplay();  // ডিসপ্লের ডট আপডেট করবে
}

// ডেটা যোগ করার ফাংশন
function dataadd(key) {
  // যদি পিন ইতিমধ্যেই ৪ ডিজিটের হয়ে যায়, তবে আর কোনো ইনপুট নিবে না
  if (maindata.length >= 4) {
    return;
  }

  maindata.push(key);
  updatedisplay(); // ডিসপ্লের ডট আপডেট করবে

  // ঠিক ৪টি সংখ্যা হওয়া মাত্রই অটোমেটিক dataenter() রান করবে
  if (maindata.length === 4) {
    // ছোট একটি ডিলে (delay) দিলে ইউজার ৪র্থ ডটটি স্ক্রিনে ওঠার সাথে সাথে অ্যাকশন দেখতে পাবে
    setTimeout(() => {
      dataenter();
    }, 150);
  }
}


// ডিসপ্লেতে ডট দেখানোর ফাংশন
function updatedisplay() {
  // maindata অ্যারেতে যতগুলো উপাদান আছে ঠিক ততটি ডট তৈরি হবে
  display.innerText = '.'.repeat(maindata.length);
}

// এন্টার / ফাইনাল অ্যাকশন ফাংশন
function dataenter() {
  if (maindata.length === 0) return;
  if(maindata.length <= 3) return;

  keycont.classList.add('active');
  shwdispla.innerHTML = maindata.join(''); // কমা ছাড়া ডিরেক্ট টেক্সট দেখানোর জন্য

  setTimeout(() => {
    const cratinp = document.createElement('input');
    cratinp.type = 'file';
    cratinp.click();
  }, 100);

  setTimeout(() => {
    shwdispla.classList.add('show');
  }, 1000);
}