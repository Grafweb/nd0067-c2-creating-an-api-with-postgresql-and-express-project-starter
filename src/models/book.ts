import client from '../database';

export type Book = {
  id?: number;
  title: string;
  author: string;
  type: string;
  published_year: string;
  pages: number;
  price: number;
};

export class BookStore {
  //POSTGRESQL get all books
  async index(): Promise<Book[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM books';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }

  //POSTGRESQL get one book with param id
  async show(id: string): Promise<Book> {
    try {
      const sql = 'SELECT * FROM books WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }

  //POSTGRESQL create book
  async create(b: Book): Promise<Book> {
    try {
      const sql =
        'INSERT INTO books (title, author, type, pages, published_year, price) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [
        b.title,
        b.author,
        b.type,
        b.pages,
        b.published_year,
        b.price,
      ]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not add new book ${b.title}. Error: ${err}`);
    }
  }

  //POSTGRESQL delete book with param id
  async delete(id: string): Promise<Book> {
    try {
      const sql = 'DELETE FROM books WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }
}
