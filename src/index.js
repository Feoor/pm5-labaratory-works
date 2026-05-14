const path = require('path');

const configFile = 'app.json';
const configFilePath = path.join(__dirname, '..', 'config', configFile);

console.log(`Конфигурационный файл: ${configFilePath}`);
console.log(`Имя файла: ${configFile}`);
console.log(`Расширение файла: ${path.extname(configFile)}`);