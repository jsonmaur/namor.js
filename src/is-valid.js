import data from '../data.json'

/**
 * tests whether a string is a valid subdomain or not.
 * also checks whether it is blacklisted.
 * @param {sstring} name - the subdomain name to check
 * @return {boolean} whether it is valid
 */
export default function (name, opts = {}) {
  opts.blacklist = !opts.blacklist && opts.blacklist !== false
    ? true : opts.blacklist

  const regexResult = /^[\w](?:[\w-]{0,61}[\w])?$/.test(name)

  return opts.blacklist
    ? regexResult && data.blacklist.indexOf(name) === -1
    : regexResult
}
