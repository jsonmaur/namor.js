import * as dict from "./dict";

test("getDict()", async () => {
  const defaultDict = dict.getDict("default");

  expect(defaultDict.adjectives).toContain("aback");
  expect(defaultDict.nouns).toContain("ability");
  expect(defaultDict.verbs).toContain("abash");
});

test("getDictFile()", async () => {
  expect(dict.getDictFile("reserved.txt")).toContain("about");
});
