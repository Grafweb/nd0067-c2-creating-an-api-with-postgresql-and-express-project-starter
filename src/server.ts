import express from 'express';
import booksRoutes from './routes/books';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import usersRoutes from './routes/users';
import ordersRoutes from './routes/orders';

export const app: express.Application = express();
const address: string = '0.0.0.0:3000';

//Set middleware for cookie
app.use(cookieParser());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with urlencoded payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Set information about port server
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

//Set route api for books
booksRoutes(app);
//Set route api for users
usersRoutes(app);
//Set route api for orders
ordersRoutes(app);
