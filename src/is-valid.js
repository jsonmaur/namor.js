import data from '../data.json'

/**
 * Tests whether a string is a valid subdomain or not.
 * Will also check whether it is a reserved subdomain.
 * @param {sstring} name - the subdomain name to check
 * @return {boolean} whether it is valid
 */
export default function (name, opts = {}) {
  const regexResult = /^[\w](?:[\w-]{0,61}[\w])?$/.test(name)

  /* deprecations */
  if (opts.blacklist) {
    console.log('namor: "blacklist" option is now deprecated, use "reserved" instead')
    opts.reserved = opts.blacklist
  }

  return opts.reserved
    ? regexResult && data.reserved.indexOf(name) === -1
    : regexResult
}
