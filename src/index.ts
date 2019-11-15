import data from "./_data"
import generate from "./generate"
import validate from "./validate"

interface DataManly {
	adjectives: string[]
	nouns: string[]
	verbs: string[]
}

interface Data {
	adjectives: string[]
	nouns: string[]
	verbs: string[]
	reserved: string[]
	manly: DataManly
}

export = {
	generate,
	validate,

	rawData: data as Data,

	/* deprecated methods */
	isValid: (name: string, opts?: any) => {
		console.log("namor: `isValid` has been renamed to `validate`")
		return validate(name, opts)
	},
}
