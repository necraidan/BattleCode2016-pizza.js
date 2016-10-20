let states = require('./pizzaStates.js'),
  config = require('./pizzaConfig.js'),
  calls = require('./pizzaCalls.js'),
  battleParams = require('./pizzaParams.js');

function callRoutine() {
  calls.gameStatus(module.exports.strat1);
}

module.exports.strat1 = function () {
  battleParams.coup++;
  console.log('Coup numero: ' + battleParams.coup);
  if (battleParams.lastMoveIA === states.moveState.cover) {
    battleParams.countCoverIA--;
  } else if (battleParams.lastMoveIA === states.moveState.bomb) {
    battleParams.lastLapBomb = true;
  }

  if (battleParams.firstShot) {
    battleParams.firstShot = !battleParams.firstShot;
    battleParams.countBomb--;
    calls.moveAction(callRoutine, states.moveState.bomb);
  }
  /* else if(battleParams.coup === 6) {
      calls.moveAction(states.moveState.bomb);
    } else if(battleParams.coup === 8) {
      calls.moveAction(states.moveState.reload);
    }*/
  else if (battleParams.coup === 3 || battleParams.coup === 4) {
    calls.moveAction(callRoutine, states.moveState.reload);
  } else if (battleParams.lastMoveIA === states.moveState.bomb &&
    battleParams.lastLapBomb &&
    battleParams.countCover > 0) {
    battleParams.countCover--;
    calls.moveAction(callRoutine, states.moveState.cover);
  } else if (battleParams.lastLapBomb && battleParams.countCover > 0) {
    battleParams.countCover--;
    battleParams.lastLapBomb = !battleParams.lastLapBomb;
    calls.moveAction(callRoutine, states.moveState.cover);
  } else if (battleParams.lastMoveIA === states.moveState.shoot && battleParams.countBomb > 0) {
    battleParams.countBomb--;
    calls.moveAction(callRoutine, states.moveState.bomb);
  } else if (battleParams.lastMoveIA === states.moveState.aim && battleParams.countCover > 0) {
    battleParams.countCover--;
    calls.moveAction(callRoutine, states.moveState.cover);
  } else if (config.lastMove === states.moveState.bomb && battleParams.countBullet < 3) {
    battleParams.countBullet++;
    calls.moveAction(callRoutine, states.moveState.reload);
  } else if (config.lastMove === states.moveState.reload) {
    calls.moveAction(callRoutine, states.moveState.aim);
  } else if (config.lastMove === states.moveState.aim) {
    battleParams.countBullet--;
    calls.moveAction(callRoutine, states.moveState.shoot);
  } else {
    if (battleParams.countBullet > 0) {
      battleParams.countBullet--;
      calls.moveAction(callRoutine, states.moveState.shoot);
    } else {
      battleParams.countBullet++;
      calls.moveAction(callRoutine, states.moveState.reload);
    }
  }

}
