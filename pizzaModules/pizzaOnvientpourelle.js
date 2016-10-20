let states = require('./pizzaStates.js'),
  config = require('./pizzaConfig.js'),
  calls = require('./pizzaCalls.js'),
  battleParams = require('./pizzaParams.js');

function callRoutine() {
  calls.gameStatus(module.exports.strat1);
}

module.exports.strat1 = function () {
  console.log('Turn ' + battleParams.coup);
  console.log('Board ' + battleParams.lastBoard);
  if (battleParams.coup === 0) {
    calls.moveAction(states.players.orc.name);
  } else if (battleParams.coup === 1) {
    calls.moveAction(states.players.chaman.name);
  } else if (battleParams.coup === 2) {
    calls.moveAction(states.players.paladin.name)
  } else {
    //calls.moveAction('A1,ATTACK,E1$A2,ATTACK,E1$A3,ATTACK,E1');
    console.log(battleParams.lastBoard);
  }
  battleParams.coup++;
}
