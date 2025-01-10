import { User, UsersModel } from '../models/user';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import authorization from '../authorization';
dotenv.config();

const store = new UsersModel();
const saltRounds = 10;

//API get all users
const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};
//API get one user with param id
const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};
//API create user with token
const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: bcrypt.hashSync(req.body.password, saltRounds),
    };

    const newUser = await store.create(user);
    const token: string = jwt.sign(
      { role: 'user' },
      process.env.TOKEN_SECRET as string
    );
    res.cookie('access_token', token, { httpOnly: true });

    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
//API login user with params firstname and password
const login = async (req: Request, res: Response) => {
  try {
    const user: Omit<User, 'lastname'> = {
      firstname: req.body.firstname,
      password: req.body.password,
    };

    const loginUser = await store.login(user.firstname);
    const compareSync = bcrypt.compareSync(user.password, loginUser.password);
    if (compareSync) {
      const token: string = jwt.sign(
        { role: 'user' },
        process.env.TOKEN_SECRET as string
      );

      res.cookie('access_token', token, { httpOnly: true });
      res.json(loginUser);
    } else {
      res.status(401);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//API delete user with param id
const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

//set api for users
const usersRoutes = (app: express.Application) => {
  app.get('/users', authorization, index);
  app.get('/users/:id', authorization, show);
  app.post('/users', create);
  app.post('/users', login);
  app.delete('/users/:id', authorization, destroy);
};

export default usersRoutes;