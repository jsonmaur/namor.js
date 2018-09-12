import data from '../data.json'
import { randomFromArray, randomNumber } from './random'

export default function (opts = {}) {
  /* deprecations */
  if (opts.numLen || opts.numLen === 0) {
    console.log('namor: "numLen" is now deprecated, use "numbers" instead')
    opts.numbers = opts.numLen
  }

  /* generate the name */
  const name = addTrailingNumber(
    processPattern(getPattern(opts.words), opts.char, opts.manly),
    opts.numbers, opts.char
  )

  /* ensure final subdomain isn't too long */
  if (name.length > 63) {
    throw new Error('Subdomains cannot be longer than 63 characters! Try shortening your trailing number.')
  }

  return name
}

/**
 * Returns a language pattern based on the word count of the name.
 * @param {integer} words - the number of words to use
 * @return {array} a list (in order) of the language pattern
 */
export function getPattern (words = 2) {
  words = parseInt(words, 10)

  if (words < 1) {
    throw new Error('word count must be above 0')
  }
  if (words > 4) {
    throw new Error('word count cannot be above 4')
  }

  let pattern
  switch (words) {
    case 1:
      pattern = ['noun']
      break
    case 2:
      pattern = randomFromArray([['adjective', 'noun'], ['noun', 'verb']])
      break
    case 3:
      pattern = ['adjective', 'noun', 'verb']
      break
    case 4:
      pattern = ['adjective', 'noun', 'noun', 'verb']
      break
  }

  return pattern
}

/**
 * Fills a language pattern with actual words from our dictionary,
 * and turns it into a pipe-cased string.
 * @param {array} pattern - the pattern to use
 * @return {string} the concated string
 */
export function processPattern (pattern, char, manly) {
  const fills = pattern.map(type => {
    const wordsToChooseFrom = manly
      ? data.manly[`${type}s`]
      : data[`${type}s`]

    return randomFromArray(wordsToChooseFrom)
  })

  return fills.join(char || '-')
}

/**
 * Generates and adds a random number to the end of a name.
 * @param {string} name - the name to append to
 * @param {integer} len - the length of the trailing number
 * @return {string} the new name
 */
export function addTrailingNumber (name, len = 2, char = '-') {
  len = parseInt(len, 10)

  if (len < 0) {
    throw new Error('number length must be above 0')
  }

  return name + (len ? char + randomNumber(len) : '')
}
