import { User, UsersModel } from '../../models/user';
import { app } from '../../server';
import { create, destroy, index, show } from '../users';
import request from 'supertest';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const userModel = new UsersModel();

const token: string = jwt.sign(
  { role: 'user' },
  process.env.TOKEN_SECRET as string
);

describe('User Store Model', () => {
  let sample: User;

  const sampleUser: User = {
    firstname: 'admin',
    lastname: 'admin',
    password: 'test',
  };

  beforeAll(async function () {
    try {
      sample = await userModel.create(sampleUser);
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

  it('API users get json and status 200', () => {
    request(app)
      .get('/users')
      .set('Cookie', [`access_token=${token}`])
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });

  it('API one user by id get json and status 200', () => {
    request(app)
      .get(`/books/${sample.id}`)
      .set('Cookie', [`access_token=${token}`])
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });
});
