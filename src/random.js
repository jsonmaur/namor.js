/**
 * Picks a random value from an array
 * @param {array} arr - The array to pick from
 * @returns {any} The value at the random key
 */
export function randomFromArray (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Generates a random number and returns as string to prevent limits
 * @param {int} size - The number of digits to return
 * @returns {string} The generated random number (in string format)
 */
export function randomNumber (size) {
  if (!size || size <= 0) {
    throw new Error('random number size must be above 0!')
  }

  let number = ''
  for (let i = 0; i < size; i++) {
    let rand
    if (i === 0) {
      /* prevents the first number from being 0 */
      rand = Math.floor((Math.random() * 9) + 1)
    } else {
      rand = Math.floor(Math.random() * 10)
    }

    number += String(rand)
  }

  return number
}
