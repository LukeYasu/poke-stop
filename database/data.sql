-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "Items" ("name", "price", "photoUrl", "description", "quantity", "cardTag", "itemType", "salePrice")
values ('Poké Ball', 100, 'pokeball.png', 'An essential part of any trainers bag. Helps you effectively catch pokémon.', 1,'best seller', 'capture ball' , null),
       ('Great Ball', 600, 'greatball.png', 'An upgraded, more effective version of the Pokéball that gives you an edge in performance when you are trying to catch em all.', 1,'best seller', 'capture ball', null),
       ('Ultra Ball', 1600, 'ultraball.png', 'the most refined Pokéball with the highest performance for any situation that is thrown your way.', 1, null, 'capture ball', null),
       ('Fire Stone', 2100, 'firestone.png', 'lets you evolve certain fire type Pokémon to give your partner a boost in their evolution and training journey.', 1, null, 'evo stone', null),
       ('Water Stone', 2100, 'waterstone.png', 'lets you evolve certain water type Pokémon to give your partner a boost in their evolution and training journey.', 1, 'best seller', 'evo stone', null),
       ('Leaf Stone', 2100, 'leafstone.png', 'lets you evolve certain grass type Pokémon to give your partner a boost in their evolution and training journey.', 1, null, 'evo stone', 1600),
       ('Dusk Stone', 2100, 'duskstone.png', 'lets you evolve certain dark type Pokémon to give your partner a boost in their evolution and training journey.', 1, 'new', 'evo stone', null),
       ('Poké Ball 10 Pack', 900, 'pokeball.png','An essential part of any trainers bag. Helps you effectively catch pokémon.', 10, null, 'capture ball', null),
       ('Great Ball 10 Pack', 5900, 'greatball.png','An essential part of any trainers bag. Helps you effectively catch pokémon.', 10, null, 'capture ball', null),
       ('Ultra Ball 10 Pack', 15000, 'ultraball.png','An essential part of any trainers bag. Helps you effectively catch pokémon.', 10, null, 'capture ball', null),
       ('Hyper Potion', 1500, 'hyper-potion.png', 'This potion heals 200hp and is an essential part of any trainers journey to ensure that their pokémon stay safe and strong for whatever explorations you and your Pokémon embark on.', 1, null, 'consumable', null),
       ('Razz Berry 3 Pack', 200, 'razz-berry-3.png', 'This delicious berry attracts almost any Pokémon and it increases your chances to catch a Pokémon. This can also be a nice treat for you and your pokémon.', 3, null, 'consumable', null),
       ('Dusk Ball', 1000, 'duskball.png', 'A Poké Ball that allows you to increase your chances of capturing pokémon at night or in dark places like caves.', 1, null, 'capture ball', 900),
       ('Level Ball', 1000, 'levelball.png', 'A Poké Ball that allows you to increase your chances of capturing pokémon dependant on the levels of both your Pokémon and the opponent Pokémon.', 1, 'new', 'capture ball', null),
       ('Lure Ball', 1000, 'lureball.png', 'A Poké Ball that allows you to increase your chances of capturing pokémon that have been hooked with a Fishing Rod.', 1, null, 'capture ball', null),
       ('Moon Ball', 1000, 'moonball.png', 'A Poké Ball that allows you to increase your chances of capturing pokémon that evolve with the MoonStone.', 1, null, 'capture ball', null),
       ('Potion', 200, 'potion.png', 'This potion heals 20hp and is an essential part of any trainers journey to ensure that their pokémon stay safe and strong for whatever explorations you and your Pokémon embark on.', 1, null, 'consumable', null),
       ('Potion 10 Pack', 1900, 'potion.png', 'This potion heals 20hp and is an essential part of any trainers journey to ensure that their pokémon stay safe and strong for whatever explorations you and your Pokémon embark on.', 10, null, 'consumable', null),
       ('Super Potion', 400, 'superpotion.png', 'This potion heals 50hp and is an essential part of any trainers journey to ensure that their pokémon stay safe and strong for whatever explorations you and your Pokémon embark on.', 1, null, 'consumable', null),
       ('Max Potion', 2500, 'maxpotion.png', 'This potion heals to full HP and is an essential part of any trainers journey to ensure that their pokémon stay safe and strong for whatever explorations you and your Pokémon embark on.', 1, null, 'consumable', null),
       ('Revive', 1000, 'revive.png', 'An essential item that can recover your fainted pokémon in the case of an emergency.', 1, null, 'consumable', null),
       ('Max Revive', 2100, 'maxrevive.png', 'An essential item that can recover your fainted pokémon in the case of an emergency.', 1, null, 'consumable', 1900),
       ('Flamethrower TM', 10000, 'flamethrower.webp', 'Lets your Pokémon learn the powerful move "Flamethrower".', 1, null, 'power up', null),
       ('Hydro Pump TM', 12000, 'hydropump.webp', 'Lets your Pokémon learn the powerful move "Hydro Pump".', 1, null, 'power up', null),
       ('Thunder Bolt TM', 10000, 'thunderbolt.webp', 'Lets your Pokémon learn the powerful move "Thunder Bolt".', 1, null, 'power up', null),
       ('Ice Beam TM', 10000, 'icebeam.webp', 'Lets your Pokémon learn the powerful move "Ice Beam".', 1, null, 'power up', null),
       ('Stone Edge TM', 12000, 'stoneedge.webp', 'Lets your Pokémon learn the powerful move "Stone Edge".', 1, null, 'power up', null),
       ('Earthquake TM', 12000, 'earthquake.webp', 'Lets your Pokémon learn the powerful move "Earthquake".', 1, null, 'power up', null),
       ('Giga Impact TM', 12000, 'gigaimpact.webp', 'Lets your Pokémon learn the powerful move "Giga Impact".', 1, null, 'power up', null),
       ('Hyper Beam TM', 12000, 'hyperbeam.webp', 'Lets your Pokémon learn the powerful move "Hyper Beam".', 1, null, 'power up', null),
       ('Close Combat TM', 12000, 'closecombat.webp', 'Lets your Pokémon learn the powerful move "Close Combat".', 1, null, 'power up', null),
       ('Solar Beam TM', 12000, 'solarbeam.webp', 'Lets your Pokémon learn the powerful move "Solar Beam".', 1, null, 'power up', null),
       ('Aerial Ace TM', 800, 'aerialace.webp', 'Lets your Pokémon learn the powerful move "Aerial Ace".', 1, null, 'power up', null),
       ('Charcoal', 3000, 'charcoal.png', 'An item to be held by a Pokémon. It is a combustible fuel that boosts the power of Fire-type moves.', 1, null, 'power up', null),
       ('Potion Bundle', 4000, 'potionbundle.png', 'A bundle of potions that includes: Potion, Super Potion, Hyper Potion, and Max Potion', 1, 'bundle', 'consumable', null),
       ('Trainer Starter Pack', 12000, 'trainerstarterpack.png', 'The perfect bundle for trainers first starting out and for trainers with veteran experience as it contains all the essential items for their journey. Bundle Includes Poké ball x10, Great Ball x10, Ultra Ball x10, Potion Bundle(Max Potion, Hyper Potion, Super Potion and Potion).', 1, 'bundle', 'capture ball', null),
       ('Fire Bundle', 14000, 'firebundle.png', 'This bundle specializes in fore type pokemon and gives you a great deal for key items for your fierce fiery Pokémon.', 1, 'bundle', 'power up', null);

insert into "Users" ("username", "hashedPassword")
     values ('guest', '$argon2id$v=19$m=65536,t=3,p=4$14S2m7zYtW65ucgmjRbMlw$xRQTOjj5kDNBhX9TM5UqBI3wWOlep0rqArkROTQpynU');
