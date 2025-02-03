import { Book, BookStore } from '../../models/book';
import { app } from '../../server';
import { create, destroy, index, show } from '../books';
import request from 'supertest';

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
      throw new Error(`Could not create user. Error: ${err}`);
    }
  });

  it('should have an index function expression', () => {
    expect(index).toBeDefined();
  });

  it('should have an show function expression', () => {
    expect(show).toBeDefined();
  });

  it('should have an create function expression', () => {
    expect(create).toBeDefined();
  });

  it('should have an delete function expression', () => {
    expect(destroy).toBeDefined();
  });

  it('API books get json and status 200', () => {
    request(app)
      .get('/books')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('API one book by id get json and status 200', () => {
    request(app)
      .get(`/books/${testBook.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('API create one book and then get json and status 200', () => {
    request(app)
      .post(`/books`)
      .send(
        'title=Wizzard&author=John%20Braun&published_year=15%20pa%C5%BAdziernika%202024&pages=150'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('API one book by id delete json and status 200', () => {
    request(app)
      .delete(`/books/${testBook.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
