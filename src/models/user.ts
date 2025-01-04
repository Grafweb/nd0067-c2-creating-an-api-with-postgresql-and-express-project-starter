import client from "../database";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UsersModel {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM Users";
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM Users WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO Users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.password,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new User ${u.firstName}. Error: ${err}`);
    }
  }

  async login(firstName: string): Promise<User> {
    try {
      const sql = "SELECT * FROM Users WHERE firstName=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [firstName]);

      const User = result.rows[0];

      conn.release();

      return User;
    } catch (err) {
      throw new Error(`Could not delete User ${firstName}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM Users WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const User = result.rows[0];

      conn.release();

      return User;
    } catch (err) {
      throw new Error(`Could not delete User ${id}. Error: ${err}`);
    }
  }
}
