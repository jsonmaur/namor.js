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

[See it in action](https://namor.jsonmaur.com). Also available for [Elixir](https://github.com/jsonmaur/namor.ex).

> _Please Note: Generated names are not always guaranteed to be unique. To reduce the chances of collision, you can increase the length of the trailing number ([see here for collision stats](#collision)). Always be sure to check your database before assuming a generated value is unique._

## Getting Started

```console
$ npm install namor
```

```javascript
import namor from "namor"

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

    -   **words** `default: 2` The number of words to include in the generated name. Must be a positive integer no higher than 4.

    -   **separator** `default: "-"` The character to use between words when generating a name.

    -   **salt** `default: 0` The number of characters in the trailing salt. Must be a positive integer.

    -   **saltType** `default: "mixed"` The type of characters to use for the trailing salt. Can be `numbers`, `letters`, or `mixed`.

    -   **dictionary** `default: "default"` The dictionary to use. Can be set to `"default"`, `"rugged"`, or a custom dictionary using [`getDict`](#getdict-namestring-basepathstring).

### .valid_subdomain (name:String, options:Object)

Checks whether a string is valid for use as a subdomain including special characters, length (max of 63 characters), and checking against a list of [reserved subdomains](dict/reserved.txt).

-   **name** - The name to check.

-   **options**

    -   **reserved** `default: false` Whether to check the name against the [reserved word list](dict/reserved.txt), which is a predefined set of values that shouldn't be offered as subdomains. This can also be set to an array of strings for a custom reserved word list (consider using [`getDictFile`](#getdictfile-namestring-basepathstring)).

### .getDict (name:String, basePath:String)

Reads word lists from a base folder and returns a parsed dictionary object. A dictionary folder is expected to be a directory containing three files: `adjectives.txt`, `nouns.txt`, and `verbs.txt`. Each file should have one word per line with no duplicate words. If `basePath` is not defined, it will look for the dictionary in Namor's internal dictionary folder. Use this function to define a custom dictionary like so:

```
 ┌── dictionaries/
 │ ┌── custom/
 │ │ ┌── adjectives.txt
 │ │ ├── nouns.txt
 │ │ └── verbs.txt
```

```javascript
const dictionaryPath = path.resolve(__dirname, "dictionaries")
const dictionary = namor.getDict("custom", dictionaryPath)

namor.generate({ dictionary: dictionary })
```

### .getDictFile (name:String, basePath:String)

Reads a single word file with one word per line, and returns the words trimmed and parsed into an array. If `basePath` is not defined, it will look for the dictionary in Namor's internal dictionary folder. Use this function to define a custom reserved word list like so:

```
 ┌── dictionaries/
 │ ┌── reserved.txt
```

```javascript
const dictionaryPath = path.resolve(__dirname, "dictionaries")
const reservedWords = namor.getDictFile("reserved.txt", dictionaryPath)

namor.valid_subdomain("value", { reserved: reservedWords })
```

#### A note on custom dictionaries

Reading large word lists can be slow, so it's very highly recommended to only call `getDict` and `getDictFile` once when the application starts.

## License

[MIT](LICENSE) © [Jason Maurer](https://jsonmaur.com)
