## API Endpoints

#### Products

- list of products GET http://localhost:3000/books
- show one product ID type number GET http://localhost:3000/books/ID
- Create product POST http://localhost:3000/books
  params BODY:
  title: string
  author: string,
  type: string,
  published_year: string,
  pages: number,
  price: number
- remove product DELETE ID type number http://localhost:3000/books/ID

#### Users

- list of users GET http://localhost:3000/users
- show one user ID type number GET http://localhost:3000/users/ID
- Create user (create token) POST http://localhost:3000/users
  params BODY:
  firstname: string
  lastname: string,
  password: string
- Login user (create token) POST http://localhost:3000/users
  params BODY:
  firstname: string,
  password: string
- remove user DELETE ID type number http://localhost:3000/users/ID

#### Orders

- list of orders GET http://localhost:3000/orders
- show one order ID type number GET http://localhost:3000/orders/ID
- Create order POST http://localhost:3000/orders
  params BODY:
  firstname: string
  lastname: string,
  password: string
- remove order DELETE ID type number http://localhost:3000/orders/ID


## DATABASE Schema

table books
  id SERIAL PRIMARY KEY,
  title varchar(255),
  author varchar(255),
  type varchar(255),
  published_year varchar(255),
  pages int,
  price float

table users
  id SERIAL PRIMARY KEY,
  firstname varchar(255),
  lastname varchar(255),
  password varchar(255)

table orders
  id SERIAL PRIMARY KEY,
  id_product int,
  quantity int,
  user_id int,
  status varchar(255),
  CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id)
