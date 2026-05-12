console.log('Начало...');

let count = 0;

setInterval(()=>{
  count++;
  console.log(`Count: ${count}`);

  if (count === 5) {
    console.log('Готово!');
    process.exit();
  }
}, 1000);