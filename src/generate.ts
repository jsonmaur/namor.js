import crypto from "crypto-extra"
import data from "./_data"

enum Word {
	Adjective = "adjectives",
	Noun = "nouns",
	Verb = "verbs",
}

interface Options {
	words?: number
	separator?: string
	saltType?: "number" | "string" | "mixed"
	saltLength?: number
	subset?: "manly"
	/* deprecated */
	char?: string
	numbers?: number
	manly?: boolean
}

export function randomFromArray(arr: any[]): any {
	return arr[crypto.randomNumber({ max: arr.length - 1 })]
}

export function getPattern(count?: number): Word[] {
	switch (count) {
		case 0:
			return []
		case 1:
			return [Word.Noun]
		case 3:
			return [Word.Adjective, Word.Noun, Word.Verb]
		case 4:
			return [Word.Adjective, Word.Noun, Word.Noun, Word.Verb]
		case 2:
		default:
			return randomFromArray([
				[Word.Adjective, Word.Noun],
				[Word.Noun, Word.Verb],
			])
	}
}

export function getSalt(type: string, length: number): string {
	let charset

	switch (type) {
		case "string":
			charset = "abcdefghijklmnopqrstuvwxyz"
			break
		case "number":
			charset = "0123456789"
			break
		case "mixed":
		default:
			charset = "abcdefghijklmnopqrstuvwxyz0123456789"
	}

	return crypto.randomString(length, charset)
}

export default function(opts: Options = {}) {
	/* deprecations */
	if (opts.char) {
		console.log(
			"namor.generate(): `char` option has been renamed to `separator`",
		)
		opts.separator = opts.char
	}
	if (opts.numbers) {
		console.log(
			"namor.generate(): `numbers` option has been renamed to `saltLength`/`saltType`",
		)
		opts.saltLength = opts.numbers
		opts.saltType = "number"
	}
	if (opts.manly) {
		console.log(
			"namor.generate(): `manly` option is deprecated, use `subset` instead",
		)
		opts.subset = "manly"
	}

	if (opts.words && (opts.words < 1 || opts.words > 4)) {
		throw new TypeError("Word count must be between 1-4")
	}

	opts.separator = opts.separator || "-"
	opts.words = Number(opts.words !== undefined ? opts.words : 2)
	opts.saltType = opts.saltType || "mixed"
	opts.saltLength = Number(
		opts.saltLength !== undefined ? opts.saltLength : 5,
	)

	const dictionary = opts.subset ? data[opts.subset] : data
	const salt =
		opts.saltLength > 0 ? getSalt(opts.saltType, opts.saltLength) : null

	const name = getPattern(opts.words)
		.map((type) => randomFromArray(dictionary[type]))
		.concat([salt])
		.filter(Boolean)
		.join(opts.separator)

	if (name.length > 63) {
		throw new TypeError(
			"Subdomains cannot be longer than 63 characters! Try shortening your trailing salt.",
		)
	}

	return name
}
