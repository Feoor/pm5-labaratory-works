const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

if (!a || !b) {
  console.log('Укажите два числа!');
}

console.log(`${a} + ${b} = ${a + b}`);