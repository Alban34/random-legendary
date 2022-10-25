const parseMultiTeams = (value) => {
    return value.split('Microbadge: Legendary fan - ').filter(v => v !== '').map(v => {
        if (v.indexOf(' Team') > -1) {
            return v.substring(0, v.indexOf(' Team'));
        }
        if (v.indexOf(' team') > -1) {
            return v.substring(0, v.indexOf(' team'));
        }
        return '';
    });
};


const toParse = [
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
Organized Crimewave
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

        return { team, hero, extension: content.setName };
    }).forEach(value => {
        allEntries.heroes.push({
            'name': value.hero,
            'teams': value.team,
            'extension': value.extension
        });

    });

});

allEntries.masterminds = allEntries.masterminds.sort((a, b) => {
    return a.name.localeCompare(b.name);
});

allEntries.schemes = allEntries.schemes.sort((a, b) => {
    return a.name.localeCompare(b.name);
});

allEntries.villains = allEntries.villains.sort((a, b) => {
    return a.name.localeCompare(b.name);
});

allEntries.henchmen = allEntries.henchmen.sort((a, b) => {
    return a.name.localeCompare(b.name);
});

allEntries.heroes = allEntries.heroes.sort((a, b) => {
    if (a.name === b.name) {
        return a.teams[0].localeCompare(b.teams[0]);
    }
    return a.name.localeCompare(b.name);
});

console.log('{"masterminds": [');
allEntries.masterminds.forEach(v => {
    console.log(`{"name":"${v.name}", "extension": "${v.extension}", "alwaysLead": "", "alwaysLeadCategory": "villains"},`);
});
console.log('],');

console.log('"schemes": [');
allEntries.schemes.forEach(v => {
    console.log(`{"name":"${v.name}", "extension": "${v.extension}"},`);
});
console.log('],');

console.log('"villains": [');
allEntries.villains.forEach(v => {
    console.log(`{"name":"${v.name}", "extension": "${v.extension}"},`);
});
console.log('],');

console.log('"henchmen": [');
allEntries.henchmen.forEach(v => {
    console.log(`{"name":"${v.name}", "extension": "${v.extension}"},`);
});
console.log('],');

console.log('"heroes": [');
allEntries.heroes.forEach(v => {
    console.log(`{"name":"${v.name}", "extension": "${v.extension}", "teams":[${v.teams.flatMap(e => '"' + e + '",')}]},`);
});
console.log(']}');
