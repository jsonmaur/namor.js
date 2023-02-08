import path from "path";
import { getDict } from "./dict";
import { randomFromArray, getPattern, getSalt, generate } from "./generate";

test("randomFromArray()", async () => {
  const arr = ["one", "two", "three", "four", "five"];
  const rand = randomFromArray(arr);
  expect(arr.indexOf(rand)).toBeGreaterThan(-1);
});

test("getPattern()", async () => {
  expect(getPattern()).toHaveLength(2);
  expect(getPattern(1)).toHaveLength(1);
  expect(getPattern(2)).toHaveLength(2);
  expect(getPattern(3)).toHaveLength(3);
});

test("getSalt()", async () => {
  const str = getSalt("letters", 5);
  const num = getSalt("numbers", 5);
  expect(str).toHaveLength(5);
  expect(str).toMatch(/^[a-z]*$/);
  expect(num).toHaveLength(5);
  expect(num).toMatch(/^[0-9]*$/);
  /* deprecations */
  // @ts-ignore
  expect(getSalt("string", 5)).toHaveLength(5);
  // @ts-ignore
  expect(getSalt("number", 5)).toHaveLength(5);
});

it("generate()", () => {
  expect(generate({ words: 0 })).toMatch(/^[a-z]*$/);
  expect(generate({ salt: 5 })).toMatch(/^[a-z]*-[a-z]*-[a-z0-9]{5}$/);
  expect(generate()).toMatch(/^[a-z]*-[a-z]*$/);
  expect(generate({ words: 1 })).toMatch(/^[a-z]*$/);
  // @ts-ignore
  expect(generate({ words: "1" })).toMatch(/^[a-z]*$/);
  expect(generate({ words: 2 })).toMatch(/^[a-z]*-[a-z]*$/);
  expect(generate({ words: 3 })).toMatch(/^[a-z]*-[a-z]*-[a-z]*$/);
  expect(generate({ words: 4 })).toMatch(/^[a-z]*-[a-z]*-[a-z]*-[a-z]*$/);
  expect(() => generate({ words: 5 })).toThrow(TypeError);
  expect(generate({ salt: 0 })).toMatch(/^[a-z]*-[a-z]*$/);
  expect(generate({ salt: 1 })).toMatch(/^[a-z]*-[a-z]*-[a-z0-9]{1}$/);
  // @ts-ignore
  expect(generate({ salt: "1" })).toMatch(/^[a-z]*-[a-z]*-[a-z0-9]{1}$/);
  expect(generate({ salt: 20 })).toMatch(/^[a-z]*-[a-z]*-[a-z0-9]{20}$/);
  expect(generate({ salt: 5, saltType: "numbers" })).toMatch(
    /^[a-z]*-[a-z]*-[0-9]{5}$/
  );
  expect(generate({ salt: 5, saltType: "letters" })).toMatch(
    /^[a-z]*-[a-z]*-[a-z]{5}$/
  );
  expect(generate({ dictionary: "rugged" })).toMatch(/^[a-z]*-[a-z]*$/);
  expect(
    generate({
      dictionary: getDict("default", path.resolve(__dirname, "../dict")),
    })
  ).toMatch(/^[a-z]*-[a-z]*$/);
  expect(generate({ separator: "_" })).toMatch(/^[a-z]*_[a-z]*$/);
  /* deprecated */
  expect(generate({ saltLength: 0 })).toMatch(/^[a-z]*-[a-z]*$/);
  expect(generate({ saltLength: 5 })).toMatch(/^[a-z]*-[a-z]*-[a-z0-9]{5}$/);
  // @ts-ignore
  expect(generate({ saltType: "number" })).toMatch(/^[a-z]*-[a-z]*$/);
  // @ts-ignore
  expect(generate({ saltType: "string" })).toMatch(/^[a-z]*-[a-z]*$/);
  // @ts-ignore
  expect(generate({ subset: "manly" })).toMatch(/^[a-z]*-[a-z]*$/);
});
