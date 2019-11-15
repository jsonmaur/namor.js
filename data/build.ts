import fs from "fs"
import syspath from "path"

function readWordFile(
	wordType: "adjectives" | "nouns" | "verbs" | "reserved",
	subsetType: "default" | "manly",
): string[] {
	const file = syspath.resolve(__dirname, `${subsetType}/${wordType}.txt`)

	let duplicateCount = 0
	const wordCheck: string[] = []

	const words: string[] = fs
		.readFileSync(file, "utf-8")
		.trim()
		.split("\n")
		.map((word) => {
			if (wordCheck.indexOf(word) > -1) {
				duplicateCount++
			} else {
				wordCheck.push(word)
			}

			return word.trim()
		})

	if (duplicateCount > 0) {
		console.log(
			`Warning: ${duplicateCount} duplicate word(s) found in ${file}`,
		)
	}

	return words
}

const data = {
	adjectives: readWordFile("adjectives", "default"),
	nouns: readWordFile("nouns", "default"),
	verbs: readWordFile("verbs", "default"),
	reserved: readWordFile("reserved", "default"),
	manly: {
		adjectives: readWordFile("adjectives", "manly"),
		nouns: readWordFile("nouns", "manly"),
		verbs: readWordFile("verbs", "manly"),
	},
}

const output = syspath.resolve(__dirname, "../src/_data.ts")
fs.writeFileSync(output, `export = JSON.parse(\`${JSON.stringify(data)}\`)`)
