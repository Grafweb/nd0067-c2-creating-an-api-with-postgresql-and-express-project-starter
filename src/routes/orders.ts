import { Order, OrderStore } from '../models/order';
import express, { Request, Response } from 'express';

const store = new OrderStore();

//API get all orders
const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

//API get one order with param id
const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

//API create order
const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id_product: req.body.id_product,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      status: req.body.status,
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//API delete orders with param id
const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};
//set api for orders
const ordersRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.delete('/orders/:id', destroy);
};

export default ordersRoutes;
