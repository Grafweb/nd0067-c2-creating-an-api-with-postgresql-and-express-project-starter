import client from "../database";

export enum STATUS {
    ACTIVE = "active",
    COMPLETE = "complete"
}

export type Order = {
  id?: number,
  id_product: number,
  quantity: number,
  user_id: number,
  status: STATUS
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect()
            const sql = "SELECT * FROM orders"
            const result = await conn.query(sql)

            conn.release()
      
            return result.rows 
            
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    
  async show(id: string): Promise<Order> {
    try {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create(b: Order): Promise<Order> {
      try {
    const sql = 'INSERT INTO orders (id_product, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'
    // @ts-ignore
    const conn = await client.connect()
 
    const result = await conn
        .query(sql, [b.id_product, b.quantity, b.user_id, b.status])

    const order = result.rows[0]

    conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not add new order ${b.id_product}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Order> {
      try {
    const sql = 'DELETE FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    const order = result.rows[0]

    conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  }
}