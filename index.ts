const fs = require('fs-extra');

let rawdata = fs.readFileSync('legendary.json');
const legendaryBase = JSON.parse(rawdata);

const categories = ['masterminds', 'schemes'];

let games = '';
if (fs.existsSync('games.json')) {
    rawdata = fs.readFileSync('games.json');
    games = JSON.parse(rawdata);

    categories.forEach(category => {
        legendaryBase[category].forEach(baseValue => {
            const saveCatValue = games[category].filter(m => m.name === baseValue.name);
            if (saveCatValue && saveCatValue.length === 1) {
                baseValue.count = saveCatValue[0].count;
            }
        });
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sortLists(a, b) {
    if (a.count === b.count) {
        return 0;
    }
    if (a.count > b.count) {
        return 1;
    }
    return -1;
}

function filterList(element, countToKeep) {
    return element.count === countToKeep;
}

function drawRandomUnique(category, nameInGame) {

    category = category.sort(sortLists);

    const valueToFilter = category[0].count;

    const filteredMasterminds = category.filter((mastermind) => filterList(mastermind, valueToFilter));

    let choice = {};
    choice[nameInGame] = filteredMasterminds[getRandomInt(filteredMasterminds.length)];

    game = {...game, ...choice};

    category[category.indexOf(game[nameInGame])].count++;
}


let masterminds = legendaryBase.masterminds;
let schemes = legendaryBase.schemes;
let game = {};

drawRandomUnique(masterminds, "mastermind");
drawRandomUnique(schemes, "scheme");

console.log(game);


const gamesToSave = {
    masterminds: masterminds,
    schemes: schemes
};
const data = JSON.stringify(gamesToSave);
fs.writeFileSync('games.json', data);
