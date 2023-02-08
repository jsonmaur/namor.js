## Changelog for v3.0

### v3.0.0

##### Features

- Added the ability to use custom dictionaries and reserved word lists with `getDict()` and `getDictFile()`
- Added more words to internal dictionaries
- Made the reserved subdomain check more strict by removing special characters from value
- Single-word names now use adjectives, nouns, and verbs rather than just nouns

##### Deprecations

- Deprecated `saltLength` option in `generate()`, use `salt` instead
- Deprecated `subset` option in `generate()`, use `dictionary` instead
- Deprecated `manly` dictionary, use `rugged` instead
- Deprecated `validate()`, use `valid_subdomain()` instead
- Deprecated `rawData` access

##### Other Updates

- Removed support for Node < v14
- Nested the default dictionary within `default` key in `rawData`
- Removed default salt length of 5 on generated names
- Removed subdomain length validation in `generate()`, use `valid_subdomain()` instead
- Removed previously deprecated options for `generate()`: `char`, `numbers`, and `manly`
- Removed previously deprecated `isValid` method
- Fixed validation regex to check for proper length
