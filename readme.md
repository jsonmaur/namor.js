<div align="center">
    <br>
    <img src="https://raw.githubusercontent.com/jsonmaur/namor/master/assets/logo.png">
    <br> <br> <br>
    <a href="https://travis-ci.org/jsonmaur/namor"><img src="https://travis-ci.org/jsonmaur/namor.svg?branch=master" alt="Build Status"></a>
    <a href="https://coveralls.io/github/jsonmaur/namor?branch=master"><img src="https://coveralls.io/repos/github/jsonmaur/namor/badge.svg?branch=master" alt="Coverage Status"></a>
    <br> <br> <br>
</div>

A name generator for Node that generates random, url-friendly names. This comes in handy if you need to generate unique subdomains (like Heroku does), or unique names for anything else. It can check against a reserved word list to prevent malicious subdomains, and generate names of a rugged nature.

> _Please Note: Generated names are not always guaranteed to be unique. To reduce the chances of collision, you can increase the length of the trailing number ([see here for collision stats](#collision)). Always be sure to check your database before assuming a generated value is unique._

## Getting Started

```bash
$ npm install namor --save
```

```javascript
const namor = require("namor")

/* defaults to two words and 5 random characters */
const name = namor.generate()

/* generate 3 words and no random characters */
const name = namor.generate({ words: 3, saltLength: 0 })

/* enable manly mode */
const name = namor.generate({ subset: "manly" })
```

[See it in action here](https://namor-example.now.sh) or [experience manly mode](https://namor-example.now.sh/?subset=manly&saltLength=0).

<a name="collision"></a>

## Collision Stats

The following stats give you the total number of permutations based on the word count (without a salt), and can help you make a decision on how long to make your salt. This data is based on the number of words we currently have in our [dictionary files](data).

-   1-word combinations: 1,319
-   2-word combinations: 3,016,553
-   3-word combinations: 1,720,200,230
-   4-word combinations: 2,268,944,103,370

##### Subset: Manly

-   1-word combinations: 282
-   2-word combinations: 110,826
-   3-word combinations: 9,487,044
-   4-word combinations: 2,675,346,408

## API

### .generate (options:Object)

Generates a new name, in all its glory.

-   **options**

    -   **words** `default: 2` The number of words to include in the generated name. Must be a positive integer no higher than 4, or 0 to only generate a salt.

    -   **separator** `default: "-"` The character to use between words when generating a name.

    -   **saltLength** `default: 5` The number of characters in the trailing salt. Must be a positive integer or `0` to exclude a trailing number.

    -   **saltType** `default: "mixed"` The type of characters to use for the trailing salt. Can be `number`, `string`, or `mixed`.

    -   **subset** Whether to use a subset dictionary rather than the default. Be aware this limits the number of dictionary words, creating a higher chance of collision. Only valid value at the moment is `"manly"`.

### .validate (name:String, options:Object)

Checks whether a string is valid for use as a subdomain, including length (max of 63 characters) and checking against a list of [reserved subdomains](data/default/reserved.txt) to prevent shady stuff.

-   **name** - The name to check.

-   **options**

    -   **reserved** `default: false` Whether to check the name against the [reserved word list](data/default/reserved.txt), which is a predefined set of subdomains that should remain private.

### .rawData

Allows access to the raw dictionary data. You probably won't ever use this, but it's there if you need it.

## License

[MIT](license) © [Jason Maurer](https://maur.co)
