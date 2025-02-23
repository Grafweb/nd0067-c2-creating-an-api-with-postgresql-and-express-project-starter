import client from '../database';

export enum STATUS {
  ACTIVE = 'active',
  COMPLETE = 'complete',
}

export type Order = {
  id?: number;
  id_product: number | string;
  quantity: number | string;
  user_id: number;
  status: STATUS;
};

export type OrderProducts = {
  id_product: number;
  id_order: number;
  quantity: number;
};

export class OrderStore {
  //POSTGRESQL get all orders
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  //POSTGRESQL get one order with param id
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  //POSTGRESQL get one order with param id
  async show_order_products(id: string): Promise<OrderProducts[]> {
    try {
      const sql = 'SELECT * FROM order_products WHERE id_order=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  //POSTGRESQL create order
  async create(b: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (id_product, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';

      const sql_order_products =
        'INSERT INTO order_products (id_product, id_order, quantity) VALUES($1, $2, $3) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [
        b.id_product,
        b.quantity,
        b.user_id,
        b.status,
      ]);

      const order = result.rows[0];
      const id_product = b.id_product.toString();
      const quantity = b.quantity.toString();
      if (id_product.includes(',') && quantity.includes(',')) {
        const quantities = quantity.split(',');
        id_product.split(',').forEach(async (product_id, idx) => {
          await conn.query(sql_order_products, [
            product_id,
            order.id,
            quantities[idx],
          ]);
        });
      }

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${b.id_product}. Error: ${err}`);
    }
  }

  //POSTGRESQL delete order with param id
  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      //
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
