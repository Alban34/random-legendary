const parseMultiTeams = (value) => {
    const searchFor = 'Microbadge: Legendary fan - ';
    const regEscape = v => v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

    return value.split(new RegExp(regEscape(searchFor), "ig")).filter(v => v !== '').map(v => {
        if (v.indexOf(' Team') > -1) {
            return v.substring(0, v.indexOf(' Team'));
        }
        if (v.indexOf(' team') > -1) {
            return v.substring(0, v.indexOf(' team'));
        }
        return '';
    });
};

const flattenHeroTeams = (heroes) => {
    let flatHeroes = '';
    heroes.forEach(e => flatHeroes += '\n\'' + e.replace(/'/g, '\\\'') + '\',');
    flatHeroes = flatHeroes.substring(0, flatHeroes.length -1) + '\n';
    return flatHeroes;
}


const toParse = [


    /*
    {
            'setName': 'TEMPLATE',
            'heroes': `

    `,
            'masterminds': `


    `,
            'schemes': `


    `,
            'villains': `


    `,
            'henchmen': `


    `
        },
*/

    {
            'setName': 'Venom',
            'heroes': `
Microbadge: Legendary fan - Venomverse Team Carnage
Microbadge: Legendary fan - Venomverse Team Venom
Microbadge: Legendary fan - Venomverse Team Venom Rocket
Microbadge: Legendary fan - Venomverse Team Venomized Dr. Strange
Microbadge: Legendary fan - Venomverse Team Venompool
    `,
            'masterminds': `

Poison Thanos
Hybrid
    `,
            'schemes': `
Invasion of the Venom Symbiotes
Maximum Carnage
Paralyzing Venom
Symbiotic Absorption

    `,
            'villains': `
Life Foundation
Poisons

    `,
            'henchmen': `


    `
        },

    {
            'setName': 'Spider-Man Homecoming',
            'heroes': `
Happy Hogan
Microbadge: Legendary fan - Spider Friends Team Hightech Spider-Man
Microbadge: Legendary fan - Spider Friends Team Peter's Allies
Microbadge: Legendary fan - Spider Friends Team Peter Parker, Homecoming
Microbadge: Legendary fan - The Avengers Team Tony Stark
    `,
            'masterminds': `
Adrian Toomes
Vulture


    `,
            'schemes': `

Distract the Hero
Explosion at the Washington Monument
Ferry Disaster
Scavenge Alien Weaponry
    `,
            'villains': `
Salvagers
Vulture Tech

    `,
            'henchmen': `


    `
        },

    {
            'setName': 'Realm of Kings',
            'heroes': `
Microbadge: Legendary fan - Inhumans Team Black Bolt
Microbadge: Legendary fan - Inhumans Team Crystal
Microbadge: Legendary fan - Inhumans Team Gorgon
Microbadge: Legendary fan - Inhumans Team Karnak
Microbadge: Legendary fan - Inhumans Team Medusa
    `,
            'masterminds': `
Maximus the Mad
Emperor Vulcan of the Shi'Ar

    `,
            'schemes': `
Devolve with Xerogen Crystals
Tornado of Terrigen Mists
Ruin the Perfect Wedding
War of Kings

    `,
            'villains': `
Inhuman Rebellion
Shi'Ar Imperial Elite

    `,
            'henchmen': `


    `
        },

    {
            'setName': `Marvel Studios\\\' Guardians of the Galaxy`,
            'heroes': `
Microbadge: Legendary fan - Guardians of the Galaxy team Drax
Microbadge: Legendary fan - Guardians of the Galaxy team Gamora
Microbadge: Legendary fan - Guardians of the Galaxy team Mantis
Microbadge: Legendary fan - Guardians of the Galaxy team Rocket and Groot
Microbadge: Legendary fan - Guardians of the Galaxy team Star-Lord
    `,
            'masterminds': `

Ronan the Accuser
Ego, The Living Planet
    `,
            'schemes': `
Provoke the Sovereign War Fleet
Unleash the Abilisk Space Monster
Inescapable "Kyln" Space Prison
Star-Lord's Awesome Mix Tape

    `,
            'villains': `
Ravagers
Followers of Ronan

    `,
            'henchmen': `


    `
        },


    {
            'setName': 'Dimensions',
            'heroes': `
Howard the Duck
Microbadge: Legendary fan - Marvel Knights team Jessica Jones
Man-Thing
Microbadge: Legendary fan - The Avengers Team Ms. America
Microbadge: Legendary fan - The Avengers Team Squirrel Girl
    `,
            'masterminds': `
J. Jonah Jameson

    `,
            'schemes': `


    `,
            'villains': `


    `,
            'henchmen': `

Circus of Crime
Spider-Slayer
    `
        },

    {
            'setName': 'Annihilation',
            'heroes': `
Microbadge: Legendary: Fantastic Four team Brainstorm
Microbadge: Legendary: Fantastic Four team Fantastic Four United
Heralds of Galactus
Microbadge: Legendary: Fantastic Four team Psi-Lord
Super-Skrull
    `,
            'masterminds': `
Annihilus
Kang the Conqueror

    `,
            'schemes': `
Pulse Waves from the Negative Zone
Sneak Attack the Heroes' Homes
Put Humanity on Trial
Breach Parallel Dimensions

    `,
            'villains': `
Annihilation Wave
Timelines of Kang

    `,
            'henchmen': `


    `
        },


    {
            'setName': 'Marvel Noir',
            'heroes': `
Microbadge: Legendary fan - X-Men Team Angel Noir
Microbadge: Legendary fan - Marvel Knights team Daredevil Noir
Microbadge: Legendary fan - The Avengers Team Iron Man Noir
Microbadge: Legendary fan - Marvel Knights team Luke Cage Noir
Microbadge: Legendary fan - Spider Friends Team Spider-Man Noir
    `,
            'masterminds': `
Charles Xavier, Professor of Crime
The Goblin, Underworld Boss

    `,
            'schemes': `

Hidden Heart of Darkness
Silence the Witnesses
Five Families of Crime
Find the Split Personality Killer
    `,
            'villains': `
Goblin's Freak Show
X-Men Noir

    `,
            'henchmen': `


    `
        },


    {
            'setName': 'Deadpool',
            'heroes': `
Microbadge: Legendary fan - HYDRA Team Bob, Agent of Hydra
Microbadge: Legendary fan - Mercs for Money Team Deadpool
Microbadge: Legendary fan - Mercs for Money Team Slapstick
Microbadge: Legendary fan - Mercs for Money Team Solo
Microbadge: Legendary fan - Mercs for Money Team Stingray
    `,
            'masterminds': `
Evil Deadpool
Macho Gomez

    `,
            'schemes': `
Deadpool Kills the Marvel Universe
Deadpool Wants a Chimichanga
Deadpool Writes a Scheme
Everybody Hates Deadpool

    `,
            'villains': `
Deadpool's "Friends"
Evil Deadpool Corpse

    `,
            'henchmen': `


    `
        },


    {
            'setName': 'Captain America 75th Anniversary',
            'heroes': `
Microbadge: Legendary fan - S.H.I.E.L.D. Team Agent X-13
Microbadge: Legendary fan - The Avengers Team Captain America 1941
Microbadge: Legendary fan - The Avengers Team Captain America (Falcon)
Microbadge: Legendary fan - S.H.I.E.L.D. Team Steve Rogers, Director of S.H.I.E.L.D.
Winter Soldier
    `,
            'masterminds': `

Arnim Zola
Baron Heinrich Zemo
    `,
            'schemes': `

Brainwash the Military
Change the Outcome of WWII
Go Back in Time to Slay Heroes' Ancestors
The Unbreakable Enigma Code
    `,
            'villains': `
Zola's Creations
Masters of Evil (WWII)

    `,
            'henchmen': `


    `
        },


    {
            'setName': 'Fear Itself',
            'heroes': `
Microbadge: Legendary fan - Foes of Asgard Team Greithoth, Breaker of Wills
Microbadge: Legendary fan - Foes of Asgard Team Kuurth, Breaker of Stone
Microbadge: Legendary fan - Foes of Asgard Team Nerkkod, Breaker of Oceans
Microbadge: Legendary fan - Foes of Asgard Team Nul, Breaker of Worlds
Microbadge: Legendary fan - HYDRA Team Skadi
Microbadge: Legendary fan - Foes of Asgard Team Skirn, Breaker of Men
    `,
            'masterminds': `

Uru-Enchanted Iron Man
    `,
            'schemes': `
Fear Itself
Last Stand at Avengers Tower
The Traitor

    `,
            'villains': `

The Mighty
    `,
            'henchmen': `


    `
        },


    {
            'setName': 'Villains',
            'heroes': `
Microbadge: Legendary fan - Crime Syndicate Team Bullseye
Microbadge: Legendary fan - Sinister Six Team Dr. Octopus
Microbadge: Legendary fan - Sinister Six Team Electro
Microbadge: Legendary fan - Foes of Asgard Team Enchantress
Microbadge: Legendary fan - Sinister Six Team Green Goblin
Microbadge: Legendary fan - Brotherhood Team Juggernaut
Microbadge: Legendary fan - Crime Syndicate Team Kingpin
Microbadge: Legendary fan - Sinister Six Team Kraven
Microbadge: Legendary fan - Foes of Asgard Team Loki
Microbadge: Legendary fan - Brotherhood Team Magneto
Microbadge: Legendary fan - Sinister Six Team Mysterio
Microbadge: Legendary fan - Brotherhood Team Mystique
Microbadge: Legendary fan - Brotherhood Team Sabretooth
Ultron
Microbadge: Legendary fan - Sinister Six Team Venom
    `,
            'masterminds': `
Dr. Strange
Nick Fury
Odin
Professor X

    `,
            'schemes': `
Build an Underground Mega-Vault Prison
Cage Villains in Power-Suppressing Cells
Crown Thor King of Asgard
Crush Hydra
Graduation at Xavier's X-Academy
Infiltrate the Lair with Spies
Mass Produce War Machine Armor
Resurrect Heroes with the Norn Stones

    `,
            'villains': `

Avengers
Defenders
Marvel Knights
Spider Friends
Uncanny Avengers
Uncanny X-Men
X-Men First Class
    `,
            'henchmen': `
Asgardian Warriors
Cops
Multiple Man
S.H.I.E.L.D. Assault Squad

    `
        },



        {
            'setName': 'Fantastic Four',
            'heroes': `
Microbadge: Legendary fan - Fantastic Four Team Mr Fantastic
Microbadge: Legendary fan - Fantastic Four Team Invisible Woman
Microbadge: Legendary fan - Fantastic Four Team Thing
Microbadge: Legendary fan - Fantastic Four Team Human Torch
Silver Surfer
    `,
            'masterminds': `

Galactus
Mole Man
    `,
            'schemes': `

Bathe Earth in Cosmic Rays
Flood the Planet with Melted Glaciers
Invincible Force Field
Pull Reality into the Negative Zone
    `,
            'villains': `
Heralds of Galactus
Subterranea

    `,
            'henchmen': `


    `
        },




   {
        'setName': 'Black Widow',
        'heroes': `
Microbadge: Legendary fan - S.H.I.E.L.D. Team Black Widow
Microbadge: Legendary fan - The Avengers Team Falcon & Winter Soldier
Red Guardian
Microbadge: Legendary fan - Marvel Knights team White Tiger
Microbadge: Legendary fan - S.H.I.E.L.D. Team Yelena Belova
`,
        'masterminds': `
Indestructible Man
Taskmaster

`,
        'schemes': `
Corrupt the Spy Agencies
Frame Heroes for Murder
Sniper Rifle Assassins
Train Black Widows in the Red Room

`,
        'villains': `
Elite Assassins
Taskmaster's Thunderbolts

`,
        'henchmen': `


`
    },


   {
        'setName': 'Into the Cosmos',
        'heroes': `
Microbadge: Legendary fan - The Avengers Team Adam Warlock
Microbadge: Legendary fan - The Avengers Team Captain Mar-Vell
Microbadge: Legendary fan - The Avengers Team Moondragon
Microbadge: Legendary fan - Guardians of the Galaxy team Nebula
Microbadge: Legendary fan - The Avengers Team Nova
Microbadge: Legendary fan - Guardians of the Galaxy team Phyla-Vell
Microbadge: Legendary fan - The Avengers Team Quasar
Ronan the Accuser
Microbadge: Legendary fan - Guardians of the Galaxy team Yondu
`,
        'masterminds': `
The Beyonder
Grandmaster
Magus

`,
        'schemes': `
Annihilation:Conquest
The Contest of Champions
Destroy the Nova Corps
Turn the Soul of Adam Warlock

`,
        'villains': `
Black Order of Thanos
Celestials
Elders of the Universe
From Beyond

`,
        'henchmen': `
Sidera Maris, Bridge Builders
Universal Church of Truth

`
    },


{
        'setName': 'Revelations',
        'heroes': `
Microbadge: Legendary fan - S.H.I.E.L.D. Team Captain Marvel - Agent of S.H.I.E.L.D.
Microbadge: Legendary fan - The Avengers Team Darkhawk
Microbadge: Legendary fan - The Avengers Team Hellcat
Microbadge: Legendary fan - The Avengers Team Photon
Microbadge: Legendary fan - The Avengers Team Quicksilver
Microbadge: Legendary fan - The Avengers Team Ronin
Microbadge: Legendary fan - The Avengers Team Scarlet Witch
Microbadge: Legendary fan - The Avengers Team Speed
Microbadge: Legendary fan - The Avengers Team War Machine
`,
        'masterminds': `
Grim Reaper
The Hood
Mandarin

`,
        'schemes': `
Earthquake Drains the Ocean / Tsunami Crushes the Coast
House of M / No More Mutants
The Korvac Saga / Korvac Revealed
Secret HYDRA Corruption / Open HYDRA Revolution

`,
        'villains': `
Army of Evil
Dark Avengers
Hood's Gang
Lethal Legion

`,
        'henchmen': `

Mandarin's Rings
Hydra Base

`
    },



    {
        'setName': 'Core Set',
        'heroes': `
Microbadge: Legendary fan - The Avengers Team Black Widow - (1 Silent Sniper, 3 Covert Operation, 5 Dangerous Rescue, 5 Mission Accomplished)
Microbadge: Legendary fan - The Avengers Team Captain America - (1 A Day Unlike Any Other, 3 Diving Block, 5 Avengers Assemble!, 5 Perfect Teamwork)
Microbadge: Legendary fan - X-Men Team Cyclops - (1 X-Men United, 3 Unending Energy, 5 Optic Blast, 5 Determination)
Deadpool - (1 Random Acts of Unkindness; 3 Hey, Can I Get a Do Over; 5 Oddball; 5 Here, Hold This For a Second)
Microbadge: Legendary fan - X-Men Team Emma Frost - (1 Diamond Form, 3 Psychic Link, 5 Mental Discipline, 5 Shadowed Thoughts)
Microbadge: Legendary fan - X-Men Team Gambit - (1 High Stakes Jackpot, 3 Hypnotic Charm, 5 Card Shark, 5 Stack the Deck)
Microbadge: Legendary fan - The Avengers Team Hawkeye - (1 Impossible Trick Shot, 3 Covering Fire, 5 Quick Draw, 5 Team Player)
Microbadge: Legendary fan - The Avengers Team Hulk - (1 Hulk Smash, 3 Crazed Rampage, 5 Unstoppable Hulk, 5 Growing Anger)
Microbadge: Legendary fan - The Avengers Team Iron Man - (1 Quantum Breakthrough, 3 Arc Reactor, 5 Repulsor Rays, 5 Endless Invention)
Microbadge: Legendary fan - S.H.I.E.L.D. Team Nick Fury - (1 Pure Fury, 3 Legendary Commander, 5 Battlefield Promotion, 5 High-Tech Weaponry)
Microbadge: Legendary fan - X-Men Team Rogue - (1 Steal Abilities, 3 Copy Powers, 5 Borrowed Brawn, 5 Energy Drain)
Microbadge: Legendary fan - Spider Friends Team Spider-Man - (1 The Amazing Spider Man, 3 Web Shooters, 5 Great Responsibility, 5 Astonishing Strength)
Microbadge: Legendary fan - X-Men Team Storm - (1 Tidal Wave, 3 Spinning Cyclone, 5 Lightning Bolt, 5 Gathering Stormclouds)
Microbadge: Legendary fan - The Avengers Team Thor - (1 God of Thunder, 3 Call Lightning, 5 Surge of Power, 5 Odinson)
Microbadge: Legendary fan - X-Men Team Wolverine - (1 Berserker Rage, 3 Frenzied Slashing, 5 Healing Factor, 5 Keen Senses)
`,
        'masterminds': `
Dr. Doom
Loki
Magneto
Red Skull
`,
        'schemes': `
The Legacy Virus
Midtown Bank Robbery
Negative Zone Prison Breakout
Portals to the Dark Dimension
Replace Earth's Leaders with Killbots
Secret Invasion of the Skrull Shapeshifters
Super Hero Civil War
Unleash the Power of the Cosmic Cube
`,
        'villains': `
Brotherhood
Enemies of Asgard
HYDRA
Masters of Evil
Radiation
Skrulls
Spider Foes
`,
        'henchmen': `
Doombot Legion
Hand Ninjas
Savage Land Mutates
Sentinels
`
    },

    {
        'setName': 'World War Hulk',
        'heroes': `
Microbadge: Legendary fan - Champions Team Amadeus Cho (+5)
Microbadge: Legendary fan - The Avengers Team Bruce Banner (+5)
Microbadge: Legendary fan - Warbound Team Caiera (+1)
Microbadge: Legendary fan - Warbound Team Gladiator Hulk (+5)
Microbadge: Legendary fan - Warbound Team Hiroim (+5)
Microbadge: Legendary fan - The Avengers Team Hulkbuster Iron Man (+3)
Microbadge: Legendary fan - Crime Syndicate Team Joe Fix-It, Grey Hulk (+3)
Microbadge: Legendary fan - Warbound Team Korg (+3)
Microbadge: Legendary fan - Warbound Team Miek the Unhived (+1)
Microbadge: Legendary fan - Champions Team Namora (+3)
Microbadge: Legendary fan - Warbound Team No-Name, Brood Queen (+3)
Microbadge: Legendary fan - S.H.I.E.L.D. TeamMicrobadge: Legendary fan - The Avengers Team Rick Jones (+9)
Microbadge: Legendary fan - The Avengers Team Sentry (+8)
Microbadge: Legendary fan - The Avengers Team She-Hulk (+5)
Microbadge: Legendary fan - The Avengers Team Skaar, Son of Hulk (+3)
`,
        'masterminds': `
General "Thunderbolt" Ross / Red Hulk
Illuminati, Secret Society
King Hulk, Sakaarson
M.O.D.O.K.
The Red King
The Sentry / The Void
`,
        'schemes': `
Break the Planet Asunder
Cytoplasm Spike Invasion
Fall of the Hulks
Gladiator Pits of Sakaar
Mutating Gamma Rays
Shoot Hulk into Space
Subjugate With Obedience Disks
World War Hulk
`,
        'villains': `
Aspects of the Void
Code Red
Illuminati
Intelligencia
Sakaar Imperial Guard
U-Foes
Warbound
`,
        'henchmen': `
Cytoplasmic Spikes
Death's Heads
Sakaaran Hivelings
`
    },

    {
        'setName': 'Ant-Man',
        'heroes': `
Microbadge: Legendary fan - The Avengers Team Ant-Man
Microbadge: Legendary fan - The Avengers Team Black Knight
Microbadge: Legendary fan - The Avengers Team Jocasta
Microbadge: Legendary fan - The Avengers Team Wasp
Microbadge: Legendary fan - The Avengers Team Wonder Man
`,
        'masterminds': `
Morgan Le Fay
Ultron
`,
        'villains': `
Queen's Vengeance
Ultron’s Legacy
`,
        'henchmen': `

`,
        'schemes': `
Age of Ultron
Pull Earth Into Medieval Times
Trap Heroes In The Microverse
Transform Commuters Into Giant Ants
`
    },

    {
        'setName': 'Champions',
        'heroes': `
Microbadge: Legendary fan - Champions Team Gwenpool
Microbadge: Legendary fan - Champions Team Ms. Marvel
Microbadge: Legendary fan - Champions Team Nova
Microbadge: Legendary fan - Champions Team Totally Awesome Hulk
Microbadge: Legendary fan - Champions Team Viv Vision
`,
        'masterminds': `
Fin Fang Foom
Pagliacci
`,
        'villains': `
Monsters Unleashed
Wrecking Crew
`,
        'henchmen': `

`,
        'schemes': `
Clash of the Monsters Unleashed
Divide and Conquer
Hypnotize Every Human
Steal All Oxygen on Earth
`

    },

    {
        'setName': 'Civil War',
        'heroes': `
Microbadge: Legendary fan - The Avengers Team Captain America, Secret Avenger
Microbadge: Legendary fan - The Avengers TeamMicrobadge: Legendary fan - Marvel Knights team Cloak & Dagger
Microbadge: Legendary fan - The Avengers TeamMicrobadge: Legendary fan - Marvel Knights team Daredevil
Microbadge: Legendary fan - The Avengers Team Falcon
Microbadge: Legendary fan - The Avengers Team Goliath
Microbadge: Legendary fan - The Avengers Team Hercules
Microbadge: Legendary fan - The Avengers Team Hulkling
Microbadge: Legendary fan - The Avengers TeamMicrobadge: Legendary fan - Marvel Knights team Luke Cage
Microbadge: Legendary fan - The Avengers Team Patriot
Microbadge: Legendary fan - The Avengers TeamMicrobadge: Legendary fan - Spider Friends Team Peter Parker
Microbadge: Legendary fan - New Warriors Team Speedball
Microbadge: Legendary fan - The Avengers Team Stature
Microbadge: Legendary fan - The Avengers TeamMicrobadge: Legendary fan - X-Men Team Storm & Black Panther
Microbadge: Legendary fan - The Avengers Team Tigra
Microbadge: Legendary fan - The Avengers Team Vision
Microbadge: Legendary fan - The Avengers Team Wiccan
`,
        'masterminds': `
Authoritarian Iron Man
Baron Helmut Zemo
Maria Hill, Director of S.H.I.E.L.D.
Misty Knight
Ragnarok
`,
        'villains': `
CSA Special Marshals
Great Lake Avengers
Heroes for Hire
Registration Enforcers
S.H.I.E.L.D. Elite
Superhuman Registration Act
Thunderbolts
`,
        'henchmen': `
Cape-killers
Mandroids
`,
        'schemes': `
Avengers vs. X-Men
Dark Reign of H.A.M.M.E.R. Officers
Epic Super Hero Civil War
Imprison Unregistered Superhumans
Nitro the Supervillain Threatens Crowds
Predict Future Crime
Reveal Heroes' Secret Identities
United States Split by Civil War

`

    },


    {
        'setName': 'Dark City',
        'heroes': `
Microbadge: Legendary fan - X-Men Team Angel
Microbadge: Legendary fan - X-Men Team Bishop
Microbadge: Legendary fan - Marvel Knights team Blade
Microbadge: Legendary fan - X-Force Team Cable
Microbadge: Legendary fan - X-Force Team Colossus
Microbadge: Legendary fan - Marvel Knights team Daredevil
Microbadge: Legendary fan - X-Force Team Domino
Microbadge: Legendary fan - Marvel Knights team Elektra
Microbadge: Legendary fan - X-Force Team Forge
Microbadge: Legendary fan - Marvel Knights team Ghost Rider
Microbadge: Legendary fan - X-Men Team Iceman
Microbadge: Legendary fan - Marvel Knights team Iron Fist
Microbadge: Legendary fan - X-Men Team Jean Grey
Microbadge: Legendary fan - X-Men Team Nightcrawler
Microbadge: Legendary fan - X-Men Team Professor X
Microbadge: Legendary fan - Marvel Knights team Punisher
Microbadge: Legendary fan - X-Force Team Wolverine
`,
        'masterminds': `
Apocalypse
Kingpin
Mephisto
Mr. Sinister
Stryfe
`,
        'villains': `
Emissaries of Evil
Four Horsemen
Marauders
MLF
Streets of New York
Underworld
`,
        'henchmen': `
Maggia Goons
Phalanx
`,
        'schemes': `
Capture Baby Hope
Detonate the Helicarrier
Massive Earthquake Generator
Organized Crime Wave
Save Humanity
Steal the Weaponized Plutonium
Transform Citizens into Demons
X-Cutioner's Song
`

    },


    {
        'setName': 'Doctor Strange and the Shadows of Nightmare',
        'heroes': `
The Ancient One
Microbadge: Legendary fan - Marvel Knights team Clea
Microbadge: Legendary fan - The Avengers Team Doctor Strange
Microbadge: Legendary fan - The Avengers Team Doctor Voodoo
The Vishanti
`,
        'masterminds': `
Dormammu
Nightmare
`,
        'villains': `
Fear Lords
Lords of the Netherworld
`,
        'henchmen': `

`,
        'schemes': `
Claim Souls for Demons
Cursed Pages of the Darkhold Tome
Duels of Science and Magic
War for the Dream Dimension
`

    },


    {
        'setName': 'Guardians of the Galaxy',
        'heroes': `
Microbadge: Legendary fan - Guardians of the Galaxy team Drax the Destroyer
Microbadge: Legendary fan - Guardians of the Galaxy team Gamora
Microbadge: Legendary fan - Guardians of the Galaxy team Groot
Microbadge: Legendary fan - Guardians of the Galaxy team Rocket Raccoon
Microbadge: Legendary fan - Guardians of the Galaxy team Star-Lord
`,
        'masterminds': `
Supreme Intelligence of the Kree
Thanos
`,
        'villains': `
Infinity Gems
Kree Starforce

`,
        'henchmen': `

`,
        'schemes': `
Forge the Infinity Gauntlet
Intergalactic Kree Nega-Bomb
The Kree-Skrull War
Unite the Shards
`

    },

    {
        'setName': 'Heroes of Asgard',
        'heroes': `
Microbadge: Legendary fan - Heroes of Asgard Team Beta Ray Bill
Microbadge: Legendary fan - Heroes of Asgard Team Lady Sif
Microbadge: Legendary fan - Heroes of Asgard Team Thor
Microbadge: Legendary fan - Heroes of Asgard Team Valkyrie
Microbadge: Legendary fan - Heroes of Asgard Team The Warriors Three
`,
        'masterminds': `
Hela, Goddess of Death
Malekith the Accursed
`,
        'villains': `
Dark Council
Omens of Ragnarok
`,
        'henchmen': `

`,
        'schemes': `
Asgardian Test of Worth
The Dark World of Svartalfheim
Ragnarok, Twilight of the Gods
War of the Frost Giants
`

    },

    {
        'setName': 'Paint the Town Red',
        'heroes': `
Microbadge: Legendary fan - Spider Friends Team Black Cat
Microbadge: Legendary fan - Marvel Knights team Moon Knight
Microbadge: Legendary fan - Spider Friends Team Scarlet Spider
Microbadge: Legendary fan - Spider Friends Team Spider-Woman
Microbadge: Legendary fan - Spider Friends Team Symbiote Spider-Man
`,
        'masterminds': `
Carnage
Mysterio
`,
        'villains': `
Maximum Carnage
Sinister Six
`,
        'henchmen': `

`,
        'schemes': `
The Clone Saga
Invade the Daily Bugle News HQ
Splice Humans with Spider DNA
Weave a Web of Lies
`

    },

    {
        'setName': 'Secret Wars, Volume 1',
        'heroes': `
Microbadge: Legendary fan - X-Men Team Apocalyptic Kitty Pryde
Microbadge: Legendary fan - Illuminati team Black Bolt
Microbadge: Legendary fan - Illuminati team Black Panther
Microbadge: Legendary fan - The Avengers Team Captain Marvel
Microbadge: Legendary fan - Illuminati team Dr. Strange
Microbadge: Legendary fan - The Avengers Team Lady Thor
Microbadge: Legendary fan - X-Men Team Magik
Microbadge: Legendary fan - Cabal team Maximus
Microbadge: Legendary fan - Cabal team Namor
Microbadge: Legendary fan - X-Men Team Old Man Logan
Microbadge: Legendary fan - Cabal team Proxima Midnight
Microbadge: Legendary fan - Illuminati team Superior Iron Man
Microbadge: Legendary fan - Cabal team Thanos
Microbadge: Legendary fan - Spider Friends Team Ultimate Spider-Man
`,
        'masterminds': `
Madelyne Pryor, Goblin Queen
Nimrod, Super Sentinel
Wasteland Hulk
Zombie Green Goblin
`,
        'villains': `
The Deadlands
Domain of Apocalypse
Limbo
Manhattan (Earth-1610)
Sentinel Territories
Wasteland
`,
        'henchmen': `
Ghost Racers
M.O.D.O.K.s
Thor Corps
`,
        'schemes': `
Build An Army of Annihilation
Corrupt the Next Generation of Heroes
Crush Them with My Bare hands
Dark Alliance
Fragmented Realities
Master of Tyrants
Pan-Dimensional Plague
Smash Two Dimensions Together
`


    },


    {
        'setName': 'The New Mutants',
        'heroes': `
Microbadge: Legendary fan - X-Men Team Karma
Microbadge: Legendary fan - X-Men Team Mirage
Microbadge: Legendary fan - X-Men Team Sunspot
Microbadge: Legendary fan - X-Men Team Warlock
Microbadge: Legendary fan - X-Men Team Wolfsbane
`,
        'masterminds': `
Belasco, Demon Lord of Limbo
Emma Frost, The White Queen
`,
        'villains': `
Demons of Limbo
Hellions
`,
        'henchmen': `

`,
        'schemes': `
Crash the Moon into the Sun
The Demon Bear Saga
Superhuman Baseball Game
Trapped in the Insane Asylum
`

    },



    {
        'setName': 'S.H.I.E.L.D.',
        'heroes': `
Microbadge: Legendary fan - S.H.I.E.L.D. Team Agent Phil Coulson
Microbadge: Legendary fan - S.H.I.E.L.D. Team Deathlok
Microbadge: Legendary fan - S.H.I.E.L.D. Team Mockingbird
Microbadge: Legendary fan - S.H.I.E.L.D. Team Quake
`,
        'masterminds': `
HYDRA High Council
HYDRA Super Adaptoid
`,
        'villains': `
A.I.M., HYDRA Offshoot
HYDRA Elite
`,
        'henchmen': `

`,
        'schemes': `
Hail Hydra
HYDRA Helicarriers Hunt Heroes
Secret Empire of Betrayal
S.H.I.E.L.D. Vs. HYDRA War
`

    },


    {
        'setName': 'Secret Wars, Volume 2',
        'heroes': `
Microbadge: Legendary fan - Spider Friends Team Agent Venom
Arkon the Magnificent
Microbadge: Legendary fan - Illuminati team Beast
Microbadge: Legendary fan - Cabal team Black Swan
Microbadge: Legendary fan - Illuminati team Captain Britain
Microbadge: Legendary fan - The Avengers Team The Captain and the Devil
Microbadge: Legendary fan - Cabal team Corvus Glaive
Microbadge: Legendary fan - Marvel Knights team Dr Punisher, Soldier Supreme
Microbadge: Legendary fan - S.H.I.E.L.D. Team Elsa Bloodstone
Microbadge: Legendary fan - X-Men Team Phoenix Force Cyclops
Microbadge: Legendary fan - X-Men Team Ruby Summers
Microbadge: Legendary fan - Marvel Knights team Shang-Chi
Microbadge: Legendary fan - Spider Friends Team Silk
Microbadge: Legendary fan - X-Men Team Soulsword Colossus
Microbadge: Legendary fan - Spider Friends Team Spider-Gwen
Microbadge: Legendary fan - X-Men Team Time-Traveling Jean Grey
`,
        'masterminds': `
Immortal Emperor Zheng-Zhu
King Hyperion
Spider Queen
Shiklah, the Demon Bride
    `,
        'schemes': `
Deadlands Hordes Charge the Wall
Enthrone the Barons of Battleworld
The Fountain of Eternal Life
The God-Emperor of Battleworld
The Mark of Khonshu
Master the Mysteries of Kung-Fu
Secret Wars
Sinister Ambitions
`,
        'villains': `
Deadpool's Secret Secret Wars
Guardians of Knowhere
K'un Lun
Monster Metropolis
Utopolis
X-Men 92 (Recruitable)
`,
        'henchmen': `
Khonshu Guardians
Magma Men
Spider-Infected
`
    },


    {
        'setName': 'X-Men',
        'heroes': `
Microbadge: Legendary fan - X-Men Team Aurora & Northstar
Microbadge: Legendary fan - X-Men Team Banshee
Microbadge: Legendary fan - X-Men Team Beast
Microbadge: Legendary fan - X-Men Team Cannonball
Microbadge: Legendary fan - X-Men Team Colossus & Wolverine
Microbadge: Legendary fan - X-Men Team Dazzler
Microbadge: Legendary fan - X-Men Team Havok
Microbadge: Legendary fan - X-Men Team Jubilee
Microbadge: Legendary fan - X-Men Team Kitty Pryde
Microbadge: Legendary fan - X-Men Team Legion
Microbadge: Legendary fan - X-Men Team Longshot
Microbadge: Legendary fan - X-Men Team Phoenix
Microbadge: Legendary fan - X-Men Team Polaris
Microbadge: Legendary fan - X-Men Team Psylocke
Microbadge: Legendary fan - X-Men Team X-23
`,
        'masterminds': `
Arcade
Dark Phoenix
Deathbird
Mojo
Onslaught
Shadow King

`,
        'schemes': `
Alien Brood Encounters
Anti-Mutant Hatred
The Dark Phoenix Saga
Horror of Horrors
Mutant-Hunting Super Sentinels
Nuclear Armageddon
Televised Deathtraps of Mojoworld
X-Men Danger Room Goes Berserk

`,
        'villains': `

Dark Descendants
Hellfire Club
Mojoverse
Murderworld
Shadow-X
Shi'ar Imperial Guard
Sisterhood of Mutants
`,
        'henchmen': `

The Brood
Hellfire Cult
Sapien League
Shi'ar Death Commandos
Shi'ar Patrol Craft
`
    },



    {
        'setName': 'Messiah Complex',
        'heroes': `
Microbadge: Legendary fan - X-Factor Team M
Microbadge: Legendary fan - X-Factor Team Multiple Man
Microbadge: Legendary fan - X-Factor Team Rictor
Microbadge: Legendary fan - X-Force Team Shatterstar
Microbadge: Legendary fan - X-Factor Team Siryn
Microbadge: Legendary fan - X-Men Team Stepford Cuckoos
Microbadge: Legendary fan - X-Factor Team Strong Guy
Microbadge: Legendary fan - X-Force Team Warpath
`,
        'masterminds': `

Bastion
Exodus
Lady Deathstrike
`,
        'schemes': `

Drain Mutants' Powers to / Open Rifts to Future Timelines
Hack Cerebro to / Manipulate the Mutant Messiah
Hire Singularity Investigations to / Reveal Heroes' Evil Clones
Raid Gene Bank to / Unleash an Anti-Mutant Bioweapon
`,
        'villains': `
Acolytes
Clan Yashida
Purifiers
Reavers

`,
        'henchmen': `
Mr. Sinister Clones
Sentinel Squad O*N*E*

`
    },



    {
        'setName': 'Black Panther',
        'heroes': `
Microbadge: Legendary Fan - Heroes of Wakanda "Wakanda Forever!" Team General Okoye
Microbadge: Legendary Fan - Heroes of Wakanda "Wakanda Forever!" Team King Black Panther
Microbadge: Legendary Fan - Heroes of Wakanda "Wakanda Forever!" Team Princess Shuri
Microbadge: Legendary Fan - Heroes of Wakanda "Wakanda Forever!" Team Queen Storm of Wakanda
Microbadge: Legendary Fan - Heroes of Wakanda "Wakanda Forever!" Team White Wolf
`,
        'masterminds': `
Killmonger
Klaw

`,
        'schemes': `

Plunder Wakanda's Vibranium
Poison Lakes with Nanite Microbots
Provoke a Clash of Nations
Seize The Wakandan Throne
`,
        'villains': `
Enemies of Wakanda
Killmonger's League

`,
        'henchmen': `


`
    },


];

