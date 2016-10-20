let states = require('./pizzaStates.js'),
  config = require('./pizzaConfig.js'),
  calls = require('./pizzaCalls.js'),
  battleParams = require('./pizzaParams.js');

function callRoutine() {
  calls.gameStatus(module.exports.strat1);
}

module.exports.strat1 = function () {
    if (battleParams.coup === 1) {
        calls.moveAction(states.orc.name);
    } else if (battleParams.coup === 2) {
        calls.moveAction(states.chaman.name);
    } else if (battleParams.coup === 3) {
        calls.moveAction(states.paladin.name)
    } else {
        calls.moveAction('A1,ATTACK,E1$A2,ATTACK,E1$A3,ATTACK,E1');
    }
    battleParams.coup++;
}
