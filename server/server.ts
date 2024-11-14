/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

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

// app.post('/api/items', async (req, res, next) => {
//   try {
//     const sql = `
//     insert into "Items" ("name", "price", "photoUrl", "description", "quantity", "stock")
// values ('Pokeball 10 Pack', 1900, 'pokeball.png','An essential part of any trainers bag. Helps you effectively catch pokémon.', 10, 1000),
//        ('Hyper Potion', 1500, 'hyper-potion.png', 'This potion heals 200hp and is an essential part of any trainers journey to ensure that their pokemon stay safe and strong for whatever explorations you and your Pokémon embark on.', 1, 1000),
//        ('Razz Berry', 200, 'razz-berry-3.png', 'This delicious berry attracts almost any Pokémon and it increases your chances to catch a Pokémon. This can also be a nice treat for you and your pokemon.', 3, 1000)
// returning *
//     `;
//     const result = await db.query(sql);
//     if (!result) throw new ClientError(404, 'item not found');
//     const items = result.rows;
//     res.status(201).json(items);
//   } catch (err) {
//     next(err);
//   }
// });
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
