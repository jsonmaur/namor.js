const fs = require('fs')

const argv = process.argv.slice(2)
const data = fs.readFileSync(argv[0], 'utf8').split('\n')

const arr = []
data.forEach(word => {
  if (arr.indexOf(word) > -1) return
  arr.push(word.replace(' ', '').toLowerCase().trim())
})

fs.writeFileSync(argv[0], arr.sort().join('\n').trim())
console.log(`Cleaned out ${data.length - arr.length} duplicates`)
