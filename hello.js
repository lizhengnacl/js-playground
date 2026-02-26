console.log('Hello, Claude! Welcome to the JavaScript playground! 🚀')
console.log('Hook 验证测试 - ' + new Date().toLocaleString() + ' ✅✅')
console.log('Today is February 26, 2026 - time for some coding fun!')

// 基础数学运算
console.log('5 + 8 =', 5 + 8)
console.log('15 - 7 =', 15 - 7)
console.log('4 * 9 =', 4 * 9)
console.log('100 / 4 =', 100 / 4)

// 简单数组操作
const fruits = ['apple', 'banana', 'orange', 'grape', 'mango']
console.log('Fruits:', fruits)
console.log('First fruit:', fruits[0])
console.log('Last fruit:', fruits[fruits.length - 1])

// 简单函数
function greet(name) {
  return `Hello, ${name}! Welcome to the show!`
}

console.log(greet('World'))
console.log(greet('Claude'))
console.log(greet('Hooks Demo')) // 测试 hook 是否被触发 - 已验证

// 基本循环
console.log('Fruits list:')
for (const fruit of fruits) {
  console.log(`- ${fruit}`)
}

// 简单异步功能
async function sayHello(name) {
  await new Promise(resolve => setTimeout(resolve, 500))
  return `Welcome, ${name}! Have a great day!`
}

sayHello('Claude').then(message => console.log(message))
sayHello('World').then(message => console.log(message))
