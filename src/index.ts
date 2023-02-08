import { generate } from "./generate";
import { getDict, getDictFile } from "./dict";

export interface Dictionary {
  adjectives: string[];
  nouns: string[];
  verbs: string[];
}

export interface Dictionaries {
  reserved: string[];
  default: Dictionary;
  rugged: Dictionary;
}

export interface SubdomainOptions {
  reserved?: boolean | string[];
}

export const data: Dictionaries = {
  reserved: getDictFile("reserved.txt"),
  default: getDict("default"),
  rugged: getDict("rugged"),
};

function valid_subdomain(name: string, opts: SubdomainOptions = {}): boolean {
  const result = /^[\w](?:[\w-]{0,61}[\w])?$/.test(name);

  if (opts.reserved) {
    const strippedName = name.replace(/[^a-zA-Z0-9]/, "");
    const reservedWords = Array.isArray(opts.reserved)
      ? opts.reserved
      : data.reserved;

    return result && reservedWords.indexOf(strippedName) === -1;
  }

  return result;
}

export default {
  generate,
  getDict,
  getDictFile,
  valid_subdomain,
  rawData: data as Dictionaries,

  /* deprecated methods */
  validate: (name: string, opts?: any) => {
    console.log("namor: `validate` has been renamed to `valid_subdomain`");
    return valid_subdomain(name, opts);
  },
};
