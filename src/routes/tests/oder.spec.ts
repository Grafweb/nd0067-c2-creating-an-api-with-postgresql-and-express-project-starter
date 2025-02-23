import { Order, OrderStore, STATUS } from '../../models/order';
import { app } from '../../server';
import { create, destroy, index, show } from '../orders';
import request from 'supertest';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User, UsersModel } from '../../models/user';
import { Book, BookStore } from '../../models/book';
dotenv.config();

const orderModel = new OrderStore();

const token: string = jwt.sign(
  { role: 'user' },
  process.env.TOKEN_SECRET as string
);

describe('Order Store Model', () => {
  let sample: Order;

  const userModel = new UsersModel();

  const store = new BookStore();

  const sampleBook: Book = {
    title: 'Sample 1',
    author: 'John',
    type: 'commedy',
    published_year: '1994',
    pages: 150,
    // prettier-ignore
    price: 15.00,
  };

  const sampleOrder: Order = {
    id_product: 1,
    quantity: 1,
    user_id: 1,
    status: STATUS.ACTIVE,
  };

  const sampleUser: User = {
    firstname: 'admin',
    lastname: 'admin',
    password: 'test',
  };

  beforeAll(async function () {
    try {
      await store.create(sampleBook);
      await userModel.create(sampleUser);
      sample = await orderModel.create(sampleOrder);
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
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

  it('API orders get json and status 200', () => {
    request(app)
      .get('/orders')
      .set('Cookie', [`access_token=${token}`])
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });

  it('API one order by id get json and status 200', () => {
    request(app)
      .get(`/orders/${sample.id}`)
      .set('Cookie', [`access_token=${token}`])
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });

  it('API create order and then json and status 200', () => {
    request(app)
      .post(`/orders`)
      .send('quantity=1&user_id=1&status=active')
      .set('Cookie', [`access_token=${token}`])
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });

  it('API one order by id delete json and status 200', () => {
    request(app)
      .delete(`/orders/${sample.id}`)
      .set('Cookie', [`access_token=${token}`])
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });
});
