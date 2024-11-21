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
values ('Poké Ball', 100, 'pokeball.png', 'An essential part of any trainers bag. Helps you effectively catch pokémon.', 1, 1000),
       ('Great Ball', 600, 'greatball.png', 'An upgraded, more effective version of the Pokéball that gives you an edge in performance when you are trying to catch em all.', 1,1000),
       ('Ultra Ball', 1600, 'ultraball.png', 'the most refined Pokéball with the highest performance for any situation that is thrown your way.', 1, 1000),
       ('Fire Stone', 2100, 'firestone.png', 'lets you evolve certain fire type Pokémon to give your partner a boost in their evolution and training journey.', 1, 1000),
       ('Water Stone', 2100, 'waterstone.png', 'lets you evolve certain water type Pokémon to give your partner a boost in their evolution and training journey.', 1, 1000),
       ('Leaf Stone', 2100, 'leafstone.png', 'lets you evolve certain grass type Pokémon to give your partner a boost in their evolution and training journey.', 1, 1000),
       ('Dusk Stone', 2100, 'duskstone.png', 'lets you evolve certain dark type Pokémon to give your partner a boost in their evolution and training journey.', 1, 1000),
       ('Poké Ball 10 Pack', 900, 'pokeball.png','An essential part of any trainers bag. Helps you effectively catch pokémon.', 10, 1000),
       ('Great Ball 10 Pack', 5900, 'greatball.png','An essential part of any trainers bag. Helps you effectively catch pokémon.', 10, 1000),
       ('Ultra Ball 10 Pack', 15000, 'ultraball.png','An essential part of any trainers bag. Helps you effectively catch pokémon.', 10, 1000),
       ('Hyper Potion', 1500, 'hyper-potion.png', 'This potion heals 200hp and is an essential part of any trainers journey to ensure that their pokémon stay safe and strong for whatever explorations you and your Pokémon embark on.', 1, 1000),
       ('Razz Berry 3 Pack', 200, 'razz-berry-3.png', 'This delicious berry attracts almost any Pokémon and it increases your chances to catch a Pokémon. This can also be a nice treat for you and your pokémon.', 3, 1000),
       ('Dusk Ball', 1000, 'duskball.png', 'A Poké Ball that allows you to increase your chances of capturing pokémon at night or in dark places like caves.', 1, 1000),
       ('Level Ball', 1000, 'levelball.png', 'A Poké Ball that allows you to increase your chances of capturing pokémon dependant on the levels of both your Pokémon and the opponent Pokémon.', 1, 1000),
       ('Lure Ball', 1000, 'lureball.png', 'A Poké Ball that allows you to increase your chances of capturing pokémon that have been hooked with a Fishing Rod.', 1, 1000),
       ('Moon Ball', 1000, 'moonball.png', 'A Poké Ball that allows you to increase your chances of capturing pokémon that evolve with the MoonStone.', 1, 1000),
       ('Potion', 200, 'potion.png', 'This potion heals 20hp and is an essential part of any trainers journey to ensure that their pokémon stay safe and strong for whatever explorations you and your Pokémon embark on.', 1, 1000),
       ('Potion 10 Pack', 1900, 'potion.png', 'This potion heals 20hp and is an essential part of any trainers journey to ensure that their pokémon stay safe and strong for whatever explorations you and your Pokémon embark on.', 10, 1000),
       ('Super Potion', 400, 'superpotion.png', 'This potion heals 50hp and is an essential part of any trainers journey to ensure that their pokémon stay safe and strong for whatever explorations you and your Pokémon embark on.', 1, 1000),
       ('Max Potion', 2500, 'maxpotion.png', 'This potion heals to full HP and is an essential part of any trainers journey to ensure that their pokémon stay safe and strong for whatever explorations you and your Pokémon embark on.', 1, 1000),
       ('Revive', 1000, 'revive.png', 'An essential item that can recover your fainted pokémon in the case of an emergency.', 1, 1000),
       ('Max Revive', 2000, 'maxrevive.png', 'An essential item that can recover your fainted pokémon in the case of an emergency.', 1, 1000),
       ('Flamethrower TM', 10000, 'flamethrower.webp', 'Lets your Pokémon learn the powerful move "Flamethrower".', 1, 1000),
       ('Hydro Pump TM', 12000, 'hydropump.webp', 'Lets your Pokémon learn the powerful move "Hydro Pump".', 1, 1000),
       ('Thunder Bolt TM', 10000, 'thunderbolt.webp', 'Lets your Pokémon learn the powerful move "Thunder Bolt".', 1, 1000),
       ('Ice Beam TM', 10000, 'icebeam.webp', 'Lets your Pokémon learn the powerful move "Ice Beam".', 1, 1000),
       ('Stone Edge TM', 12000, 'stoneedge.webp', 'Lets your Pokémon learn the powerful move "Stone Edge".', 1, 1000),
       ('Earthquake TM', 12000, 'earthquake.webp', 'Lets your Pokémon learn the powerful move "Earthquake".', 1, 1000),
       ('Giga Impact TM', 12000, 'gigaimpact.webp', 'Lets your Pokémon learn the powerful move "Giga Impact".', 1, 1000),
       ('Hyper Beam TM', 12000, 'hyperbeam.webp', 'Lets your Pokémon learn the powerful move "Hyper Beam".', 1, 1000),
       ('Close Combat TM', 12000, 'closecombat.webp', 'Lets your Pokémon learn the powerful move "Close Combat".', 1, 1000),
       ('Solar Beam TM', 12000, 'solarbeam.webp', 'Lets your Pokémon learn the powerful move "Solar Beam".', 1, 1000),
       ('Aerial Ace TM', 800, 'aerialace.webp', 'Lets your Pokémon learn the powerful move "Aerial Ace".', 1, 1000)
returning *
