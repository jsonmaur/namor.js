import namor from "./index";

test("exports", async () => {
  expect(namor.generate).toBeInstanceOf(Function);
  expect(namor.getDict).toBeInstanceOf(Function);
  expect(namor.getDictFile).toBeInstanceOf(Function);
  expect(namor.valid_subdomain).toBeInstanceOf(Function);

  expect(namor.rawData.reserved).toContain("about");
  expect(namor.rawData.default.adjectives).toContain("aback");
  expect(namor.rawData.default.nouns).toContain("ability");
  expect(namor.rawData.default.verbs).toContain("abash");
  expect(namor.rawData.rugged.adjectives).toContain("abandoned");
  expect(namor.rawData.rugged.nouns).toContain("aggression");
  expect(namor.rawData.rugged.verbs).toContain("alert");

  /* deprecated */
  expect(namor.validate).toBeInstanceOf(Function);
});

test("valid_subdomain()", async () => {
  expect(namor.valid_subdomain("a")).toBe(true);
  expect(namor.valid_subdomain("my-website")).toBe(true);
  expect(namor.valid_subdomain("-my-website")).toBe(false);
  expect(namor.valid_subdomain("my-website-")).toBe(false);
  expect(namor.valid_subdomain("mywebs%ite")).toBe(false);
  expect(namor.valid_subdomain("my$website")).toBe(false);
  expect(namor.valid_subdomain("$mywebsite")).toBe(false);
  expect(namor.valid_subdomain("mywebsite!")).toBe(false);
  expect(namor.valid_subdomain("my website")).toBe(false);
  expect(
    namor.valid_subdomain(
      "mywebsitemywebsitemywebsitemywebsitemywebsitemywebsitemywebsitemywebsite"
    )
  ).toBe(false);
  expect(namor.valid_subdomain("login")).toBe(true);
  expect(namor.valid_subdomain("login", { reserved: true })).toBe(false);
  expect(namor.valid_subdomain("log in", { reserved: true })).toBe(false);
  expect(namor.valid_subdomain("log-in", { reserved: true })).toBe(false);
  expect(namor.valid_subdomain("login", { reserved: ["foobar"] })).toBe(true);
  expect(namor.valid_subdomain("foobar", { reserved: ["foobar"] })).toBe(false);

  /* deprecated */
  expect(namor.validate("a")).toBe(true);
});
