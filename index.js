const fs = require('fs');
const path = require('path');

// 1 Задание
// console.log('Текущая директория:', __dirname);
// console.log('Имя текущего файла:', __filename);
//
// console.log('Имя файла:', path.basename(__filename));
// console.log('Расширение файла:', path.extname(__filename));
// console.log('Директория файла:', path.dirname(__filename));

// 2 Задание
// const filePath = path.join(__dirname, 'data', 'info.txt');
// console.log('Путь файла:', filePath);
// console.log('Разбор пути:', path.parse(filePath));

// 3 Задание
// const fileName = process.argv[2];
//
// if (!fileName) {
//   console.log('Необходимо передать имя файла!')
//   process.exit(1);
// }
//
// const filePath = path.join(__dirname, 'files', fileName);
// console.log('Путь к файлу:', filePath);

// 4 Задание
const jsConstFiles = ['photo.jpg', 'document.pdf', 'music.mp3', 'script.js']

jsConstFiles.forEach(jsConstFile => {
  const jsFilePath = path.join(__dirname, 'uploads', jsConstFile);
  const extname = path.extname(jsConstFile);
  console.log(`Файл ${jsConstFile}, расширение: ${extname}, полный путь: ${jsFilePath}`);
});
