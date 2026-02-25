console.log('Hello, Claude! Welcome to the JavaScript playground!')
console.log('Today is February 25, 2026 - time for some coding fun!')

// 基础数学运算
console.log('2 + 3 =', 2 + 3)
console.log('10 - 4 =', 10 - 4)
console.log('6 * 7 =', 6 * 7)
console.log('20 / 5 =', 20 / 5)

// 简单数组操作
const fruits = ['apple', 'banana', 'orange', 'grape']
console.log('Fruits:', fruits)
console.log('First fruit:', fruits[0])
console.log('Last fruit:', fruits[fruits.length - 1])

// 简单函数
function greet(name) {
  return `Hello, ${name}!`
}

console.log(greet('World'))
console.log(greet('Claude'))

// 基本循环
console.log('Fruits list:')
for (let i = 0; i < fruits.length; i++) {
  console.log(`- ${fruits[i]}`)
}

// 简单异步功能
async function sayHello(name) {
  await new Promise(resolve => setTimeout(resolve, 500))
  return `Welcome, ${name}!`
}

sayHello('Claude').then(message => console.log(message))
