import * as namor from "./index"

test("exports", async () => {
	expect(namor.generate).toBeInstanceOf(Function)
	expect(namor.validate).toBeInstanceOf(Function)
	expect(namor.rawData.adjectives).toBeTruthy()
	expect(namor.rawData.nouns).toBeTruthy()
	expect(namor.rawData.verbs).toBeTruthy()
	expect(namor.rawData.reserved).toBeTruthy()
	expect(namor.rawData.manly).toBeTruthy()
	/* deprecated */
	expect(namor.isValid("abc")).toBe(true)
})
