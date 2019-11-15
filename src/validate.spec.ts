import * as validate from "./validate"

test("default()", async () => {
	expect(validate.default("a")).toBe(true)
	expect(validate.default("my-website")).toBe(true)
	expect(validate.default("-my-website")).toBe(false)
	expect(validate.default("my-website-")).toBe(false)
	expect(validate.default("mywebs%ite")).toBe(false)
	expect(validate.default("my$website")).toBe(false)
	expect(validate.default("$mywebsite")).toBe(false)
	expect(validate.default("mywebsite!")).toBe(false)
	expect(validate.default("my website")).toBe(false)
	expect(
		validate.default(
			"mywebsitemywebsitemywebsitemywebsitemywebsitemywebsitemywebsitemywebsite",
		),
	).toBe(false)
	expect(validate.default("login")).toBe(true)
	expect(validate.default("login", { reserved: true })).toBe(false)
	expect(validate.default("authentication", { reserved: true })).toBe(false)
})
