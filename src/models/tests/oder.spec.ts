import { Order, OrderStore, STATUS } from '../order';

const orderModel = new OrderStore();

describe('User Store Model', () => {
  let id: number | string = 0;

  let sample: Order;

  const sampleOrder: Order = {
    id_product: 1,
    quantity: 1,
    user_id: 1,
    status: STATUS.ACTIVE,
  };

  beforeAll(async function () {
    (id as number) += 1;
    sample = await orderModel.create(sampleOrder);
    console.log('result :', sample);
  });

  afterAll(function () {
    id = 0;
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
    const result = await orderModel.index();
    console.log('result from test :', result);
    expect(result).toEqual([{ id: 1, ...sample }]);
  });

  it('show method shold return a order', async () => {
    const result = await orderModel.show(id.toString());

    expect(result).toEqual({
      id: id as number,
      ...sample,
    });
  });

  it('create method should add a order', () => {
    expect({
      id: id as number,
      ...sampleOrder,
    }).toEqual({
      id: id as number,
      ...sample,
    });
  });
});
