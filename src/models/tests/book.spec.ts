import { BookStore } from "../book";

const store = new BookStore();

describe("Book Store Model", () => {
  it("should have an index method", () => {
    expect(store.index()).toBeDefined();
  });

  it("index method shold return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
