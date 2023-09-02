import { Game } from '../game/model/game';
import { CardDrawer } from './card-drawer';

export const ALL_CARDS =
    {
        'masterminds': [
            {
                'name': 'Adrian Toomes',
                'extension': 'Spider-Man Homecoming',
                'alwaysLead': 'Salvagers',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Annihilus',
                'extension': 'Annihilation',
                'alwaysLead': 'Annihilation Wave',
                'alwaysLeadCategory': 'villains',
                'customRule': (game: Game, _cardDrawer: CardDrawer, _allCards, playerCount: number) => {
                    if (playerCount === 1) {
                        game.henchmenCardsCount = 6;
                    }
                }
            },
            {
                'name': 'Apocalypse',
                'extension': 'Dark City',
                'alwaysLead': 'Four Horsemen',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Arcade',
                'extension': 'X-Men',
                'alwaysLead': 'Murderworld',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Arnim Zola',
                'extension': 'Captain America 75th Anniversary',
                'alwaysLead': 'Zola\'s Creations',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Authoritarian Iron Man',
                'extension': 'Civil War',
                'alwaysLead': 'Superhuman Registration Act',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Baron Heinrich Zemo',
                'extension': 'Captain America 75th Anniversary',
                'alwaysLead': 'Masters of Evil (WWII)',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Baron Helmut Zemo',
                'extension': 'Civil War',
                'alwaysLead': 'Thunderbolts',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Bastion',
                'extension': 'Messiah Complex',
                'alwaysLead': 'Purifiers',
                'alwaysLeadCategory': 'villains',
                'specialLead': 'Sentinel'
            },
            {
                'name': 'Belasco, Demon Lord of Limbo',
                'extension': 'The New Mutants',
                'alwaysLead': 'Demons of Limbo',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Carnage',
                'extension': 'Paint the Town Red',
                'alwaysLead': 'Maximum Carnage',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Charles Xavier, Professor of Crime',
                'extension': 'Marvel Noir',
                'alwaysLead': 'X-Men Noir',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Dark Phoenix',
                'extension': 'X-Men',
                'alwaysLead': 'Hellfire Club',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Deathbird',
                'extension': 'X-Men',
                'alwaysLead': 'Shi\'ar Imperial Guard',
                'alwaysLeadCategory': 'villains',
                'specialLead': 'Shi\'ar'
            },
            {
                'name': 'Dormammu',
                'extension': 'Doctor Strange and the Shadows of Nightmare',
                'alwaysLead': 'Lords of the Netherworld',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Dr. Doom',
                'extension': 'Core Set',
                'alwaysLead': 'Doombot Legion',
                'alwaysLeadCategory': 'henchmen'
            },
            {
                'name': 'Dr. Strange',
                'extension': 'Villains',
                'alwaysLead': 'Defenders',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Ego, The Living Planet',
                'extension': 'Marvel Studios\' Guardians of the Galaxy',
                'customRule': (game: Game, cardDrawer: CardDrawer, allCards) => {
                    game.villains.push(cardDrawer.drawRandomUnique(allCards.villains));
                }
            },
            {
                'name': 'Emma Frost, The White Queen',
                'extension': 'The New Mutants',
                'alwaysLead': 'Hellions',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Emperor Vulcan of the Shi\'Ar',
                'extension': 'Realm of Kings',
                'alwaysLead': '',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Evil Deadpool',
                'extension': 'Deadpool',
                'alwaysLead': 'Evil Deadpool Corpse',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Exodus',
                'extension': 'Messiah Complex',
                'alwaysLead': 'Acolytes',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Fin Fang Foom',
                'extension': 'Champions',
                'alwaysLead': 'Monsters Unleashed',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Galactus',
                'extension': 'Fantastic Four',
                'alwaysLead': 'Heralds of Galactus',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'General "Thunderbolt" Ross / Red Hulk',
                'extension': 'World War Hulk',
                'alwaysLead': 'Code Red',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Grandmaster',
                'extension': 'Into the Cosmos',
                'alwaysLead': 'Elders of the Universe',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Grim Reaper',
                'extension': 'Revelations',
                'alwaysLead': 'Lethal Legion',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Hela, Goddess of Death',
                'extension': 'Heroes of Asgard',
                'alwaysLead': 'Omens of Ragnarok',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Hybrid',
                'extension': 'Venom',
                'alwaysLead': 'Life Foundation',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'HYDRA High Council',
                'extension': 'S.H.I.E.L.D.',
                'alwaysLead': 'HYDRA Elite',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'HYDRA Super Adaptoid',
                'extension': 'S.H.I.E.L.D.',
                'alwaysLead': 'A.I.M., HYDRA Offshoot',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Illuminati, Secret Society',
                'extension': 'World War Hulk',
                'alwaysLead': 'Illuminati',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Immortal Emperor Zheng-Zhu',
                'extension': 'Secret Wars, Volume 2',
                'alwaysLead': 'K\'un Lun',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Indestructible Man',
                'extension': 'Black Widow',
                'alwaysLead': 'Elite Assassins',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Iron Monger',
                'extension': 'Marvel Studios, Phase 1',
                'alwaysLead': 'Iron Foes',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'J. Jonah Jameson',
                'extension': 'Dimensions',
                'alwaysLead': 'Spider-Slayer',
                'alwaysLeadCategory': 'henchmen'
            },
            {
                'name': 'Kang the Conqueror',
                'extension': 'Annihilation',
                'alwaysLead': 'Timelines of Kang',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Killmonger',
                'extension': 'Black Panther',
                'alwaysLead': 'Killmonger\'s League',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'King Hulk, Sakaarson',
                'extension': 'World War Hulk',
                'alwaysLead': 'Warbound',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'King Hyperion',
                'extension': 'Secret Wars, Volume 2',
                'alwaysLead': 'Utopolis',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Kingpin',
                'extension': 'Dark City',
                'alwaysLead': 'Streets of New York',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Klaw',
                'extension': 'Black Panther',
                'alwaysLead': 'Enemies of Wakanda',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Lady Deathstrike',
                'extension': 'Messiah Complex',
                'alwaysLead': 'Reavers',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Loki',
                'extension': 'Marvel Studios, Phase 1',
                'alwaysLead': 'Enemies of Asgard',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Loki',
                'extension': 'Core Set',
                'alwaysLead': 'Enemies of Asgard',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'M.O.D.O.K.',
                'extension': 'World War Hulk',
                'alwaysLead': 'Intelligencia',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Macho Gomez',
                'extension': 'Deadpool',
                'alwaysLead': 'Deadpool\'s "Friends"',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Madelyne Pryor, Goblin Queen',
                'extension': 'Secret Wars, Volume 1',
                'alwaysLead': 'Limbo',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Magneto',
                'extension': 'Core Set',
                'alwaysLead': 'Brotherhood',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Magus',
                'extension': 'Into the Cosmos',
                'alwaysLead': 'Universal Church of Truth',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Malekith the Accursed',
                'extension': 'Heroes of Asgard',
                'alwaysLead': 'Dark Council',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Mandarin',
                'extension': 'Revelations',
                'alwaysLead': 'Mandarin\'s Rings',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Maria Hill, Director of S.H.I.E.L.D.',
                'extension': 'Civil War',
                'alwaysLead': 'S.H.I.E.L.D. Elite',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Maximus the Mad',
                'extension': 'Realm of Kings',
                'alwaysLead': 'Inhuman Rebellion',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Mephisto',
                'extension': 'Dark City',
                'alwaysLead': 'Underworld',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Misty Knight',
                'extension': 'Civil War',
                'alwaysLead': 'Heroes for Hire',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Mojo',
                'extension': 'X-Men',
                'alwaysLead': 'Mojoverse',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Mole Man',
                'extension': 'Fantastic Four',
                'alwaysLead': 'Subterranea',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Morgan Le Fay',
                'extension': 'Ant-Man',
                'alwaysLead': 'Queen\'s Vengeance',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Mr. Sinister',
                'extension': 'Dark City',
                'alwaysLead': 'Marauders',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Mysterio',
                'extension': 'Paint the Town Red',
                'alwaysLead': 'Sinister Six',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Nick Fury',
                'extension': 'Villains',
                'alwaysLead': 'Avengers',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Nightmare',
                'extension': 'Doctor Strange and the Shadows of Nightmare',
                'alwaysLead': 'Fear Lords',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Nimrod, Super Sentinel',
                'extension': 'Secret Wars, Volume 1',
                'alwaysLead': 'Sentinel Territories',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Odin',
                'extension': 'Villains',
                'alwaysLead': 'Asgardian Warriors',
                'alwaysLeadCategory': 'henchmen'
            },
            {
                'name': 'Onslaught',
                'extension': 'X-Men',
                'alwaysLead': 'Dark Descendants',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Pagliacci',
                'extension': 'Champions',
                'alwaysLead': 'Wrecking Crew',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Poison Thanos',
                'extension': 'Venom',
                'alwaysLead': 'Poisons',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Professor X',
                'extension': 'Villains',
                'alwaysLead': 'X-Men First Class',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Ragnarok',
                'extension': 'Civil War',
                'alwaysLead': 'Registration Enforcers',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Red Skull',
                'extension': 'Marvel Studios, Phase 1',
                'alwaysLead': 'HYDRA',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Red Skull',
                'extension': 'Core Set',
                'alwaysLead': 'HYDRA',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Ronan the Accuser',
                'extension': 'Marvel Studios\' Guardians of the Galaxy',
                'alwaysLead': 'Followers of Ronan',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Shadow King',
                'extension': 'X-Men',
                'alwaysLead': 'Shadow-X',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Shiklah, the Demon Bride',
                'extension': 'Secret Wars, Volume 2',
                'alwaysLead': 'Monster Metropolis',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Spider Queen',
                'extension': 'Secret Wars, Volume 2',
                'alwaysLead': 'Spider-Infected',
                'alwaysLeadCategory': 'henchmen'
            },
            {
                'name': 'Stryfe',
                'extension': 'Dark City',
                'alwaysLead': 'MLF',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Supreme Intelligence of the Kree',
                'extension': 'Guardians of the Galaxy',
                'alwaysLead': 'Kree Starforce',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Taskmaster',
                'extension': 'Black Widow',
                'alwaysLead': 'Taskmaster\'s Thunderbolts',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Thanos',
                'extension': 'Guardians of the Galaxy',
                'alwaysLead': 'Infinity Gems',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'The Beyonder',
                'extension': 'Into the Cosmos',
                'alwaysLead': 'From Beyond',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'The Goblin, Underworld Boss',
                'extension': 'Marvel Noir',
                'alwaysLead': 'Goblin\'s Freak Show',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'The Hood',
                'extension': 'Revelations',
                'alwaysLead': 'Hood\'s Gang',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'The Red King',
                'extension': 'World War Hulk',
                'alwaysLead': 'Sakaar Imperial Guard',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'The Sentry / The Void',
                'extension': 'World War Hulk',
                'alwaysLead': 'Aspects of the Void',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Ultron',
                'extension': 'Ant-Man',
                'alwaysLead': 'Ultron\'s Legacy',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Uru-Enchanted Iron Man',
                'extension': 'Fear Itself',
                'alwaysLead': 'The Mighty',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Vulture',
                'extension': 'Spider-Man Homecoming',
                'alwaysLead': 'Vulture Tech',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Wasteland Hulk',
                'extension': 'Secret Wars, Volume 1',
                'alwaysLead': 'Wasteland',
                'alwaysLeadCategory': 'villains'
            },
            {
                'name': 'Zombie Green Goblin',
                'extension': 'Secret Wars, Volume 1',
                'alwaysLead': 'The Deadlands',
                'alwaysLeadCategory': 'villains'
            },
        ],
        'schemes': [
            {
                'name': 'Age of Ultron',
                'extension': 'Ant-Man',
                'customRule': (game: Game, cardDrawer: CardDrawer, allCards, playerCount) => {
                    if (playerCount === 4 || playerCount === 5) {
                        game.villains.push(cardDrawer.drawRandomUnique(allCards.villains));
                    }
                }
            },
            {
                'name': 'Alien Brood Encounters',
                'extension': 'X-Men'
            },
            {
                'name': 'Annihilation:Conquest',
                'extension': 'Into the Cosmos'
            },
            {
                'name': 'Anti-Mutant Hatred',
                'extension': 'X-Men'
            },
            {
                'name': 'Asgard Under Siege',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Asgardian Test of Worth',
                'extension': 'Heroes of Asgard'
            },
            {
                'name': 'Avengers vs. X-Men',
                'extension': 'Civil War'
            },
            {
                'name': 'Bathe Earth in Cosmic Rays',
                'extension': 'Fantastic Four'
            },
            {
                'name': 'Brainwash the Military',
                'extension': 'Captain America 75th Anniversary'
            },
            {
                'name': 'Breach Parallel Dimensions',
                'extension': 'Annihilation'
            },
            {
                'name': 'Break the Planet Asunder',
                'extension': 'World War Hulk',
                'customRule': (game: Game, cardDrawer: CardDrawer, allCards, playerCount) => {
                    while (game.heroes.length < 7) {
                        game.heroes.push(cardDrawer.drawRandomUnique(allCards.heroes));
                    }
                }
            },
            {
                'name': 'Build An Army of Annihilation',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Build an Underground Mega-Vault Prison',
                'extension': 'Villains'
            },
            {
                'name': 'Cage Villains in Power-Suppressing Cells',
                'extension': 'Villains'
            },
            {
                'name': 'Capture Baby Hope',
                'extension': 'Dark City'
            },
            {
                'name': 'Change the Outcome of WWII',
                'extension': 'Captain America 75th Anniversary'
            },
            {
                'name': 'Claim Souls for Demons',
                'extension': 'Doctor Strange and the Shadows of Nightmare'
            },
            {
                'name': 'Clash of the Monsters Unleashed',
                'extension': 'Champions'
            },
            {
                'name': 'Corrupt the Next Generation of Heroes',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Corrupt the Spy Agencies',
                'extension': 'Black Widow'
            },
            {
                'name': 'Crash the Moon into the Sun',
                'extension': 'The New Mutants'
            },
            {
                'name': 'Crown Thor King of Asgard',
                'extension': 'Villains'
            },
            {
                'name': 'Crush Hydra',
                'extension': 'Villains'
            },
            {
                'name': 'Crush Them with My Bare hands',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Cursed Pages of the Darkhold Tome',
                'extension': 'Doctor Strange and the Shadows of Nightmare',
                'customRule': (game: Game, cardDrawer: CardDrawer, allCards,) => {
                    game.villains.push(cardDrawer.drawRandomUnique(allCards.villains));
                }
            },
            {
                'name': 'Cytoplasm Spike Invasion',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Dark Alliance',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Dark Reign of H.A.M.M.E.R. Officers',
                'extension': 'Civil War'
            },
            {
                'name': 'Deadlands Hordes Charge the Wall',
                'extension': 'Secret Wars, Volume 2',
                'customRule': (game: Game, cardDrawer: CardDrawer, allCards,) => {
                    game.villains.push(cardDrawer.drawRandomUnique(allCards.villains));
                }
            },
            {
                'name': 'Deadpool Kills the Marvel Universe',
                'extension': 'Deadpool'
            },
            {
                'name': 'Deadpool Wants a Chimichanga',
                'extension': 'Deadpool'
            },
            {
                'name': 'Deadpool Writes a Scheme',
                'extension': 'Deadpool'
            },
            {
                'name': 'Destroy the Cities of Earth!',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Destroy the Nova Corps',
                'extension': 'Into the Cosmos'
            },
            {
                'name': 'Detonate the Helicarrier',
                'extension': 'Dark City',
                'customRule': (game, cardDrawer, allCards) => {
                    for (let i = game.heroes.length; i < 6; i++) {
                        game.heroes.push(cardDrawer.drawRandomUnique(allCards.heroes));
                    }
                }
            },
            {
                'name': 'Devolve with Xerogen Crystals',
                'extension': 'Realm of Kings'
            },
            {
                'name': 'Distract the Hero',
                'extension': 'Spider-Man Homecoming'
            },
            {
                'name': 'Divide and Conquer',
                'extension': 'Champions',
                'customRule': (game, cardDrawer, allCards) => {
                    for (let i = game.heroes.length; i < 7; i++) {
                        game.heroes.push(cardDrawer.drawRandomUnique(allCards.heroes));
                    }
                }
            },
            {
                'name': 'Drain Mutants\' Powers to / Open Rifts to Future Timelines',
                'extension': 'Messiah Complex'
            },
            {
                'name': 'Duels of Science and Magic',
                'extension': 'Doctor Strange and the Shadows of Nightmare'
            },
            {
                'name': 'Earthquake Drains the Ocean / Tsunami Crushes the Coast',
                'extension': 'Revelations'
            },
            {
                'name': 'Enslave Minds with the Chitauri Scepter',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Enthrone the Barons of Battleworld',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'Epic Super Hero Civil War',
                'extension': 'Civil War',
                'customRule': (game, cardDrawer, allCards, playerCount) => {
                    if (playerCount === 1) {
                        for (let i = game.heroes.length; i < 4; i++) {
                            game.heroes.push(cardDrawer.drawRandomUnique(allCards.heroes));
                        }
                    }
                }
            },
            {
                'name': 'Everybody Hates Deadpool',
                'extension': 'Deadpool'
            },
            {
                'name': 'Explosion at the Washington Monument',
                'extension': 'Spider-Man Homecoming'
            },
            {
                'name': 'Fall of the Hulks',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Fear Itself',
                'extension': 'Fear Itself'
            },
            {
                'name': 'Ferry Disaster',
                'extension': 'Spider-Man Homecoming'
            },
            {
                'name': 'Find the Split Personality Killer',
                'extension': 'Marvel Noir'
            },
            {
                'name': 'Five Families of Crime',
                'extension': 'Marvel Noir'
            },
            {
                'name': 'Flood the Planet with Melted Glaciers',
                'extension': 'Fantastic Four'
            },
            {
                'name': 'Forge the Infinity Gauntlet',
                'extension': 'Guardians of the Galaxy',
                'customRule': (game, cardDrawer, allCards) => {
                    const previousVillain = game.villains[0];
                    previousVillain.count--;
                    game.villains[0] =
                        cardDrawer.drawRandomMultipleForce(allCards.villains, 1, ['Infinity Gems'])[0];
                }
            },
            {
                'name': 'Fragmented Realities',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Frame Heroes for Murder',
                'extension': 'Black Widow'
            },
            {
                'name': 'Gladiator Pits of Sakaar',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Go Back in Time to Slay Heroes\' Ancestors',
                'extension': 'Captain America 75th Anniversary'
            },
            {
                'name': 'Graduation at Xavier\'s X-Academy',
                'extension': 'Villains'
            },
            {
                'name': 'Hack Cerebro to / Manipulate the Mutant Messiah',
                'extension': 'Messiah Complex'
            },
            {
                'name': 'Hail Hydra',
                'extension': 'S.H.I.E.L.D.'
            },
            {
                'name': 'Hidden Heart of Darkness',
                'extension': 'Marvel Noir'
            },
            {
                'name': 'Hire Singularity Investigations to / Reveal Heroes\' Evil Clones',
                'extension': 'Messiah Complex'
            },
            {
                'name': 'Horror of Horrors',
                'extension': 'X-Men'
            },
            {
                'name': 'House of M / No More Mutants',
                'extension': 'Revelations'
            },
            {
                'name': 'HYDRA Helicarriers Hunt Heroes',
                'extension': 'S.H.I.E.L.D.'
            },
            {
                'name': 'Hypnotize Every Human',
                'extension': 'Champions',
                'customRule': (game, cardDrawer, allCards) => {
                    game.bystanders = 0;
                    game.henchmen.push(cardDrawer.drawRandomUnique(allCards.henchmen));
                }
            },
            {
                'name': 'Imprison Unregistered Superhumans',
                'extension': 'Civil War'
            },
            {
                'name': 'Inescapable "Kyln" Space Prison',
                'extension': 'Marvel Studios\' Guardians of the Galaxy'
            },
            {
                'name': 'Infiltrate the Lair with Spies',
                'extension': 'Villains'
            },
            {
                'name': 'Intergalactic Kree Nega-Bomb',
                'extension': 'Guardians of the Galaxy'
            },
            {
                'name': 'Invade Asgard',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Invade the Daily Bugle News HQ',
                'extension': 'Paint the Town Red'
            },
            {
                'name': 'Invasion of the Venom Symbiotes',
                'extension': 'Venom'
            },
            {
                'name': 'Invincible Force Field',
                'extension': 'Fantastic Four'
            },
            {
                'name': 'Last Stand at Avengers Tower',
                'extension': 'Fear Itself'
            },
            {
                'name': 'Mass Produce War Machine Armor',
                'extension': 'Villains'
            },
            {
                'name': 'Massive Earthquake Generator',
                'extension': 'Dark City'
            },
            {
                'name': 'Master of Tyrants',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Master the Mysteries of Kung-Fu',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'Maximum Carnage',
                'extension': 'Venom'
            },
            {
                'name': 'Midtown Bank Robbery',
                'extension': 'Core Set'
            },
            {
                'name': 'Mutant-Hunting Super Sentinels',
                'extension': 'X-Men'
            },
            {
                'name': 'Mutating Gamma Rays',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Negative Zone Prison Breakout',
                'extension': 'Core Set'
            },
            {
                'name': 'Nitro the Supervillain Threatens Crowds',
                'extension': 'Civil War'
            },
            {
                'name': 'Nuclear Armageddon',
                'extension': 'X-Men'
            },
            {
                'name': 'Organized Crime Wave',
                'extension': 'Dark City'
            },
            {
                'name': 'Pan-Dimensional Plague',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Paralyzing Venom',
                'extension': 'Venom'
            },
            {
                'name': 'Plunder Wakanda\'s Vibranium',
                'extension': 'Black Panther'
            },
            {
                'name': 'Poison Lakes with Nanite Microbots',
                'extension': 'Black Panther'
            },
            {
                'name': 'Portals to the Dark Dimension',
                'extension': 'Core Set'
            },
            {
                'name': 'Predict Future Crime',
                'extension': 'Civil War'
            },
            {
                'name': 'Provoke a Clash of Nations',
                'extension': 'Black Panther'
            },
            {
                'name': 'Provoke the Sovereign War Fleet',
                'extension': 'Marvel Studios\' Guardians of the Galaxy'
            },
            {
                'name': 'Pull Earth Into Medieval Times',
                'extension': 'Ant-Man'
            },
            {
                'name': 'Pull Reality into the Negative Zone',
                'extension': 'Fantastic Four'
            },
            {
                'name': 'Pulse Waves from the Negative Zone',
                'extension': 'Annihilation'
            },
            {
                'name': 'Put Humanity on Trial',
                'extension': 'Annihilation'
            },
            {
                'name': 'Radioactive Palladium Poisoning',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Ragnarok, Twilight of the Gods',
                'extension': 'Heroes of Asgard'
            },
            {
                'name': 'Raid Gene Bank to / Unleash an Anti-Mutant Bioweapon',
                'extension': 'Messiah Complex'
            },
            {
                'name': 'Replace Earth\'s Leaders with Killbots',
                'extension': 'Core Set'
            },
            {
                'name': 'Replace Earth’s Leaders with HYDRA',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Resurrect Heroes with the Norn Stones',
                'extension': 'Villains'
            },
            {
                'name': 'Reveal Heroes\' Secret Identities',
                'extension': 'Civil War'
            },
            {
                'name': 'Ruin the Perfect Wedding',
                'extension': 'Realm of Kings'
            },
            {
                'name': 'S.H.I.E.L.D. Vs. HYDRA War',
                'extension': 'S.H.I.E.L.D.'
            },
            {
                'name': 'Save Humanity',
                'extension': 'Dark City'
            },
            {
                'name': 'Scavenge Alien Weaponry',
                'extension': 'Spider-Man Homecoming'
            },
            {
                'name': 'Secret Empire of Betrayal',
                'extension': 'S.H.I.E.L.D.'
            },
            {
                'name': 'Secret HYDRA Corruption / Open HYDRA Revolution',
                'extension': 'Revelations'
            },
            {
                'name': 'Secret Invasion of the Skrull Shapeshifters',
                'extension': 'Core Set',
                'alwaysLead': 'Skrulls',
                'alwaysLeadCategory': 'villains',
                'customRule': (game, cardDrawer, allCards) => {
                    while (game.heroes.length < 6) {
                        game.heroes.push(cardDrawer.drawRandomUnique(allCards.heroes));
                    }
                }
            },
            {
                'name': 'Secret Wars',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'Seize The Wakandan Throne',
                'extension': 'Black Panther'
            },
            {
                'name': 'Shoot Hulk into Space',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Silence the Witnesses',
                'extension': 'Marvel Noir'
            },
            {
                'name': 'Sinister Ambitions',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'Smash Two Dimensions Together',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Sneak Attack the Heroes\' Homes',
                'extension': 'Annihilation'
            },
            {
                'name': 'Sniper Rifle Assassins',
                'extension': 'Black Widow'
            },
            {
                'name': 'Splice Humans with Spider DNA',
                'extension': 'Paint the Town Red'
            },
            {
                'name': 'Star-Lord\'s Awesome Mix Tape',
                'extension': 'Marvel Studios\' Guardians of the Galaxy'
            },
            {
                'name': 'Steal All Oxygen on Earth',
                'extension': 'Champions'
            },
            {
                'name': 'Steal the Weaponized Plutonium',
                'extension': 'Dark City',
                'customRule': (game: Game, cardDrawer: CardDrawer, allCards) => {
                    game.villains.push(cardDrawer.drawRandomUnique(allCards.villains));
                }
            },
            {
                'name': 'Subjugate With Obedience Disks',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Super Hero Civil War',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Super Hero Civil War',
                'extension': 'Core Set'
            },
            {
                'name': 'Superhuman Baseball Game',
                'extension': 'The New Mutants'
            },
            {
                'name': 'Symbiotic Absorption',
                'extension': 'Venom'
            },
            {
                'name': 'Televised Deathtraps of Mojoworld',
                'extension': 'X-Men'
            },
            {
                'name': 'The Clone Saga',
                'extension': 'Paint the Town Red'
            },
            {
                'name': 'The Contest of Champions',
                'extension': 'Into the Cosmos'
            },
            {
                'name': 'The Dark Phoenix Saga',
                'extension': 'X-Men'
            },
            {
                'name': 'The Dark World of Svartalfheim',
                'extension': 'Heroes of Asgard'
            },
            {
                'name': 'The Demon Bear Saga',
                'extension': 'The New Mutants'
            },
            {
                'name': 'The Fountain of Eternal Life',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'The God-Emperor of Battleworld',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'The Korvac Saga / Korvac Revealed',
                'extension': 'Revelations'
            },
            {
                'name': 'The Kree-Skrull War',
                'extension': 'Guardians of the Galaxy'
            },
            {
                'name': 'The Legacy Virus',
                'extension': 'Core Set'
            },
            {
                'name': 'The Mark of Khonshu',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'The Traitor',
                'extension': 'Fear Itself'
            },
            {
                'name': 'The Unbreakable Enigma Code',
                'extension': 'Captain America 75th Anniversary'
            },
            {
                'name': 'Tornado of Terrigen Mists',
                'extension': 'Realm of Kings'
            },
            {
                'name': 'Train Black Widows in the Red Room',
                'extension': 'Black Widow'
            },
            {
                'name': 'Transform Citizens into Demons',
                'extension': 'Dark City'
            },
            {
                'name': 'Transform Commuters Into Giant Ants',
                'extension': 'Ant-Man'
            },
            {
                'name': 'Trap Heroes In The Microverse',
                'extension': 'Ant-Man'
            },
            {
                'name': 'Trapped in the Insane Asylum',
                'extension': 'The New Mutants'
            },
            {
                'name': 'Turn the Soul of Adam Warlock',
                'extension': 'Into the Cosmos'
            },
            {
                'name': 'Unite the Shards',
                'extension': 'Guardians of the Galaxy'
            },
            {
                'name': 'United States Split by Civil War',
                'extension': 'Civil War'
            },
            {
                'name': 'Unleash the Abilisk Space Monster',
                'extension': 'Marvel Studios\' Guardians of the Galaxy'
            },
            {
                'name': 'Unleash the Power of the Cosmic Cube',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Unleash the Power of the Cosmic Cube',
                'extension': 'Core Set'
            },
            {
                'name': 'War for the Dream Dimension',
                'extension': 'Doctor Strange and the Shadows of Nightmare'
            },
            {
                'name': 'War of Kings',
                'extension': 'Realm of Kings'
            },
            {
                'name': 'War of the Frost Giants',
                'extension': 'Heroes of Asgard'
            },
            {
                'name': 'Weave a Web of Lies',
                'extension': 'Paint the Town Red'
            },
            {
                'name': 'World War Hulk',
                'extension': 'World War Hulk'
            },
            {
                'name': 'X-Cutioner\'s Song',
                'extension': 'Dark City'
            },
            {
                'name': 'X-Men Danger Room Goes Berserk',
                'extension': 'X-Men'
            },
        ],
        'villains': [
            {
                'name': 'A.I.M., HYDRA Offshoot',
                'extension': 'S.H.I.E.L.D.'
            },
            {
                'name': 'Acolytes',
                'extension': 'Messiah Complex'
            },
            {
                'name': 'Annihilation Wave',
                'extension': 'Annihilation'
            },
            {
                'name': 'Army of Evil',
                'extension': 'Revelations'
            },
            {
                'name': 'Aspects of the Void',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Avengers',
                'extension': 'Villains'
            },
            {
                'name': 'Black Order of Thanos',
                'extension': 'Into the Cosmos'
            },
            {
                'name': 'Brotherhood',
                'extension': 'Core Set'
            },
            {
                'name': 'Celestials',
                'extension': 'Into the Cosmos'
            },
            {
                'name': 'Chitauri',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Clan Yashida',
                'extension': 'Messiah Complex'
            },
            {
                'name': 'Code Red',
                'extension': 'World War Hulk'
            },
            {
                'name': 'CSA Special Marshals',
                'extension': 'Civil War'
            },
            {
                'name': 'Dark Avengers',
                'extension': 'Revelations'
            },
            {
                'name': 'Dark Council',
                'extension': 'Heroes of Asgard'
            },
            {
                'name': 'Dark Descendants',
                'extension': 'X-Men'
            },
            {
                'name': 'Deadpool\'s "Friends"',
                'extension': 'Deadpool'
            },
            {
                'name': 'Deadpool\'s Secret Secret Wars',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'Defenders',
                'extension': 'Villains'
            },
            {
                'name': 'Demons of Limbo',
                'extension': 'The New Mutants'
            },
            {
                'name': 'Domain of Apocalypse',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Elders of the Universe',
                'extension': 'Into the Cosmos'
            },
            {
                'name': 'Elite Assassins',
                'extension': 'Black Widow'
            },
            {
                'name': 'Emissaries of Evil',
                'extension': 'Dark City'
            },
            {
                'name': 'Enemies of Asgard',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Enemies of Asgard',
                'extension': 'Core Set'
            },
            {
                'name': 'Enemies of Wakanda',
                'extension': 'Black Panther'
            },
            {
                'name': 'Evil Deadpool Corpse',
                'extension': 'Deadpool'
            },
            {
                'name': 'Fear Lords',
                'extension': 'Doctor Strange and the Shadows of Nightmare'
            },
            {
                'name': 'Followers of Ronan',
                'extension': 'Marvel Studios\' Guardians of the Galaxy'
            },
            {
                'name': 'Four Horsemen',
                'extension': 'Dark City'
            },
            {
                'name': 'From Beyond',
                'extension': 'Into the Cosmos'
            },
            {
                'name': 'Gamma Hunters',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Goblin\'s Freak Show',
                'extension': 'Marvel Noir'
            },
            {
                'name': 'Great Lake Avengers',
                'extension': 'Civil War'
            },
            {
                'name': 'Guardians of Knowhere',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'Hellfire Club',
                'extension': 'X-Men'
            },
            {
                'name': 'Hellions',
                'extension': 'The New Mutants'
            },
            {
                'name': 'Heralds of Galactus',
                'extension': 'Fantastic Four'
            },
            {
                'name': 'Heroes for Hire',
                'extension': 'Civil War'
            },
            {
                'name': 'Hood\'s Gang',
                'extension': 'Revelations'
            },
            {
                'name': 'HYDRA',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'HYDRA',
                'extension': 'Core Set'
            },
            {
                'name': 'HYDRA Elite',
                'extension': 'S.H.I.E.L.D.'
            },
            {
                'name': 'Illuminati',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Infinity Gems',
                'extension': 'Guardians of the Galaxy'
            },
            {
                'name': 'Inhuman Rebellion',
                'extension': 'Realm of Kings'
            },
            {
                'name': 'Intelligencia',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Iron Foes',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'K\'un Lun',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'Killmonger\'s League',
                'extension': 'Black Panther'
            },
            {
                'name': 'Kree Starforce',
                'extension': 'Guardians of the Galaxy'
            },
            {
                'name': 'Lethal Legion',
                'extension': 'Revelations'
            },
            {
                'name': 'Life Foundation',
                'extension': 'Venom'
            },
            {
                'name': 'Limbo',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Lords of the Netherworld',
                'extension': 'Doctor Strange and the Shadows of Nightmare'
            },
            {
                'name': 'Manhattan (Earth-1610)',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Marauders',
                'extension': 'Dark City'
            },
            {
                'name': 'Marvel Knights',
                'extension': 'Villains'
            },
            {
                'name': 'Masters of Evil',
                'extension': 'Core Set'
            },
            {
                'name': 'Masters of Evil (WWII)',
                'extension': 'Captain America 75th Anniversary'
            },
            {
                'name': 'Maximum Carnage',
                'extension': 'Paint the Town Red'
            },
            {
                'name': 'MLF',
                'extension': 'Dark City'
            },
            {
                'name': 'Mojoverse',
                'extension': 'X-Men'
            },
            {
                'name': 'Monster Metropolis',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'Monsters Unleashed',
                'extension': 'Champions'
            },
            {
                'name': 'Murderworld',
                'extension': 'X-Men'
            },
            {
                'name': 'Omens of Ragnarok',
                'extension': 'Heroes of Asgard'
            },
            {
                'name': 'Poisons',
                'extension': 'Venom'
            },
            {
                'name': 'Purifiers',
                'extension': 'Messiah Complex'
            },
            {
                'name': 'Queen\'s Vengeance',
                'extension': 'Ant-Man'
            },
            {
                'name': 'Radiation',
                'extension': 'Core Set'
            },
            {
                'name': 'Ravagers',
                'extension': 'Marvel Studios\' Guardians of the Galaxy'
            },
            {
                'name': 'Reavers',
                'extension': 'Messiah Complex'
            },
            {
                'name': 'Registration Enforcers',
                'extension': 'Civil War'
            },
            {
                'name': 'S.H.I.E.L.D. Elite',
                'extension': 'Civil War'
            },
            {
                'name': 'Sakaar Imperial Guard',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Salvagers',
                'extension': 'Spider-Man Homecoming'
            },
            {
                'name': 'Sentinel Territories',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Shadow-X',
                'extension': 'X-Men'
            },
            {
                'name': 'Shi\'Ar Imperial Elite',
                'extension': 'Realm of Kings'
            },
            {
                'name': 'Shi\'ar Imperial Guard',
                'extension': 'X-Men'
            },
            {
                'name': 'Sinister Six',
                'extension': 'Paint the Town Red'
            },
            {
                'name': 'Sisterhood of Mutants',
                'extension': 'X-Men'
            },
            {
                'name': 'Skrulls',
                'extension': 'Core Set'
            },
            {
                'name': 'Spider Foes',
                'extension': 'Core Set'
            },
            {
                'name': 'Spider Friends',
                'extension': 'Villains'
            },
            {
                'name': 'Streets of New York',
                'extension': 'Dark City'
            },
            {
                'name': 'Subterranea',
                'extension': 'Fantastic Four'
            },
            {
                'name': 'Superhuman Registration Act',
                'extension': 'Civil War'
            },
            {
                'name': 'Taskmaster\'s Thunderbolts',
                'extension': 'Black Widow'
            },
            {
                'name': 'The Deadlands',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'The Mighty',
                'extension': 'Fear Itself'
            },
            {
                'name': 'Thunderbolts',
                'extension': 'Civil War'
            },
            {
                'name': 'Timelines of Kang',
                'extension': 'Annihilation'
            },
            {
                'name': 'U-Foes',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Ultron’s Legacy',
                'extension': 'Ant-Man'
            },
            {
                'name': 'Uncanny Avengers',
                'extension': 'Villains'
            },
            {
                'name': 'Uncanny X-Men',
                'extension': 'Villains'
            },
            {
                'name': 'Underworld',
                'extension': 'Dark City'
            },
            {
                'name': 'Utopolis',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'Vulture Tech',
                'extension': 'Spider-Man Homecoming'
            },
            {
                'name': 'Warbound',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Wasteland',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Wrecking Crew',
                'extension': 'Champions'
            },
            {
                'name': 'X-Men 92 (Recruitable)',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'X-Men First Class',
                'extension': 'Villains'
            },
            {
                'name': 'X-Men Noir',
                'extension': 'Marvel Noir'
            },
            {
                'name': 'Zola\'s Creations',
                'extension': 'Captain America 75th Anniversary'
            },
        ],
        'henchmen': [
            {
                'name': 'Asgardian Warriors',
                'extension': 'Villains'
            },
            {
                'name': 'Cape-killers',
                'extension': 'Civil War'
            },
            {
                'name': 'Circus of Crime',
                'extension': 'Dimensions'
            },
            {
                'name': 'Cops',
                'extension': 'Villains'
            },
            {
                'name': 'Cytoplasmic Spikes',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Death\'s Heads',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Doombot Legion',
                'extension': 'Core Set'
            },
            {
                'name': 'Ghost Racers',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Hammer Drone Army',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Hand Ninjas',
                'extension': 'Core Set'
            },
            {
                'name': 'Hellfire Cult',
                'extension': 'X-Men'
            },
            {
                'name': 'Hydra Base',
                'extension': 'Revelations'
            },
            {
                'name': 'HYDRA Pilots',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'HYDRA Spies',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'Khonshu Guardians',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'M.O.D.O.K.s',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Maggia Goons',
                'extension': 'Dark City'
            },
            {
                'name': 'Magma Men',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'Mandarin\'s Rings',
                'extension': 'Revelations'
            },
            {
                'name': 'Mandroids',
                'extension': 'Civil War'
            },
            {
                'name': 'Mr. Sinister Clones',
                'extension': 'Messiah Complex'
            },
            {
                'name': 'Multiple Man',
                'extension': 'Villains'
            },
            {
                'name': 'Phalanx',
                'extension': 'Dark City'
            },
            {
                'name': 'S.H.I.E.L.D. Assault Squad',
                'extension': 'Villains'
            },
            {
                'name': 'Sakaaran Hivelings',
                'extension': 'World War Hulk'
            },
            {
                'name': 'Sapien League',
                'extension': 'X-Men'
            },
            {
                'name': 'Savage Land Mutates',
                'extension': 'Core Set'
            },
            {
                'name': 'Sentinel Squad O*N*E*',
                'extension': 'Messiah Complex'
            },
            {
                'name': 'Sentinels',
                'extension': 'Core Set'
            },
            {
                'name': 'Shi\'ar Death Commandos',
                'extension': 'X-Men'
            },
            {
                'name': 'Shi\'ar Patrol Craft',
                'extension': 'X-Men'
            },
            {
                'name': 'Sidera Maris, Bridge Builders',
                'extension': 'Into the Cosmos'
            },
            {
                'name': 'Spider-Infected',
                'extension': 'Secret Wars, Volume 2'
            },
            {
                'name': 'Spider-Slayer',
                'extension': 'Dimensions'
            },
            {
                'name': 'Ten Rings Fanatics',
                'extension': 'Marvel Studios, Phase 1'
            },
            {
                'name': 'The Brood',
                'extension': 'X-Men'
            },
            {
                'name': 'Thor Corps',
                'extension': 'Secret Wars, Volume 1'
            },
            {
                'name': 'Universal Church of Truth',
                'extension': 'Into the Cosmos'
            },
        ],
        'heroes': [
            {
                'name': 'Adam Warlock',
                'extension': 'Into the Cosmos',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Agent Phil Coulson',
                'extension': 'S.H.I.E.L.D.',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Agent Venom',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Agent X-13',
                'extension': 'Captain America 75th Anniversary',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Amadeus Cho ',
                'extension': 'World War Hulk',
                'teams': [
                    'Champions'
                ]
            },
            {
                'name': 'Angel',
                'extension': 'Dark City',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Angel Noir',
                'extension': 'Marvel Noir',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Ant-Man',
                'extension': 'Ant-Man',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Apocalyptic Kitty Pryde',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Arkon the Magnificent',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Aurora & Northstar',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Banshee',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Beast',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'Illuminati'
                ]
            },
            {
                'name': 'Beast',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Beta Ray Bill',
                'extension': 'Heroes of Asgard',
                'teams': [
                    'Heroes of Asgard'
                ]
            },
            {
                'name': 'Bishop',
                'extension': 'Dark City',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Black Bolt',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'Illuminati'
                ]
            },
            {
                'name': 'Black Bolt',
                'extension': 'Realm of Kings',
                'teams': [
                    'Inhumans'
                ]
            },
            {
                'name': 'Black Cat',
                'extension': 'Paint the Town Red',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Black Knight',
                'extension': 'Ant-Man',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Black Panther',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'Illuminati'
                ]
            },
            {
                'name': 'Black Swan',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'Cabal'
                ]
            },
            {
                'name': 'Black Widow',
                'extension': 'Black Widow',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Black Widow',
                'extension': 'Core Set',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Black Widow (Black Widow)',
                'extension': 'Marvel Studios, Phase 1',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Blade',
                'extension': 'Dark City',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Bob, Agent of Hydra',
                'extension': 'Deadpool',
                'teams': [
                    'HYDRA'
                ]
            },
            {
                'name': 'Brainstorm',
                'extension': 'Annihilation',
                'teams': [
                    'Microbadge: Legendary: Fantastic Four'
                ]
            },
            {
                'name': 'Bruce Banner ',
                'extension': 'World War Hulk',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Bullseye',
                'extension': 'Villains',
                'teams': [
                    'Crime Syndicate'
                ]
            },
            {
                'name': 'Cable',
                'extension': 'Dark City',
                'teams': [
                    'X-Force'
                ]
            },
            {
                'name': 'Caiera ',
                'extension': 'World War Hulk',
                'teams': [
                    'Warbound'
                ]
            },
            {
                'name': 'Cannonball',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Captain America',
                'extension': 'Core Set',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Captain America (Captain America)',
                'extension': 'Marvel Studios, Phase 1',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Captain America (Falcon)',
                'extension': 'Captain America 75th Anniversary',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Captain America 1941',
                'extension': 'Captain America 75th Anniversary',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Captain America, Secret Avenger',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Captain Britain',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'Illuminati'
                ]
            },
            {
                'name': 'Captain Mar-Vell',
                'extension': 'Into the Cosmos',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Captain Marvel',
                'extension': 'Revelations',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Captain Marvel',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Carnage',
                'extension': 'Venom',
                'teams': [
                    'Venomverse'
                ]
            },
            {
                'name': 'Clea',
                'extension': 'Doctor Strange and the Shadows of Nightmare',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Cloak & Dagger',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers',
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Colossus',
                'extension': 'Dark City',
                'teams': [
                    'X-Force'
                ]
            },
            {
                'name': 'Colossus & Wolverine',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Corvus Glaive',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'Cabal'
                ]
            },
            {
                'name': 'Crystal',
                'extension': 'Realm of Kings',
                'teams': [
                    'Inhumans'
                ]
            },
            {
                'name': 'Cyclops',
                'extension': 'Core Set',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Daredevil',
                'extension': 'Dark City',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Daredevil',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers',
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Daredevil Noir',
                'extension': 'Marvel Noir',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Darkhawk',
                'extension': 'Revelations',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Dazzler',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Deadpool',
                'extension': 'Core Set',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Deadpool',
                'extension': 'Deadpool',
                'teams': [
                    'Mercs for Money'
                ]
            },
            {
                'name': 'Deathlok',
                'extension': 'S.H.I.E.L.D.',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Doctor Strange',
                'extension': 'Doctor Strange and the Shadows of Nightmare',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Doctor Voodoo',
                'extension': 'Doctor Strange and the Shadows of Nightmare',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Domino',
                'extension': 'Dark City',
                'teams': [
                    'X-Force'
                ]
            },
            {
                'name': 'Dr Punisher, Soldier Supreme',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Dr. Octopus',
                'extension': 'Villains',
                'teams': [
                    'Sinister Six'
                ]
            },
            {
                'name': 'Dr. Strange',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'Illuminati'
                ]
            },
            {
                'name': 'Drax',
                'extension': 'Marvel Studios\' Guardians of the Galaxy',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'Drax the Destroyer',
                'extension': 'Guardians of the Galaxy',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'Electro',
                'extension': 'Villains',
                'teams': [
                    'Sinister Six'
                ]
            },
            {
                'name': 'Elektra',
                'extension': 'Dark City',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Elsa Bloodstone',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Emma Frost',
                'extension': 'Core Set',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Enchantress',
                'extension': 'Villains',
                'teams': [
                    'Foes of Asgard'
                ]
            },
            {
                'name': 'Falcon',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Falcon & Winter Soldier',
                'extension': 'Black Widow',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Fantastic Four United',
                'extension': 'Annihilation',
                'teams': [
                    'Microbadge: Legendary: Fantastic Four'
                ]
            },
            {
                'name': 'Forge',
                'extension': 'Dark City',
                'teams': [
                    'X-Force'
                ]
            },
            {
                'name': 'Gambit',
                'extension': 'Core Set',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Gamora',
                'extension': 'Marvel Studios\' Guardians of the Galaxy',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'Gamora',
                'extension': 'Guardians of the Galaxy',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'General Okoye',
                'extension': 'Black Panther',
                'teams': [
                    'Heroes of Wakanda "Wakanda Forever!"'
                ]
            },
            {
                'name': 'Ghost Rider',
                'extension': 'Dark City',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Gladiator Hulk ',
                'extension': 'World War Hulk',
                'teams': [
                    'Warbound'
                ]
            },
            {
                'name': 'Goliath',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Gorgon',
                'extension': 'Realm of Kings',
                'teams': [
                    'Inhumans'
                ]
            },
            {
                'name': 'Green Goblin',
                'extension': 'Villains',
                'teams': [
                    'Sinister Six'
                ]
            },
            {
                'name': 'Greithoth, Breaker of Wills',
                'extension': 'Fear Itself',
                'teams': [
                    'Foes of Asgard'
                ]
            },
            {
                'name': 'Groot',
                'extension': 'Guardians of the Galaxy',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'Gwenpool',
                'extension': 'Champions',
                'teams': [
                    'Champions'
                ]
            },
            {
                'name': 'Happy Hogan',
                'extension': 'Spider-Man Homecoming',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Havok',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Hawkeye',
                'extension': 'Core Set',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Hawkeye (Hawkeye)',
                'extension': 'Marvel Studios, Phase 1',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Hellcat',
                'extension': 'Revelations',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Heralds of Galactus',
                'extension': 'Annihilation',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Hercules',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Hightech Spider-Man',
                'extension': 'Spider-Man Homecoming',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Hiroim ',
                'extension': 'World War Hulk',
                'teams': [
                    'Warbound'
                ]
            },
            {
                'name': 'Howard the Duck',
                'extension': 'Dimensions',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Hulk',
                'extension': 'Core Set',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Hulk (Hulk)',
                'extension': 'Marvel Studios, Phase 1',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Hulkbuster Iron Man ',
                'extension': 'World War Hulk',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Hulkling',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Human Torch',
                'extension': 'Fantastic Four',
                'teams': [
                    'Fantastic Four'
                ]
            },
            {
                'name': 'Iceman',
                'extension': 'Dark City',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Invisible Woman',
                'extension': 'Fantastic Four',
                'teams': [
                    'Fantastic Four'
                ]
            },
            {
                'name': 'Iron Fist',
                'extension': 'Dark City',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Iron Man',
                'extension': 'Core Set',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Iron Man (Iron Man)',
                'extension': 'Marvel Studios, Phase 1',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Iron Man Noir',
                'extension': 'Marvel Noir',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Jean Grey',
                'extension': 'Dark City',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Jessica Jones',
                'extension': 'Dimensions',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Jocasta',
                'extension': 'Ant-Man',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Joe Fix-It, Grey Hulk ',
                'extension': 'World War Hulk',
                'teams': [
                    'Crime Syndicate'
                ]
            },
            {
                'name': 'Jubilee',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Juggernaut',
                'extension': 'Villains',
                'teams': [
                    'Brotherhood'
                ]
            },
            {
                'name': 'Karma',
                'extension': 'The New Mutants',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Karnak',
                'extension': 'Realm of Kings',
                'teams': [
                    'Inhumans'
                ]
            },
            {
                'name': 'King Black Panther',
                'extension': 'Black Panther',
                'teams': [
                    'Heroes of Wakanda "Wakanda Forever!"'
                ]
            },
            {
                'name': 'Kingpin',
                'extension': 'Villains',
                'teams': [
                    'Crime Syndicate'
                ]
            },
            {
                'name': 'Kitty Pryde',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Korg ',
                'extension': 'World War Hulk',
                'teams': [
                    'Warbound'
                ]
            },
            {
                'name': 'Kraven',
                'extension': 'Villains',
                'teams': [
                    'Sinister Six'
                ]
            },
            {
                'name': 'Kuurth, Breaker of Stone',
                'extension': 'Fear Itself',
                'teams': [
                    'Foes of Asgard'
                ]
            },
            {
                'name': 'Lady Sif',
                'extension': 'Heroes of Asgard',
                'teams': [
                    'Heroes of Asgard'
                ]
            },
            {
                'name': 'Lady Thor',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Legion',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Loki',
                'extension': 'Villains',
                'teams': [
                    'Foes of Asgard'
                ]
            },
            {
                'name': 'Longshot',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Luke Cage',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers',
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Luke Cage Noir',
                'extension': 'Marvel Noir',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'M',
                'extension': 'Messiah Complex',
                'teams': [
                    'X-Factor'
                ]
            },
            {
                'name': 'Magik',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Magneto',
                'extension': 'Villains',
                'teams': [
                    'Brotherhood'
                ]
            },
            {
                'name': 'Man-Thing',
                'extension': 'Dimensions',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Mantis',
                'extension': 'Marvel Studios\' Guardians of the Galaxy',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'Maximus',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'Cabal'
                ]
            },
            {
                'name': 'Medusa',
                'extension': 'Realm of Kings',
                'teams': [
                    'Inhumans'
                ]
            },
            {
                'name': 'Miek the Unhived ',
                'extension': 'World War Hulk',
                'teams': [
                    'Warbound'
                ]
            },
            {
                'name': 'Mirage',
                'extension': 'The New Mutants',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Mockingbird',
                'extension': 'S.H.I.E.L.D.',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Moon Knight',
                'extension': 'Paint the Town Red',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Moondragon',
                'extension': 'Into the Cosmos',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Mr Fantastic',
                'extension': 'Fantastic Four',
                'teams': [
                    'Fantastic Four'
                ]
            },
            {
                'name': 'Ms. America',
                'extension': 'Dimensions',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Ms. Marvel',
                'extension': 'Champions',
                'teams': [
                    'Champions'
                ]
            },
            {
                'name': 'Multiple Man',
                'extension': 'Messiah Complex',
                'teams': [
                    'X-Factor'
                ]
            },
            {
                'name': 'Mysterio',
                'extension': 'Villains',
                'teams': [
                    'Sinister Six'
                ]
            },
            {
                'name': 'Mystique',
                'extension': 'Villains',
                'teams': [
                    'Brotherhood'
                ]
            },
            {
                'name': 'Namor',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'Cabal'
                ]
            },
            {
                'name': 'Namora ',
                'extension': 'World War Hulk',
                'teams': [
                    'Champions'
                ]
            },
            {
                'name': 'Nebula',
                'extension': 'Into the Cosmos',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'Nerkkod, Breaker of Oceans',
                'extension': 'Fear Itself',
                'teams': [
                    'Foes of Asgard'
                ]
            },
            {
                'name': 'Nick Fury',
                'extension': 'Core Set',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Nick Fury (Nick Fury)',
                'extension': 'Marvel Studios, Phase 1',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Nightcrawler',
                'extension': 'Dark City',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'No-Name, Brood Queen ',
                'extension': 'World War Hulk',
                'teams': [
                    'Warbound'
                ]
            },
            {
                'name': 'Nova',
                'extension': 'Champions',
                'teams': [
                    'Champions'
                ]
            },
            {
                'name': 'Nova',
                'extension': 'Into the Cosmos',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Nul, Breaker of Worlds',
                'extension': 'Fear Itself',
                'teams': [
                    'Foes of Asgard'
                ]
            },
            {
                'name': 'Old Man Logan',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Patriot',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Peter Parker',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers',
                    'Spider Friends'
                ]
            },
            {
                'name': 'Peter Parker, Homecoming',
                'extension': 'Spider-Man Homecoming',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Peter\'s Allies',
                'extension': 'Spider-Man Homecoming',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Phoenix',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Phoenix Force Cyclops',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Photon',
                'extension': 'Revelations',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Phyla-Vell',
                'extension': 'Into the Cosmos',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'Polaris',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Princess Shuri',
                'extension': 'Black Panther',
                'teams': [
                    'Heroes of Wakanda "Wakanda Forever!"'
                ]
            },
            {
                'name': 'Professor X',
                'extension': 'Dark City',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Proxima Midnight',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'Cabal'
                ]
            },
            {
                'name': 'Psi-Lord',
                'extension': 'Annihilation',
                'teams': [
                    'Microbadge: Legendary: Fantastic Four'
                ]
            },
            {
                'name': 'Psylocke',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Punisher',
                'extension': 'Dark City',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Quake',
                'extension': 'S.H.I.E.L.D.',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Quasar',
                'extension': 'Into the Cosmos',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Queen Storm of Wakanda',
                'extension': 'Black Panther',
                'teams': [
                    'Heroes of Wakanda "Wakanda Forever!"'
                ]
            },
            {
                'name': 'Quicksilver',
                'extension': 'Revelations',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Red Guardian',
                'extension': 'Black Widow',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Rick Jones ',
                'extension': 'World War Hulk',
                'teams': [
                    'S.H.I.E.L.D.',
                    'The Avengers'
                ]
            },
            {
                'name': 'Rictor',
                'extension': 'Messiah Complex',
                'teams': [
                    'X-Factor'
                ]
            },
            {
                'name': 'Rocket and Groot',
                'extension': 'Marvel Studios\' Guardians of the Galaxy',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'Rocket Raccoon',
                'extension': 'Guardians of the Galaxy',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'Rogue',
                'extension': 'Core Set',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Ronan the Accuser',
                'extension': 'Into the Cosmos',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Ronin',
                'extension': 'Revelations',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Ruby Summers',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Sabretooth',
                'extension': 'Villains',
                'teams': [
                    'Brotherhood'
                ]
            },
            {
                'name': 'Scarlet Spider',
                'extension': 'Paint the Town Red',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Scarlet Witch',
                'extension': 'Revelations',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Sentry ',
                'extension': 'World War Hulk',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Shang-Chi',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'Shatterstar',
                'extension': 'Messiah Complex',
                'teams': [
                    'X-Force'
                ]
            },
            {
                'name': 'She-Hulk ',
                'extension': 'World War Hulk',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Silk',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Silver Surfer',
                'extension': 'Fantastic Four',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Siryn',
                'extension': 'Messiah Complex',
                'teams': [
                    'X-Factor'
                ]
            },
            {
                'name': 'Skaar, Son of Hulk ',
                'extension': 'World War Hulk',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Skadi',
                'extension': 'Fear Itself',
                'teams': [
                    'HYDRA'
                ]
            },
            {
                'name': 'Skirn, Breaker of Men',
                'extension': 'Fear Itself',
                'teams': [
                    'Foes of Asgard'
                ]
            },
            {
                'name': 'Slapstick',
                'extension': 'Deadpool',
                'teams': [
                    'Mercs for Money'
                ]
            },
            {
                'name': 'Solo',
                'extension': 'Deadpool',
                'teams': [
                    'Mercs for Money'
                ]
            },
            {
                'name': 'Soulsword Colossus',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Speed',
                'extension': 'Revelations',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Speedball',
                'extension': 'Civil War',
                'teams': [
                    'New Warriors'
                ]
            },
            {
                'name': 'Spider-Gwen',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Spider-Man',
                'extension': 'Core Set',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Spider-Man Noir',
                'extension': 'Marvel Noir',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Spider-Woman',
                'extension': 'Paint the Town Red',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Squirrel Girl',
                'extension': 'Dimensions',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Star-Lord',
                'extension': 'Marvel Studios\' Guardians of the Galaxy',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'Star-Lord',
                'extension': 'Guardians of the Galaxy',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
            {
                'name': 'Stature',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Stepford Cuckoos',
                'extension': 'Messiah Complex',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Steve Rogers, Director of S.H.I.E.L.D.',
                'extension': 'Captain America 75th Anniversary',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Stingray',
                'extension': 'Deadpool',
                'teams': [
                    'Mercs for Money'
                ]
            },
            {
                'name': 'Storm',
                'extension': 'Core Set',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Storm & Black Panther',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers',
                    'X-Men'
                ]
            },
            {
                'name': 'Strong Guy',
                'extension': 'Messiah Complex',
                'teams': [
                    'X-Factor'
                ]
            },
            {
                'name': 'Sunspot',
                'extension': 'The New Mutants',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Super-Skrull',
                'extension': 'Annihilation',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Superior Iron Man',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'Illuminati'
                ]
            },
            {
                'name': 'Symbiote Spider-Man',
                'extension': 'Paint the Town Red',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Thanos',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'Cabal'
                ]
            },
            {
                'name': 'The Ancient One',
                'extension': 'Doctor Strange and the Shadows of Nightmare',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'The Captain and the Devil',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'The Vishanti',
                'extension': 'Doctor Strange and the Shadows of Nightmare',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'The Warriors Three',
                'extension': 'Heroes of Asgard',
                'teams': [
                    'Heroes of Asgard'
                ]
            },
            {
                'name': 'Thing',
                'extension': 'Fantastic Four',
                'teams': [
                    'Fantastic Four'
                ]
            },
            {
                'name': 'Thor',
                'extension': 'Heroes of Asgard',
                'teams': [
                    'Heroes of Asgard'
                ]
            },
            {
                'name': 'Thor',
                'extension': 'Core Set',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Thor (Thor)',
                'extension': 'Marvel Studios, Phase 1',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Tigra',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Time-Traveling Jean Grey',
                'extension': 'Secret Wars, Volume 2',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Tony Stark',
                'extension': 'Spider-Man Homecoming',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Totally Awesome Hulk',
                'extension': 'Champions',
                'teams': [
                    'Champions'
                ]
            },
            {
                'name': 'Ultimate Spider-Man',
                'extension': 'Secret Wars, Volume 1',
                'teams': [
                    'Spider Friends'
                ]
            },
            {
                'name': 'Ultron',
                'extension': 'Villains',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Valkyrie',
                'extension': 'Heroes of Asgard',
                'teams': [
                    'Heroes of Asgard'
                ]
            },
            {
                'name': 'Venom',
                'extension': 'Villains',
                'teams': [
                    'Sinister Six'
                ]
            },
            {
                'name': 'Venom',
                'extension': 'Venom',
                'teams': [
                    'Venomverse'
                ]
            },
            {
                'name': 'Venom Rocket',
                'extension': 'Venom',
                'teams': [
                    'Venomverse'
                ]
            },
            {
                'name': 'Venomized Dr. Strange',
                'extension': 'Venom',
                'teams': [
                    'Venomverse'
                ]
            },
            {
                'name': 'Venompool',
                'extension': 'Venom',
                'teams': [
                    'Venomverse'
                ]
            },
            {
                'name': 'Vision',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Viv Vision',
                'extension': 'Champions',
                'teams': [
                    'Champions'
                ]
            },
            {
                'name': 'War Machine',
                'extension': 'Revelations',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Warlock',
                'extension': 'The New Mutants',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Warpath',
                'extension': 'Messiah Complex',
                'teams': [
                    'X-Force'
                ]
            },
            {
                'name': 'Wasp',
                'extension': 'Ant-Man',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'White Tiger',
                'extension': 'Black Widow',
                'teams': [
                    'Marvel Knights'
                ]
            },
            {
                'name': 'White Wolf',
                'extension': 'Black Panther',
                'teams': [
                    'Heroes of Wakanda "Wakanda Forever!"'
                ]
            },
            {
                'name': 'Wiccan',
                'extension': 'Civil War',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'Winter Soldier',
                'extension': 'Captain America 75th Anniversary',
                'teams': [
                    ''
                ]
            },
            {
                'name': 'Wolfsbane',
                'extension': 'The New Mutants',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Wolverine',
                'extension': 'Dark City',
                'teams': [
                    'X-Force'
                ]
            },
            {
                'name': 'Wolverine',
                'extension': 'Core Set',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Wonder Man',
                'extension': 'Ant-Man',
                'teams': [
                    'The Avengers'
                ]
            },
            {
                'name': 'X-23',
                'extension': 'X-Men',
                'teams': [
                    'X-Men'
                ]
            },
            {
                'name': 'Yelena Belova',
                'extension': 'Black Widow',
                'teams': [
                    'S.H.I.E.L.D.'
                ]
            },
            {
                'name': 'Yondu',
                'extension': 'Into the Cosmos',
                'teams': [
                    'Guardians of the Galaxy'
                ]
            },
        ]
    };
