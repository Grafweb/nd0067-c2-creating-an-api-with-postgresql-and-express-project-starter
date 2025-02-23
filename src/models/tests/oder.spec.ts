import { Book, BookStore } from '../book';
import { Order, OrderStore, STATUS } from '../order';
import { User, UsersModel } from '../user';

const orderModel = new OrderStore();

describe('User Store Model', () => {
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
    quantity: '1',
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
      console.log('sample sample sample');
    } catch (err) {
      throw new Error(`Could not create order and user. Error: ${err}`);
    }
  });

  it('should have an index method', () => {
    expect(orderModel.index).toBeDefined();
  });

  it('should have an show method', () => {
    expect(orderModel.show).toBeDefined();
  });

  it('should have an create method', () => {
    expect(orderModel.create).toBeDefined();
  });

  it('should have an delete method', () => {
    expect(orderModel.delete).toBeDefined();
  });

  it('index method shold return a list of orders', async () => {
    try {
      const result = await orderModel.index();
      expect(
        result[result.length - 1].quantity === sample.quantity
      ).toBeTruthy();
    } catch (err) {
      throw new Error(`Could not make test. Error: ${err}`);
    }
  });

  it('show method shold return a order', async () => {
    try {
      const result = await orderModel.show((sample?.id as number).toString());
      expect(result.quantity === sample.quantity).toBeTruthy();
    } catch (err) {
      throw new Error(`Could not make test. Error: ${err}`);
    }
  });

  it('create method should add a order', () => {
    console.log('sampleOrder.quantity - ', sampleOrder.quantity);
    console.log('sample.quantity - ', sample.quantity);
    console.log(typeof sampleOrder.quantity);
    console.log(typeof sample.quantity);
    expect(sampleOrder.quantity === sample.quantity).toBeTruthy();
  });
});
