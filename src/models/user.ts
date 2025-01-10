import client from '../database';

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UsersModel {
  //POSTGRESQL get all users
  async index(): Promise<User[]> {
    console.log('User Model TEST');
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM Users';
      const result = await conn.query(sql);

      conn.release();
      console.log('User Model TEST 3');

      console.log('User Model TEST 4: ', result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Users. Error: ${err}`);
    }
  }

  //POSTGRESQL get one user with param id
  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM Users WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`);
    }
  }

  //POSTGRESQL create user
  async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO Users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.password,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new User ${u.firstname}. Error: ${err}`);
    }
  }

  //POSTGRESQL login user with params firstname and password
  async login(firstname: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM Users WHERE firstname=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [firstname]);

      const User = result.rows[0];

      conn.release();

      return User;
    } catch (err) {
      throw new Error(`Could not delete User ${firstname}. Error: ${err}`);
    }
  }

  //POSTGRESQL delete user with param id
  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM Users WHERE id=($1)';

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
