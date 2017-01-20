<div align="center">
    <img src="assets/logo.png?raw=true">
    <a href="https://travis-ci.org/jsonmaur/namor"><img src="https://travis-ci.org/jsonmaur/namor.svg?branch=master" alt="Build Status"></a>
    <a href="https://coveralls.io/github/jsonmaur/namor?branch=master"><img src="https://coveralls.io/repos/github/jsonmaur/namor/badge.svg?branch=master" alt="Coverage Status"></a>
</div>

A name generator for Node that generates random, url-friendly names. This comes in handy if you need to generate unique subdomains (like Heroku does), or unique names for anything else. If manly mode is enabled for those who need it, only names of a rugged nature will be generated.

> *Please Note: Generated names are not guaranteed to always be unique. To reduce the chances of collision, you can increase the length of the trailing number (see below). Always make sure you check your database before assuming a generated value is unique.*

## Getting Started

```bash
npm install namor --save
```

```javascript
var namor = require('namor')

/* defaults to two words and 4 trailing numbers */
var name = namor.generate()

/* generate with 3 words and no numbers */
var name = namor.generate({ words: 3, numbers: 0 })

/* generate manly names */
var name = namor.generate({ manly: true })
```

#### Some Examples

```bash
pricey-note-4568
soggy-sock-2003
wing-command-4446
paper-rely-1152
historical-team-4142
goat-catch-8858
dapper-rat-3125
neat-mist-1260
open-experience-2643
marvelous-belief
holiday-steer
tearful-texture
pretty-ship
chivalrous-look
enchanting-plant

### manly ###
bronco-brimstone-3314
pure-fireball-2782
carnal-glory-10756
saber-strike-5734
ballistic-iron-4512
hardened-jerky-4148
potent-bourbon-3517
avenged-falcon-7282
almighty-dog-run
deep-flames-dread
fiery-forge-conquer
pummeled-brawn-triumph
primal-attack-kick
```

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
    > Default: `4`

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
