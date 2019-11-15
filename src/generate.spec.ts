import * as generate from "./generate"

test("randomFromArray()", async () => {
	const arr = ["one", "two", "three", "four", "five"]
	const rand = generate.randomFromArray(arr)
	expect(arr.indexOf(rand)).toBeGreaterThan(-1)
})

test("getPattern()", async () => {
	expect(generate.getPattern()).toHaveLength(2)
	expect(generate.getPattern(2)).toHaveLength(2)
	expect(generate.getPattern(3)).toHaveLength(3)
})

test("getSalt()", async () => {
	const str = generate.getSalt("string", 5)
	const num = generate.getSalt("number", 5)
	expect(str).toHaveLength(5)
	expect(str).toMatch(/^[a-z]*$/)
	expect(num).toHaveLength(5)
	expect(num).toMatch(/^[0-9]*$/)
})

it("default()", () => {
	expect(generate.default({ words: 0 })).toMatch(/^[a-z0-9]*$/)
	expect(generate.default()).toMatch(/^[a-z]*-[a-z]*-[a-z0-9]{5}$/)
	expect(generate.default({ words: 1 })).toMatch(/^[a-z]*-[a-z0-9]{5}$/)
	expect(generate.default({ words: 2 })).toMatch(
		/^[a-z]*-[a-z]*-[a-z0-9]{5}$/,
	)
	expect(generate.default({ words: 3 })).toMatch(
		/^[a-z]*-[a-z]*-[a-z]*-[a-z0-9]{5}$/,
	)
	expect(generate.default({ words: 4 })).toMatch(
		/^[a-z]*-[a-z]*-[a-z]*-[a-z]*-[a-z0-9]{5}$/,
	)
	expect(() => generate.default({ words: 5 })).toThrow(TypeError)
	expect(generate.default({ saltLength: 0 })).toMatch(/^[a-z]*-[a-z]*$/)
	expect(generate.default({ saltLength: 1 })).toMatch(
		/^[a-z]*-[a-z]*-[a-z0-9]{1}$/,
	)
	expect(generate.default({ saltLength: 20 })).toMatch(
		/^[a-z]*-[a-z]*-[a-z0-9]{20}$/,
	)
	expect(generate.default({ saltType: "number" })).toMatch(
		/^[a-z]*-[a-z]*-[0-9]{5}$/,
	)
	expect(generate.default({ saltType: "string" })).toMatch(
		/^[a-z]*-[a-z]*-[a-z]{5}$/,
	)
	expect(generate.default({ words: 1, saltLength: 0 })).toMatch(/^[a-z]*$/)
	expect(generate.default({ subset: "manly" })).toMatch(
		/^[a-z]*-[a-z]*-[a-z0-9]{5}$/,
	)
	expect(generate.default({ separator: "_" })).toMatch(
		/^[a-z]*_[a-z]*_[a-z0-9]{5}$/,
	)
	expect(() => generate.default({ saltLength: 60 })).toThrow(Error)
	/* deprecated */
	expect(generate.default({ char: "_", numbers: 2, manly: true })).toMatch(
		/^[a-z]*_[a-z]*_[0-9]{2}$/,
	)
})
