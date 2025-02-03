import { Book, BookStore } from '../models/book';
import express, { Request, Response } from 'express';

const store = new BookStore();

//API get all books
export const index = async (_req: Request, res: Response) => {
  try {
    const books = await store.index();
    res.json(books);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//API get one book with param id
export const show = async (req: Request, res: Response) => {
  try {
    const book = await store.show(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//API create book
export const create = async (req: Request, res: Response) => {
  try {
    const book: Book = {
      title: req.body.title,
      author: req.body.author,
      type: req.body.type,
      published_year: req.body.published_year,
      pages: req.body.pages,
      price: req.body.price,
    };

    const newBook = await store.create(book);
    res.json(newBook);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//API delete book with param id
export const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//set api for books
const booksRoutes = (app: express.Application) => {
  app.get('/books', index);
  app.get('/books/:id', show);
  app.post('/books', create);
  app.delete('/books/:id', destroy);
};

export default booksRoutes;
