const fs = require('fs-extra');

let rawdata = fs.readFileSync('legendary.json');
const legendaryBase = JSON.parse(rawdata);

let games = '';
if (fs.existsSync('games.json')) {
    rawdata = fs.readFileSync('games.json');
    games = JSON.parse(rawdata);

    legendaryBase.masterminds.forEach(mastermind => {
        const mastermindInGames = games.masterminds.filter(m => m.name === mastermind.name);
        if (mastermindInGames && mastermindInGames.length === 1) {
            mastermind.count = mastermindInGames[0].count;
        }
    });
}

let masterminds = legendaryBase.masterminds;

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

const valueToFilter = masterminds[0].count;

const filteredMasterminds = masterminds.filter((mastermind) => filterList(mastermind, valueToFilter));

const game = {
    mastermind: filteredMasterminds[getRandomInt(filteredMasterminds.length)]
};
console.log(game);

masterminds[masterminds.indexOf(game.mastermind)].count++;

const gamesToSave = {
    masterminds: masterminds
};
const data = JSON.stringify(gamesToSave);
fs.writeFileSync('games.json', data);
