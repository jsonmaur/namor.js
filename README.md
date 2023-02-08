# Namor.js

<a href="https://github.com/jsonmaur/namor.js/actions/workflows/test.yml">
  <img alt="Test Status" src="https://img.shields.io/github/actions/workflow/status/jsonmaur/namor.js/test.yml?label=test&style=plastic">
</a>

<a href="https://www.npmjs.com/package/namor">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/namor?style=plastic">
</a>

Namor.js is a name generator for Node that creates random, url-friendly names. This comes in handy if you need to generate unique subdomains like many PaaS/SaaS providers do, or unique names for anything else.

* 🔒 Subdomain validation with reserved names
* 📚 Custom dictionaries and reserved word lists
* 🏋️ Hilarious alternate dictionaries
* ✅ 100% test coverage

[See it in action](https://namor.jsonmaur.com). Namor is also available for [Elixir](https://github.com/jsonmaur/namor.ex).

> _Please Note: Generated names are not always guaranteed to be unique. To reduce the chances of collision, you can increase the length of the trailing number ([see here for collision stats](#collision)). Always be sure to check your database before assuming a generated value is unique._

## Getting Started

```bash
$ npm install namor --save
```

```javascript
const namor = require("namor")

namor.generate()
// "sandwich-invent"

namor.generate({ salt: 5 })
// "sandwich-invent-s86uo"

namor.generate({ words: 3, dictionary: "rugged" })
// "savage-whiskey-stain"
```

<a name="collision"></a>

## Collision Stats

The following stats give you the total number of permutations based on the word count (without a salt), and can help you make a decision on how long to make your salt. This data is based on the number of words we currently have in our [dictionary files](https://github.com/jsonmaur/namor.js/tree/master/dict).

##### `default` dictionary

- 1-word combinations: 7,948
- 2-word combinations: 11,386,875
- 3-word combinations: 12,382,548,750
- 4-word combinations: 23,217,278,906,250

##### `rugged` dictionary

- 1-word combinations: 735
- 2-word combinations: 127,400
- 3-word combinations: 14,138,880
- 4-word combinations: 3,958,886,400

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

[MIT](LICENSE) © [Jason Maurer](https://jsonmaur.com)
