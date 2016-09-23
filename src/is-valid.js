import data from '../data.json'

export default function (name) {
  const testRegex = /^[\w].[\w-]{3,48}[\w]$/.test(name)
  const testBlacklist = data.blacklist.indexOf(name) === -1

  return testRegex && testBlacklist
}
