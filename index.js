const fs = require('fs/promises');
const path = require('path');

async function setup() {
  const storageDir = path.resolve(__dirname, 'storage');
  const statusFile = path.resolve(storageDir, 'status.txt');

  try {
    await fs.access(storageDir);
  } catch (err) {
    await fs.mkdir(storageDir);
  }

  try {
    await fs.writeFile(statusFile, 'Система готова');
  } catch (err) {
    console.log(`Ошибка при записи в файл status.txt: ${err}`);
  }
}

async function readTasks() {
  const tasksFile = path.resolve(__dirname, 'tasks.txt');

  let fileData;
  try {
    fileData = await fs.readFile(tasksFile, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Файл задач не найден');
      return;
    }

    console.log(`Ошибка при чтении файла tasks.txt: ${err}`);
    return;
  }

  console.log(`Содержимое файла tasks.txt:\n${fileData.toUpperCase()}`);
}

async function addLog(message) {
  const logFile = path.resolve(__dirname, 'storage', 'activity.log');

  try {
    await fs.appendFile(logFile, `${new Date().toISOString()} - ${message}\n`);
  } catch (err) {
    console.log(`Ошибка при записи в файл activity.log: ${err}`);
  }
}

async function copySource() {
  const sourceFile = path.resolve(__dirname, 'source.txt');
  const copyFile = path.resolve(__dirname, 'copy.txt');

  try {
    const sourceData = await fs.readFile(sourceFile, 'utf8');
    await fs.writeFile(copyFile, sourceData);
    await fs.unlink(sourceFile);
  } catch (err) {
    console.log(`Ошибка при копировании файла source.txt: ${err}`);
  }
}

const files = ['file1.txt', 'file2.txt', 'file3.txt'];
let promises = [];

files.forEach(file => {
  const filePath = path.resolve(__dirname, 'data', file);
  const promise = new Promise((resolve, reject) => {
    fs.stat(filePath)
      .then(stats => {
        resolve(`Файл ${file} существует, размер: ${stats.size} байт`);
      })
      .catch(err => {
        if (err.code === 'ENOENT') {
          resolve(`Файл ${file} НЕ существует`)
          return;
        }

        console.log(`Ошибка при получении информации о файле ${file}: ${err}`);
        reject(err);
      });
  });

  promises.push(promise);
})

Promise.all(promises)
  .then((results) => console.log(results.join('\n')))
  .catch((err) => console.log(`Ошибка при обработке файлов: ${err}`));