/*
Viết hàm mã hóa xoay vòng nhận vào 1 chuỗi và 1 số nhận về kế quả mã hóa theo công thức
xoay vòng
*/
const readlineSync = require("readline-sync");
const data = require("./ASCII");

function standNumber(number) {
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
}

function getChar(charCode) {
  return data.find((item) => item.key === charCode).value;
  //return char.value;
}

function checkSpace(value) {
  return value === 32 ? true : false;
}

function encryptShitfCipher(str, number) {
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
}

function ShitfCipherDetector(str) {
  let result = [];
  if (str.length === 0) {
    return false;
  }
  for (let i = -94; i <= 94; i++) {
    result.push(encryptShitfCipher(str, i));
  }
  return result;
}

// var str = readlineSync.question("> Enter string you want to encrypt? ");
// var number = readlineSync.question("> Enter 'k number' you want to encrypt? ");

// console.log(
//   ">String after encrypt: ",
//   encryptShitfCipher(str, parseInt(number))
// );

var str = readlineSync.question("> Enter string you want to decrypt? ");

var dataz = ShitfCipherDetector(str);

dataz.forEach((item, index) => {
  console.log(`${index - 94}: ${item}`);
});

// 6/=A-6 +76/ <0)60 ZWV
