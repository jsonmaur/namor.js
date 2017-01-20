<div align="center">
    <br>
    <img src="https://raw.githubusercontent.com/jsonmaur/namor/master/assets/logo.png">
    <br> <br> <br>
    <a href="https://travis-ci.org/jsonmaur/namor"><img src="https://travis-ci.org/jsonmaur/namor.svg?branch=master" alt="Build Status"></a>
    <a href="https://coveralls.io/github/jsonmaur/namor?branch=master"><img src="https://coveralls.io/repos/github/jsonmaur/namor/badge.svg?branch=master" alt="Coverage Status"></a>
    <br> <br> <br>
</div>

A name generator for Node that generates random, url-friendly names. This comes in handy if you need to generate unique subdomains (like Heroku does), or unique names for anything else. If manly mode is enabled for those who need it, only names of a rugged nature will be generated.

> *Please Note: Generated names are not guaranteed to always be unique. To reduce the chances of collision, you can increase the length of the trailing number (see below). Always make sure you check your database before assuming a generated value is unique.*

## Getting Started

```bash
npm install namor --save
```

```javascript
var namor = require('namor')

/* defaults to two words and 2 trailing numbers */
var name = namor.generate()

/* generate with 3 words and no numbers */
var name = namor.generate({ words: 3, numbers: 0 })

/* generate manly names */
var name = namor.generate({ manly: true })
```

[See it in action](https://namor-example-mlcpnkahch.now.sh/?words=2&numbers=2) or [experience manly mode](https://namor-example-mlcpnkahch.now.sh/?manly=true).

## Word Stats

The following stats can help you make a decision on how many trailing numbers to use. This data is based on the number of words we have in our dictionary files.

- 1-word combinations: 1,319
- 2-word combinations: 3,016,553
- 3-word combinations: 1,720,200,230
- 4-word combinations: 2,268,944,103,370

##### Manly Mode

- 1-word combinations: 282
- 2-word combinations: 110,826
- 3-word combinations: 9,487,044
- 4-word combinations: 2,675,346,408

## API

#### .generate (options)

Generates a new name.

- **options**
  - **words** - The number of words to include in the generated name. Must be a positive integer no higher than 4.

    > Type: `integer`  
    > Default: `2`  
    > Min: `1`  
    > Max: `4`

  - **numbers** - The length of the random trailing number. Must be a positive integer. It can also be set to `0` to exclude a trailing number.

    > Type: `integer`  
    > Default: `2`

  - **char** - The character to use between words when generating a name.

    > Type: `string`  
    > Default: `-`

  - **manly** - If set to true, manly mode will be enabled which will generate names of a rugged nature.

    > Type: `boolean`  
    > Default: `false`

#### .isValid (name, options)

Checks whether a name is a valid for use as a subdomain. Will also check the name against a [blacklist](data/blacklist.txt), unless ommitted in the options.

- **name** - The name to check.

  > Type: `string`  

- **options**
  - **blacklist** - Whether to check subdomains against the [blacklist](data/blacklist.txt), which is a predefined set of reserved subdomains as well as vulgar language.

    > Type: `boolean`  
    > Default: true

## License

[MIT](license) © [Jason Maurer](http://maur.co)
