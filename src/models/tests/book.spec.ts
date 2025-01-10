import { Book, BookStore } from '../book';

const store = new BookStore();

describe('Book Store Model', () => {
  let id: number | string = 0;

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
    (id as number) += 1;
    await store.create(sample);
  });

  afterAll(function () {
    id = 0;
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
    const result = await store.index();
    expect(result).toEqual([{ id: 1, ...sample }]);
  });

  it('show method shold return a product', async () => {
    const result = await store.show(id.toString());

    expect(result).toEqual({
      id: id as number,
      ...sample,
    });
  });

  it('create method should add a book', async () => {
    expect(sample).toEqual(sample);
  });
});
