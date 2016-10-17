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


console.log(request);
console.log(states);
console.log(config);
console.log(calls);


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
//   if (lastMoveIA === moveState.cover) {
//     countCoverIA--;
//   } else if (lastMoveIA === moveState.bomb) {
//     lastLapBomb = true;
//   }
//
//   if (firstShot) {
//     firstShot = !firstShot;
//     countBomb--;
//     move(moveState.bomb);
//   }
//   /* else if(coup === 6) {
//       move(moveState.bomb);
//     } else if(coup === 8) {
//       move(moveState.reload);
//     }*/
//   else if (coup === 3 || coup === 4) {
//     move(moveState.reload);
//   } else if (lastMoveIA === moveState.bomb && lastLapBomb && countCover > 0) {
//     countCover--;
//     move(moveState.cover);
//   } else if (lastLapBomb && countCover > 0) {
//     countCover--;
//     lastLapBomb = !lastLapBomb;
//     move(moveState.cover);
//   } else if (lastMoveIA === moveState.shoot && countBomb > 0) {
//     countBomb--;
//     move(moveState.bomb);
//   } else if (lastMoveIA === moveState.aim && countCover > 0) {
//     countCover--;
//     move(moveState.cover);
//   } else if (lastMove === moveState.bomb && countBullet < 3) {
//     countBullet++;
//     move(moveState.reload);
//   } else if (lastMove === moveState.reload) {
//     move(moveState.aim);
//   } else if (lastMove === moveState.aim) {
//     countBullet--;
//     move(moveState.shoot);
//   } else {
//     if (countBullet > 0) {
//       countBullet--;
//       move(moveState.shoot);
//     } else {
//       countBullet++;
//       move(moveState.reload);
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
//     lastMove = moveState.cover;
//     countCover--;
//     lastLapBomb = false;
//     move(lastMove);
//   } else if (lastMoveIA === moveState.aim) {
//     if (countCover && countCoverInARow < 2) {
//       if (lastMove === moveState.cover) {
//         countCoverInARow++;
//       }
//       lastMove = moveState.cover;
//       countCover--;
//     } else {
//       if (countBullet < 6) {
//         lastMove = moveState.shoot;
//         countBullet--;
//       } else {
//         lastMove = moveState.reload;
//         countBullet++;
//       }
//       countCoverInARow = 0;
//     }
//     move(lastMove);
//   } else if (lastMoveIA === moveState.shoot && countBomb !== 0) {
//     lastMove = moveState.bomb;
//     countBomb--;
//     move(lastMove);
//     console.log('launch bomb ' + countBomb);
//   } else if (lastMoveIA === moveState.bomb) {
//     lastLapBomb = true;
//     if (countBullet < 6) {
//       lastMove = moveState.shoot;
//       countBullet--;
//     } else {
//       lastMove = moveState.reload;
//       countBullet++;
//     }
//     move(lastMove);
//   } else if (!lastMove) {
//     lastMove = moveState.shoot;
//     countCover--;
//     move(lastMove);
//   } else {
//     if (countBullet < 6) {
//       if (lastMove == moveState.aim) {
//         lastMove = moveState.shoot;
//       } else {
//         lastMove = moveState.aim;
//       }
//       countBullet--;
//     } else {
//       lastMove = moveState.reload;
//       countBullet++;
//     }
//     move(lastMove);
//   }
// }
