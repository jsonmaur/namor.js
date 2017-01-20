const fs = require('fs')

const argv = process.argv.slice(2)
const data = fs.readFileSync(argv[0], 'utf8').split('\n')
const newData = fs.readFileSync(argv[1], 'utf8').split('\n')

let count = 0

newData.forEach(word => {
  if (!word) return

  word = word.replace(' ', '').toLowerCase()
  if (data.indexOf(word) > -1) return

  if (!/^[a-zA-Z]*$/.test(word)) return

  data.push(word)
  count++
})

fs.writeFileSync(argv[0], data.sort().join('\n').trim())
console.log(`Added ${count} words`)
