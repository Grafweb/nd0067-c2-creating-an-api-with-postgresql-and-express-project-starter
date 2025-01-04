import express, { Request, Response } from 'express'
import booksRoutes from './routes/books'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import usersRoutes from './routes/users'
import ordersRoutes from './routes/orders'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

booksRoutes(app)
usersRoutes(app)
ordersRoutes(app)