set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "Items" (
  "itemId" serial PRIMARY KEY,
  "name" text,
  "price" integer,
  "salePrice" integer,
  "photoUrl" text,
  "description" text,
  "quantity" integer,
  "cardTag" text,
  "itemType" text,
  "createdAt" timestamptz
);

CREATE TABLE "Users" (
  "userId" serial PRIMARY KEY,
  "username" varchar unique,
  "hashedPassword" text,
  "createdAt" timestamptz
);

CREATE TABLE "Cart" (
  "cartId" serial PRIMARY KEY,
  "userId" integer,
  "itemId" integer,
  "quantity" integer
);

CREATE TABLE "Favorites" (
  "favoriteId" serial PRIMARY KEY,
  "itemId" integer,
  "userId" integer
);

ALTER TABLE "Cart" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("userId");

ALTER TABLE "Cart" ADD FOREIGN KEY ("itemId") REFERENCES "Items" ("itemId");

ALTER TABLE "Favorites" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("userId");

ALTER TABLE "Favorites" ADD FOREIGN KEY ("itemId") REFERENCES "Items" ("itemId");
