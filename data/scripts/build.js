import fs from 'fs'
import path from 'path'
import glob from 'glob'

const data = {}
const dataPath = path.resolve(__dirname, '../')

/**
 * assigns values to an object, creating keys in
 * `keyPath` if they don't exist yet.
 * @param {object} obj - The object to assign values to
 * @param {array} keyPath - The path to assign in object [a,b] => obj.a.b
 * @param {any} value - The value to assign to the object
 */
function assign (obj, keyPath, value) {
  const lastKeyIndex = keyPath.length - 1

  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i]
    if (!(key in obj)) obj[key] = {}
    obj = obj[key]
  }

  obj[keyPath[lastKeyIndex]] = value
}

glob(`${dataPath}/**/*.txt`, (err, files) => {
  if (err) return console.log(err)

  files.forEach((file) => {
    const keyPath = file
      .replace(dataPath, '')
      .replace(path.extname(file), '')
      .substring(1).split('/')

    const words = fs.readFileSync(file, 'utf8').trim().split('\n')
    assign(data, keyPath, words)
  })

  const output = path.resolve(__dirname, '../../data.json')
  fs.writeFileSync(output, JSON.stringify(data))
})
