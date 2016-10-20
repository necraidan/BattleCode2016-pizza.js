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

let request = require('request'),
  states = require('./pizzaModules/pizzaStates.js'),
  config = require('./pizzaModules/pizzaConfig.js'),
  calls = require('./pizzaModules/pizzaCalls.js');

let battleMode = false;


var lastLapBomb = '';

var countCover = 7;
var countCoverIA = 7;
var countBullet = 1;
var countBulletIA = 1;
var countBomb = 1;

var coup = 0;

var countCoverInARow = 0;

var toggleAim = false;



var firstShot = true;

function routine(statusCode) {
  if (states.gameState.canPlay === statusCode) {
    calls.getLastMove(strat);
  } else if (states.gameState.cantPlay === statusCode) {
    setTimeout(function () {
      calls.gameStatus(routine);
    }, 100);
  } else if (states.gameState.victory === statusCode) {
    console.log(states.gameState.victory + '!');
  } else if (states.gameState.defeat === statusCode) {
    console.log(states.gameState.defeat + '!');
    console.log('countBullet: ' + countBullet);
    console.log('countCover: ' + countCover);
    console.log('countBomb: ' + countBomb);
  } else if (states.gameState.cancelled === statusCode) {
    console.log(states.gameState.cancelled + '!');
  }
}

function callRoutine() {
  calls.gameStatus(routine);
}

function strat(lastMoveIA) {
  coup++;
  console.log('Coup numero: ' + coup);
  if (lastMoveIA === states.moveState.cover) {
    countCoverIA--;
  } else if (lastMoveIA === states.moveState.bomb) {
    lastLapBomb = true;
  }

  if (firstShot) {
    firstShot = !firstShot;
    countBomb--;
    calls.moveAction(callRoutine, states.moveState.bomb);
  }
  /* else if(coup === 6) {
      calls.moveAction(states.moveState.bomb);
    } else if(coup === 8) {
      calls.moveAction(states.moveState.reload);
    }*/
  else if (coup === 3 || coup === 4) {
    calls.moveAction(callRoutine, states.moveState.reload);
  } else if (lastMoveIA === states.moveState.bomb && lastLapBomb && countCover > 0) {
    countCover--;
    calls.moveAction(callRoutine, states.moveState.cover);
  } else if (lastLapBomb && countCover > 0) {
    countCover--;
    lastLapBomb = !lastLapBomb;
    calls.moveAction(callRoutine, states.moveState.cover);
  } else if (lastMoveIA === states.moveState.shoot && countBomb > 0) {
    countBomb--;
    calls.moveAction(callRoutine, states.moveState.bomb);
  } else if (lastMoveIA === states.moveState.aim && countCover > 0) {
    countCover--;
    calls.moveAction(callRoutine, states.moveState.cover);
  } else if (config.lastMove === states.moveState.bomb && countBullet < 3) {
    countBullet++;
    calls.moveAction(callRoutine, states.moveState.reload);
  } else if (config.lastMove === states.moveState.reload) {
    calls.moveAction(callRoutine, states.moveState.aim);
  } else if (config.lastMove === states.moveState.aim) {
    countBullet--;
    calls.moveAction(callRoutine, states.moveState.shoot);
  } else {
    if (countBullet > 0) {
      countBullet--;
      calls.moveAction(callRoutine, states.moveState.shoot);
    } else {
      countBullet++;
      calls.moveAction(callRoutine, states.moveState.reload);
    }
  }

  console.log('countBullet: ' + countBullet);
  console.log('countCover: ' + countCover);
  console.log('countBomb: ' + countBomb);

}

if (battleMode) {
  calls.getIdEquipe(() => calls.getIdPartieBattle(() => calls.gameStatus(routine)));
} else {
  calls.getIdEquipe(() => calls.getIdPartie(() => calls.gameStatus(routine)));
}



//calls.getIdEquipe(calls.getIdPartie(routine));

/*
console.log(request);
console.log(states);
console.log(config);
console.log(calls);
*/

// 🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕

// __
// // ""--.._
// ||  (_)  _ "-._
// ||    _ (_)    '-.
// ||   (_)   __..-'
// \\__..--""

