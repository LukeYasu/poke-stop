/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { authMiddleware, ClientError, errorMiddleware } from './lib/index.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};
type Auth = {
  username: string;
  password: string;
};

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "Users" ("username", "hashedPassword")
      values ($1, $2)
      returning "userId", "username", "createdAt"
    `;
    const params = [username, hashedPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
    select "userId",
           "hashedPassword"
      from "Users"
     where "username" = $1
  `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.get('/api/items', async (req, res, next) => {
  try {
    const sql = `
select *
from "Items"
`;
    const result = await db.query(sql);
    if (!result) throw new ClientError(404, 'items not found');
    const items = result.rows;
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
});

app.get('/api/items/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params;
    if (!itemId) throw new ClientError(400, `itemId ${itemId} not found`);
    const sql = `
    select *
    from "Items"
    where "itemId" = $1
    `;
    const params = [itemId];
    const result = await db.query(sql, params);
    if (!result) throw new ClientError(404, 'item not found');
    const item = result.rows[0];
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

app.put('/api/items/:itemId', async (req, res, next) => {
  try {
    const { name } = req.body;
    const { itemId } = req.params;
    const sql = `
    update "Items"
    set "name" = $1
    where "itemId" = $2
    returning *
    `;
    const params = [name, itemId];
    const result = await db.query(sql, params);
    if (!result) throw new ClientError(404, 'item not found');
    const item = result.rows[0];
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

app.get('/api/cart-items', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
    select *
    from "Cart"
    where "userId" = $1
    `;
    const params = [req.user?.userId];
    const result = await db.query(sql, params);
    if (!result) throw new ClientError(404, 'item not found');
    const item = result.rows;
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

app.post('/api/cart-items', authMiddleware, async (req, res, next) => {
  try {
    const { itemId, quantity } = req.body;
    const sql = `
    insert into "Cart" ("userId", "itemId", "quantity")
    values ($1, $2, $3)
    returning *
    `;
    const params = [req.user?.userId, itemId, quantity];
    const result = await db.query(sql, params);
    if (!result) throw new ClientError(404, 'item not found');
    const item = result.rows;
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

app.put('/api/cart-items', authMiddleware, async (req, res, next) => {
  try {
    const { itemId, quantity } = req.body;
    const sql = `
    update "Cart"
    set "quantity" = $1
    where "itemId" = $2 and "userId" = $3
    `;
    const params = [quantity, itemId, req.user?.userId];
    const result = await db.query(sql, params);
    if (!result) throw new ClientError(404, 'item not found');
    const item = result.rows;
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

app.delete(
  '/api/cart-items/:itemId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const sql = `
    delete
    from "Cart"
    where "itemId" = $1 and "userId" = $2
    returning *
    `;
      const params = [itemId, req.user?.userId];
      const result = await db.query(sql, params);
      const deletedItem = result.rows[0];
      if (!deletedItem) throw new ClientError(404, 'no item');
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

app.get('/api/favorites', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
    select *
    from "Favorites"
    join "Items" using ("itemId")
    where "userId" = $1
    `;
    const params = [req.user?.userId];
    const result = await db.query(sql, params);
    if (!result) throw new ClientError(404, 'Favorites not found');
    const favItems = result.rows;
    res.status(200).json(favItems);
  } catch (err) {
    next(err);
  }
});

app.post('/api/favorites/:itemId', authMiddleware, async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const sql = `
    insert into "Favorites" ("userId", "itemId")
    values($1, $2)
    returning *
    `;
    const params = [req.user?.userId, itemId];
    const result = await db.query(sql, params);
    if (!result) throw new ClientError(404, 'favorite item not found');
    const favItem = result.rows[0];
    res.status(201).json(favItem);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/favorites/:itemId', authMiddleware, async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const sql = `
    delete
    from "Favorites"
    where "userId" = $1 and "itemId" = $2
    returning *
    `;
    const params = [req.user?.userId, itemId];
    const result = await db.query(sql, params);
    if (!result) throw new ClientError(404, 'favorite item not found');
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

/*
 * Handles paths that aren't handled by any other route handler.
 * It responds with `index.html` to support page refreshes with React Router.
 * This must be the _last_ route, just before errorMiddleware.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
