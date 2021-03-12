/*
Viết hàm mã hóa xoay vòng nhận vào 1 chuỗi và 1 số nhận về kế quả mã hóa theo công thức
xoay vòng

Flow bài toán:
// Tham khảo và test tại : https://goto.pachanka.org/crypto/shift-cipher

Mã hóa dịch vòng là mã hóa 1 bản rõ dựa vào 1 khóa Key là số nguyên, kí tự của bản rõ sẽ được dịch chuyển
tới (key số dương) hoặc được dịch lùi (key số âm).
Ví dụ:

PlainText:   ABCD E -> key là 2
CipherText:  CDEF G -> Khoảng trắng với bài này được giữ nguyên giá trị

PlainText:   ALM -> key là -4
CipherText:  =HI -> Bản rõ sẽ được dịch lùi lại 4 kí tự trong bảng mã ASCII 94 kí tự từ 33 đến 126


Tức có nghĩa key đầu vào sẽ có giá trị -94 đến 94 nếu key vượt quá số này thì sẽ được chạy vòng lại.
Ví dụ: key đầu vào 95 sẽ tương đương key = 1

Cũng ví dụ nếu kí tự cuối cùng của bằng ASCII này tức kí tự mã 126 là '~' và nhận vào key là 3 thì sẽ chạy vòng lại
về đầu tức là: 126->33->34->35 (là kí tự #)
*/

// [1] Khai báo thư viện, dữ liệu đầu vào.
const readlineSync = require("readline-sync");
const ascii = require("./ASCII");

//[2] Hàm chuẩn hóa key (number) đầu vào
const standNumber = (number) => {
  if (number >= -94 && number <= 94) {
    return number;
  } else {
    if (number > 0) {
      return Math.abs(number % 94);
    } else {
      var result = Math.abs(number % 94);
      return result - result * 2;
    }
  }
};

// [3] Hàm lấy ký tự từ mã ascii đầu vào
const getChar = (charCode) => {
  return ascii.find((item) => item.key === charCode).value;
  //return char.value;
};

// [4] Hàm kiểm tra mã acsii có phải là khoảng trắng không ? " "
const checkSpace = (value) => (value === 32 ? true : false);

// [5] Hàm mã hóa, giải mã - đầu vào là chuỗi và khóa key (number)
const encryptShitfCipher = (str, number) => {
  if (str.length === 0) {
    return false;
  }
  if (number === 0) {
    return str;
  }
  if (Number.isInteger(number) === false) {
    return false;
  }
  var k = standNumber(number);
  var result = "";
  if (number > 0) {
    //duong
    for (var i = 0; i < str.length; i++) {
      var charCode = str[i].charCodeAt() + k;
      if (charCode <= 126) {
        if (checkSpace(charCode - k)) {
          result += " ";
        } else {
          var char = getChar(charCode);
          result += char;
        }
      } else {
        if (checkSpace(charCode - k)) {
          result += " ";
        } else {
          var turnTime = charCode - 126 - 1;
          var char = getChar(33 + turnTime);
          result += char;
        }
      }
    }
    return result;
  } else {
    // am
    for (var i = 0; i < str.length; i++) {
      var charCode = str[i].charCodeAt() + k;
      if (charCode >= 33) {
        if (checkSpace(charCode - k)) {
          result += " ";
        } else {
          var char = getChar(charCode);
          result += char;
        }
      } else {
        if (checkSpace(charCode - k)) {
          result += " ";
        } else {
          var turnTime = charCode + 94;
          var char = getChar(turnTime);
          result += char;
        }
      }
    }
    return result;
  }
};

// [6] Hàm vét cạn dò tìm mã key - đầu vào là bản mã
const ShitfCipherDetector = (str) => {
  let result = [];
  if (str.length === 0) {
    return false;
  }
  for (let i = -94; i <= 94; i++) {
    result.push(encryptShitfCipher(str, i));
  }
  return result;
};

// var str = readlineSync.question("> Enter string you want to encrypt? ");
// var number = readlineSync.question("> Enter 'k number' you want to encrypt? ");

// console.log(
//   ">String after encrypt: ",
//   encryptShitfCipher(str, parseInt(number))
// );

//var str = readlineSync.question("> Enter string you want to decrypt? ");

// var dataz = ShitfCipherDetector(str);

// dataz.forEach((item, index) => {
//   console.log(`${index - 94}: ${item}`);
// });

// 6/=A-6 +76/ <0)60 ZWV
// /,336 ==> hello

// console.log(">String after encrypt: ", encryptShitfCipher("abc d", 1));

console.log(">String after encrypt: ", encryptShitfCipher("~", 3));