let allEntries = {
    masterminds: [],
    schemes: [],
    villains: [],
    henchmen: [],
    heroes: []
};

toParse.forEach(content => {
    content.masterminds.split('\n').filter(value => value.trim() != '').forEach(value => {
        allEntries.masterminds.push({
            'name': value,
            'extension': content.setName
        });
    });

    content.schemes.split('\n').filter(value => value.trim() != '').forEach(value => {
        allEntries.schemes.push({
            'name': value,
            'extension': content.setName
        });
    });

    content.villains.split('\n').filter(value => value.trim() != '').forEach(value => {
        allEntries.villains.push({
            'name': value,
            'extension': content.setName
        });
    });

    content.henchmen.split('\n').filter(value => value.trim() != '').forEach(value => {
        allEntries.henchmen.push({
            'name': value,
            'extension': content.setName
        });
    });

    content.heroes.split('\n').filter(value => value.trim() != '').map(value => {
        let team = parseMultiTeams(value);
        let hero = value;
        if (value.indexOf(' Team ') > -1) {
            hero = value.substring(value.indexOf(' Team ') + ' Team '.length);
        }

        if (value.indexOf(' team ') > -1) {
            hero = value.substring(value.indexOf(' team ') + ' team '.length);
        }

        if (hero.indexOf(' - ') > -1) {
            hero = hero.substring(0, hero.indexOf(' - '));
        }

        if (hero.indexOf('(+') > -1) {
            hero = hero.substring(0, hero.indexOf('(+'));
        }

        return { team, hero, extension: content.setName };
    }).forEach(value => {
        allEntries.heroes.push({
            'name': value.hero,
            'teams': value.team,
            'extension': value.extension
        });

    });

});

