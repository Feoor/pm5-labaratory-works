const path = require('path');
const fs = require('fs');

// 1 Задание
const dirPath = path.join(__dirname, 'data');

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const invFile = 'inventory.txt';
const invPath = path.join(dirPath, invFile);
const invData = 'Название товара: Количество\n'

if (!fs.existsSync(invPath)) {
  try {
    fs.writeFileSync(invPath, invData);
  } catch (err) {
    console.log(`Ошибка при создании файла: ${err}`);
  }
}

// 2 Задание
if (fs.existsSync(invPath)) {
  try {
    const data = fs.readFileSync(invPath, 'utf-8');

    if (!data) {
      console.log('Инвентарь не инициализирован');
      process.exit(1);
    }

    console.log('Содержимое файла inventory.txt:');
    console.log(data);
  } catch (err) {
    console.log(`Ошибка при чтении файла: ${err}`);
  }
} else {
  console.log('Инвентарь не инициализирован');
  process.exit(1);
}

// 3 Задание
function addItem(item, count) {
  fs.appendFileSync(invPath, `${item}: ${count}\n`, 'utf8');
}

// 4 Задание
const files = fs.readdirSync(dirPath);

console.log(`Файлов (${files.length}) в папке data:`)
files.forEach(file => console.log(file));

// 5 Задание
const tempLogFile = 'temp_log.txt';
const tempLogDir = path.join(__dirname, tempLogFile);

if (fs.existsSync(tempLogDir)) {
  try {
    fs.unlinkSync(tempLogDir);
    console.log('Временный файл temp_log.txt удалён');
  } catch (err) {
    console.log(`Ошибка при удалении файла: ${err}`);
  }
} else {
  console.log('Временный файл temp_log.txt не найден');
}

try {
  const oldName = invPath;
  const newName = path.join(dirPath, 'inventory_final.txt');

  fs.renameSync(oldName, newName);
} catch (e) {
  console.log(`Ошибка при переименовании файла: ${e}`);
}