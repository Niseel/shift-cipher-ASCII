/*
Viết hàm mã hóa xoay vòng nhận vào 1 chuỗi và 1 số nhận về kế quả mã hóa theo công thức
xoay vòng

Pre-condition: 
kiểm tra input là string và int
 - number(int) truyền vào phải 0<number<26 || -26<number<0
 - if number nhận vào > 0 mã hoa chiều xuôi, nhận vào < 0 mã hóa chiều ngược
 - dữ liệu hỗ trợ mảng chữ cái ?
input: str, number
output: str

Post-condition: thỏa mãn thuật toán trả về str đã mã hóa

*/

/*
Viết hàm giải mã xoay vòng nhận vào 1 chuỗi và 1 số nhận về kế quả mã hóa theo công thức
xoay vòng

Pre-condition: 
kiểm tra input là string và int
 - number(int) truyền vào phải 0<number<26 || -26<number<0

input: str, number
output: str

Post-condition: thỏa mãn thuật toán trả về str đã giải mã


Thuật toán:
- kiểm tra chuỗi có rỗng hay không
- chuẩn hóa str thành chữ thường
- kiểm tra number truyền vào (là số nguyên? có nằm trong khoảng 0-26 nếu)
- nếu number bằng 0 thì trả về str 
- nếu outrange thì tính lại  thực tế = cho trước mod 26 (28 mod 26 dư 2 -> k=2)
- nếu dương chạy case 1 (number dương)
    tạo ra result chứa kết quả
    kiểm tra từng phần tử của str nhận vào
    đổi từng phần tử thành mã UNICODE rồi cộng thêm k number truyền vào
        - nếu không vượt quá 122 thì dò số nhận được trong data[] lấy kí tự sau khi mã hóa ghép vào result
        - hoặc nếu vượt quá 122 lấy số nhận được sau khi cộng trừ cho 122 - 1; sau đó lấy 97 + tiếp ra kết quá
        ví dụ: kí tự x, nhận vào number 4 
                121 + 4 = 125 (vướt quá 122)
                125 - 122 - 1 = 2
                97 + 2 = 99 (c)
                mã hóa: x -> c
        
        trả về result sau khi chạy hết từng phần tử chuỗi truyền vào

- nếu âm chạy case 2 (number âm)
    tạo ra result chứa kết quả
    kiểm tra từng phần tử của str nhận vào
    đổi từng phần tử thành mã UNICODE rồi cộng thêm k number truyền vào
    -tạo biến chứ giá trị number dạng số dương để tiện thao tác nhưng vẫn làm theo chiều âm
    -nếu mã UNICODE của phần tử đang xét - number bé hơn 97 thì dò số nhận được trong data[] lấy kí tự sau khi mã hóa ghép vào result
    -hoặc nếu mã UNICODE của phần tử đang xét - number (đã chuyển thành dương) bé hơn 97 thì lấy 97 - số đó - 1, lấy 122 - kết quả => lấy kí tự theo unicode nối vào result 
    ví dụ: kí tự b(98), nhận vào number 4
        mã unicode của b là 
                98 - 4 = 94 < 97
                97 - 94 - 1 = 2
                122 - 2 = 120 (x)


//Note 
var x = 'c';//'covid';
console.log(x.charCodeAt()); // 99
console.log(x.charAt(0));    // c
*/
var readlineSync = require('readline-sync');

var data = [
        {key:97, value:'a'},
        {key:98, value:'b'},
        {key:99, value:'c'},
        {key:100, value:'d'},
        {key:101, value:'e'},
        {key:102, value:'f'},
        {key:103, value:'g'},
        {key:104, value:'h'},
        {key:105, value:'i'},
        {key:106, value:'j'},
        {key:107, value:'k'},
        {key:108, value:'l'},
        {key:109, value:'m'},
        {key:110, value:'n'},
        {key:111, value:'o'},
        {key:112, value:'p'},
        {key:113, value:'q'},
        {key:114, value:'r'},
        {key:115, value:'s'},
        {key:116, value:'t'},
        {key:117, value:'u'},
        {key:118, value:'v'},
        {key:119, value:'w'},
        {key:120, value:'x'},
        {key:121, value:'y'},
        {key:122, value:'z'}
    ]
// console.log(x.charCodeAt());
// console.log(x.charAt(0));

function standNumber(number) {
    if (number >= -26 && number <= 26) {
        return number;
    }
    else {
        return Math.abs(number % 26);
    }
}

function getChar(charCode){
    var char = data.find(function(item) {
        return item.key === charCode;
    });
    return char.value;
}

function encryptShitfCipher(str, number) {
    if (str.length === 0) {
        return false
    }
    if (number === 0) {
        return str;
    }
    if (Number.isInteger(number) === false) {
        return false;
    }
    str = str.toLowerCase();
    var k = Math.abs(standNumber(number));   
    var result = '';
    if (number > 0) { //duong
        for (var i=0;i<str.length;i++) {
            var charCode = str[i].charCodeAt() + k;
            if (charCode > 122 === false) {
                var char = getChar(charCode)
                result += char;
            }
            else {
                var turnTime = charCode - 122 - 1;
                var char = getChar(97+turnTime);
                result += char;
            }
        }
        return result;
    } 
    else { //am
        for (var i=0;i<str.length;i++) {
            var charCode = str[i].charCodeAt() - k;
            if (charCode >= 97 === true) {
                var char = getChar(charCode)
                result += char;
            }
            else {
                var turnTime = 97 - charCode - 1;
                var char = getChar(122-turnTime);
                result += char;
            }
        }
        return result;
    }
}
var str = readlineSync.question('> Enter string you want to encrypt? ');
var number = readlineSync.question('> Enter \'k number\' you want to encrypt? ');

console.log('>String after encrypt: ', encryptShitfCipher(str, parseInt(number))); 
//efg
//a	b c	d e f g h i j k l m n o p q r s t u v w x y z
//---------------------------------------------------
//htani
//vxy