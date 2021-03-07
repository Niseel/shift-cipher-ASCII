// Get data form https://quantrimang.com/bang-ma-ascii-va-bang-ky-tu-latin-chuan-iso-1252-144939
// using code:
// var text = ''; for (var i=53;i<=149;i++) {
//  var inText = document.querySelectorAll('#tbx tr>td p strong')[i].innerText;
//  text = text + ' ' + inText
// }
// console.log(text)
//{ key: 32, value: " " }
let ASCII = [];
let dataString = `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`;
let data = dataString.split("");
for (type of data) {
  var item = {};
  item.key = type.charCodeAt(0);
  item.value = type;
  ASCII.push(item);
}
//console.log(ASCII);
//console.log(ASCII[59].value);
module.exports = ASCII;
