import { Book, BookStore } from "../models/book"
import express, { Request, Response } from 'express'


const store = new BookStore()

const index = async (_req: Request, res: Response) => {
  const books = await store.index()
  res.json(books)
}

const show = async (req: Request, res: Response) => {
   const book = await store.show(req.params.id)
   res.json(book)
}
const create = async (req: Request, res: Response) => {
    try {
        const book: Book = {
            title: req.body.title,
            author: req.body.author,
            type: req.body.type,
            published_year: req.body.published_year,
            pages: req.body.pages,
            price: req.body.price
        }

        const newBook = await store.create(book)
        res.json(newBook)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const booksRoutes = (app: express.Application) => {
  app.get('/books', index)
  app.get('/books/:id', show)
  app.post('/books', create)
  app.delete('/books/:id', destroy)
}

export default booksRoutes