const standardSort = (a, b) => {
    return a.name.localeCompare(b.name);
};

allEntries.masterminds.sort(standardSort);
allEntries.schemes.sort(standardSort);
allEntries.villains.sort(standardSort);
allEntries.henchmen.sort(standardSort);
allEntries.heroes.sort((a, b) => {
    if (a.name === b.name) {
        return a.teams[0].localeCompare(b.teams[0]);
    }
    return a.name.localeCompare(b.name);
});


const printAll = () => {

    console.log(`export const ALL_CARDS =\n{'masterminds': [`);
    allEntries.masterminds.forEach(v => {
        console.log(`{\n'name':'${v.name.replace(/'/g, '\\\'')}', \n'extension': '${v.extension}', \n'alwaysLead': '', \n'alwaysLeadCategory': 'villains'},`);
    });
    console.log('],');

    console.log(`'schemes': [`);
    allEntries.schemes.forEach(v => {
        console.log(`{\n'name':'${v.name.replace(/'/g, '\\\'')}', \n'extension': '${v.extension}'},`);
    });
    console.log('],');

    console.log(`'villains': [`);
    allEntries.villains.forEach(v => {
        console.log(`{\n'name':'${v.name.replace(/'/g, '\\\'')}', \n'extension': '${v.extension}'},`);
    });
    console.log('],');

    console.log(`'henchmen': [`);
    allEntries.henchmen.forEach(v => {
        console.log(`{\n'name':'${v.name.replace(/'/g, '\\\'')}', \n'extension': '${v.extension}'},`);
    });
    console.log('],');

    console.log(`'heroes': [`);
    allEntries.heroes.forEach(v => {
        console.log(`{\n'name':'${v.name.replace(/'/g, '\\\'')}', \n'extension': '${v.extension}', \n'teams':[${flattenHeroTeams(v.teams)}]},`);
    });
    console.log(']};');
}

printAll();
