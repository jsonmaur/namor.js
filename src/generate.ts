import crypto from "crypto-extra";
import { data, Dictionary } from "./index";

enum Word {
  Adjective = "adjectives",
  Noun = "nouns",
  Verb = "verbs",
}

interface Options {
  words?: number;
  separator?: string;
  salt?: number;
  saltType?: "numbers" | "letters" | "mixed";
  dictionary?: "default" | "rugged" | Dictionary;
  /* deprecated */
  saltLength?: number;
  subset?: "manly";
}

export function randomFromArray(arr: any[]): any {
  return arr[crypto.randomNumber({ max: arr.length - 1 })];
}

export function getPattern(count?: number): Word[] {
  switch (count) {
    case 0:
      return [];
    case 1:
      return randomFromArray([[Word.Adjective], [Word.Noun], [Word.Verb]]);
    case 3:
      return [Word.Adjective, Word.Noun, Word.Verb];
    case 4:
      return [Word.Adjective, Word.Noun, Word.Noun, Word.Verb];
    case 2:
    default:
      return randomFromArray([
        [Word.Adjective, Word.Noun],
        [Word.Noun, Word.Verb],
      ]);
  }
}

export function getSalt(saltType: Options["saltType"], length: number): string {
  let charset;

  /* start deprecations */
  // @ts-ignore
  if (saltType === "number") {
    console.warn(
      "namor.genSalt(): saltType `number` has been deprecated, use `numbers` instead"
    );
    saltType = "numbers";
  }
  // @ts-ignore
  if (saltType === "string") {
    console.warn(
      "namor.genSalt(): saltType `string` has been deprecated, use `letters` instead"
    );
    saltType = "letters";
  }
  /* end deprecations */

  switch (saltType) {
    case "numbers":
      charset = "0123456789";
      break;
    case "letters":
      charset = "abcdefghijklmnopqrstuvwxyz";
      break;
    case "mixed":
    default:
      charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  }

  return crypto.randomString(length, charset);
}

export function generate(opts: Options = {}) {
  /* start deprecations */
  if (opts.saltLength) {
    console.warn(
      "namor.generate(): `saltLength` option has been deprecated, use `salt` instead"
    );
    opts.salt = opts.saltLength;
  }
  if (opts.subset) {
    console.warn(
      "namor.generate(): `subset` option has been deprecated, use `dictionary` instead"
    );
    // @ts-ignore
    opts.dictionary = opts.subset;
  }
  // @ts-ignore
  if (opts.saltType === "number") {
    console.warn(
      "namor.generate(): saltType `number` has been deprecated, use `numbers` instead"
    );
    opts.saltType = "numbers";
  }
  // @ts-ignore
  if (opts.saltType === "string") {
    console.warn(
      "namor.generate(): saltType `string` has been deprecated, use `letters` instead"
    );
    opts.saltType = "letters";
  }
  // @ts-ignore
  if (opts.dictionary === "manly") {
    console.warn(
      "namor.generate(): The `manly` dictionary has been renamed to `rugged` instead"
    );
    opts.dictionary = "rugged";
  }
  /* end deprecations */

  if (opts.words && (opts.words < 1 || opts.words > 4)) {
    throw new TypeError("Word count must be between 1-4");
  }

  opts.separator = opts.separator || "-";
  opts.words = Number(opts.words !== undefined ? opts.words : 2);
  opts.salt = Number(opts.salt !== undefined ? opts.salt : 0);
  opts.saltType = opts.saltType || "mixed";

  const salt = opts.salt > 0 ? getSalt(opts.saltType, opts.salt) : null;
  const dictionary =
    typeof opts.dictionary === "object" && opts.dictionary !== null
      ? opts.dictionary
      : opts.dictionary
      ? data[opts.dictionary]
      : data.default;

  return getPattern(opts.words)
    .map((type) => randomFromArray(dictionary[type]))
    .concat([salt])
    .filter(Boolean)
    .join(opts.separator);
}
