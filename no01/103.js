// 1.3 ) First Class Function คืออะไร กรุณาแสดงตัวอย่างพร้อมคำอธิบาย

// คำตอบ คือการที่ฟังก์ชันที่สร้างขึ้นมาสามารถนำไปใช้งานส่วนต่างๆของโปรแกรมได้

// ตัวอย่าง 

//ฟังก์ชั่นแสดงเวลาปัจจุบัน
function getCurrentTime() {
    return new Date()
}

//ส่งออกฟังก์ชั่น getCurrentTime
module.exports.getCurrentTime = getCurrentTime


// ตัวอย่าง เรียกใช้ฟังก์ชั่น getCurrentTime
// const now = require('./modules/103.js').getCurrentTime
// console.log(now());
console.log(getCurrentTime());


