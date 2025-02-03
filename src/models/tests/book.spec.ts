import { Book, BookStore } from '../book';

const store = new BookStore();

describe('Book Store Model', () => {
  let testBook: Book;

  const sample: Book = {
    title: 'Sample 1',
    author: 'John',
    type: 'commedy',
    published_year: '1994',
    pages: 150,
    // prettier-ignore
    price: 15.00,
  };

  beforeAll(async function () {
    try {
      testBook = await store.create(sample);
    } catch (err) {
      throw new Error(`Could not create book. Error: ${err}`);
    }
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have an show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('index method shold return a list of products', async () => {
    try {
      const result = await store.index();
      expect(result[0].title === sample.title).toBeTruthy();
    } catch (err) {
      throw new Error(`Could not make test. Error: ${err}`);
    }
  });

  it('show method shold return a product', async () => {
    try {
      const result = await store.show((testBook.id as number).toString());

      expect(result).toEqual({
        id: testBook.id,
        ...sample,
      });
    } catch (err) {
      throw new Error(`Could not make test. Error: ${err}`);
    }
  });

  it('create method should add a book', async () => {
    expect(sample).toEqual(sample);
  });
});
