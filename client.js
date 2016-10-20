//         d8b
//         Y8P
//
// 88888b. 8888888888888888888 8888b.
// 888 "88b888   d88P    d88P     "88b
// 888  888888  d88P    d88P  .d888888
// 888 d88P888 d88P    d88P   888  888
// 88888P" 8888888888888888888"Y888888
// 888
// 888
// 888

// 🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕

let calls = require('./pizzaModules/pizzaCalls.js'),
  config = require('./pizzaModules/pizzaConfig.js');

if (config.battleMode) {
  calls.getIdEquipe(() => calls.getIdPartieBattle(() => calls.gameStatus()));
} else {
  calls.getIdEquipe(() => calls.getIdPartie(() => calls.gameStatus()));
}

// 🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕

// __
// // ""--.._
// ||  (_)  _ "-._
// ||    _ (_)    '-.
// ||   (_)   __..-'
// \\__..--""
