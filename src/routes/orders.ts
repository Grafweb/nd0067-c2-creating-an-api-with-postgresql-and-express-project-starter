import { Order, OrderStore } from '../models/order';
import express, { Request, Response } from 'express';

const store = new OrderStore();

//API get all orders
export const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//API get one order with param id
export const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//API get all order products with param id
export const show_order_products = async (req: Request, res: Response) => {
  try {
    const order_products = await store.show_order_products(req.params.id);
    res.json(order_products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//API create order
export const create = async (req: Request, res: Response) => {
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
export const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//set api for orders
const ordersRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.get('/orders/products/:id', show_order_products);
  app.post('/orders', create);
  app.delete('/orders/:id', destroy);
};

export default ordersRoutes;
