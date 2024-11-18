-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "Items" ("name", "price", "photoUrl", "description", "quantity", "stock")
values ('Pokeball', 100, 'pokeball.png', 'An essential part of any trainers bag. Helps you effectively catch pokémon.', 1, 1000),
       ('Great Ball', 600, 'greatball.png', 'An upgraded, more effective version of the Pokéball that gives you an edge in performance when you are trying to catch em all.', 1,1000),
       ('Ultra Ball', 1600, 'ultraball.png', 'the most refined Pokéball with the highest performance for any situation that is thrown your way.', 1, 1000),
       ('Fire Stone', 2100, 'firestone.png', 'lets you evolve certain fire type Pokémon to give your partner a boost in their evolution and training journey.', 1, 1000),
       ('Water Stone', 2100, 'waterstone.png', 'lets you evolve certain water type Pokémon to give your partner a boost in their evolution and training journey.', 1, 1000),
       ('Leaf Stone', 2100, 'leafstone.png', 'lets you evolve certain grass type Pokémon to give your partner a boost in their evolution and training journey.', 1, 1000),
       ('Dusk Stone', 2100, 'duskstone.png', 'lets you evolve certain dark type Pokémon to give your partner a boost in their evolution and training journey.', 1, 1000),
       ('Pokeball 10 Pack', 1900, 'pokeball.png','An essential part of any trainers bag. Helps you effectively catch pokémon.', 10, 1000),
       ('Hyper Potion', 1500, 'hyper-potion.png', 'This potion heals 200hp and is an essential part of any trainers journey to ensure that their pokemon stay safe and strong for whatever explorations you and your Pokémon embark on.', 1, 1000),
       ('Razz Berry 3 Pack', 200, 'razz-berry-3.png', 'This delicious berry attracts almost any Pokémon and it increases your chances to catch a Pokémon. This can also be a nice treat for you and your pokemon.', 3, 1000)
returning *