// var lastLapBomb = '';
//
// var countCover = 7;
// var countCoverIA = 7;
// var countBullet = 1;
// var countBulletIA = 1;
// var countBomb = 1;
//
// var coup = 0;
//
// var countCoverInARow = 0;
//
// var toggleAim = false;
//
//
//
// var firstShot = true;
//
// function strat2(lastMoveIA) {
//   coup++;
//   console.log('Coup numero: ' + coup);
//   if (lastMoveIA === states.moveState.cover) {
//     countCoverIA--;
//   } else if (lastMoveIA === states.moveState.bomb) {
//     lastLapBomb = true;
//   }
//
//   if (firstShot) {
//     firstShot = !firstShot;
//     countBomb--;
//     calls.moveAction(states.moveState.bomb);
//   }
//   /* else if(coup === 6) {
//       calls.moveAction(states.moveState.bomb);
//     } else if(coup === 8) {
//       calls.moveAction(states.moveState.reload);
//     }*/
//   else if (coup === 3 || coup === 4) {
//     calls.moveAction(states.moveState.reload);
//   } else if (lastMoveIA === states.moveState.bomb && lastLapBomb && countCover > 0) {
//     countCover--;
//     calls.moveAction(states.moveState.cover);
//   } else if (lastLapBomb && countCover > 0) {
//     countCover--;
//     lastLapBomb = !lastLapBomb;
//     calls.moveAction(states.moveState.cover);
//   } else if (lastMoveIA === states.moveState.shoot && countBomb > 0) {
//     countBomb--;
//     calls.moveAction(states.moveState.bomb);
//   } else if (lastMoveIA === states.moveState.aim && countCover > 0) {
//     countCover--;
//     calls.moveAction(states.moveState.cover);
//   } else if (config.lastMove === states.moveState.bomb && countBullet < 3) {
//     countBullet++;
//     calls.moveAction(states.moveState.reload);
//   } else if (config.lastMove === states.moveState.reload) {
//     calls.moveAction(states.moveState.aim);
//   } else if (config.lastMove === states.moveState.aim) {
//     countBullet--;
//     calls.moveAction(states.moveState.shoot);
//   } else {
//     if (countBullet > 0) {
//       countBullet--;
//       calls.moveAction(states.moveState.shoot);
//     } else {
//       countBullet++;
//       calls.moveAction(states.moveState.reload);
//     }
//   }
//
//   console.log('countBullet: ' + countBullet);
//   console.log('countCover: ' + countCover);
//   console.log('countBomb: ' + countBomb);
// }
//
// function strat(lastMoveIA) {
//   console.log(countCover);
//   if (lastLapBomb) {
//     config.lastMove = states.moveState.cover;
//     countCover--;
//     lastLapBomb = false;
//     calls.moveAction(config.lastMove);
//   } else if (lastMoveIA === states.moveState.aim) {
//     if (countCover && countCoverInARow < 2) {
//       if (config.lastMove === states.moveState.cover) {
//         countCoverInARow++;
//       }
//       config.lastMove = states.moveState.cover;
//       countCover--;
//     } else {
//       if (countBullet < 6) {
//         config.lastMove = states.moveState.shoot;
//         countBullet--;
//       } else {
//         config.lastMove = states.moveState.reload;
//         countBullet++;
//       }
//       countCoverInARow = 0;
//     }
//     calls.moveAction(config.lastMove);
//   } else if (lastMoveIA === states.moveState.shoot && countBomb !== 0) {
//     config.lastMove = states.moveState.bomb;
//     countBomb--;
//     calls.moveAction(config.lastMove);
//     console.log('launch bomb ' + countBomb);
//   } else if (lastMoveIA === states.moveState.bomb) {
//     lastLapBomb = true;
//     if (countBullet < 6) {
//       config.lastMove = states.moveState.shoot;
//       countBullet--;
//     } else {
//       config.lastMove = states.moveState.reload;
//       countBullet++;
//     }
//     calls.moveAction(config.lastMove);
//   } else if (!config.lastMove) {
//     config.lastMove = states.moveState.shoot;
//     countCover--;
//     calls.moveAction(config.lastMove);
//   } else {
//     if (countBullet < 6) {
//       if (config.lastMove == states.moveState.aim) {
//         config.lastMove = states.moveState.shoot;
//       } else {
//         config.lastMove = states.moveState.aim;
//       }
//       countBullet--;
//     } else {
//       config.lastMove = states.moveState.reload;
//       countBullet++;
//     }
//     calls.moveAction(config.lastMove);
//   }
// }
