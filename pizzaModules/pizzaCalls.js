let request = require('request'),
  config = require('./pizzaConfig.js');

module.exports.getIdEquipe = function () {
  request(config.battleUrl + 'player/getIdEquipe/' + login + '/' + mdp, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      config.idEquipe = body;
    }
  });
};

module.exports.getLastMove = function (cbFn) {
  request(config.battleUrl + 'game/getlastmove/' + idPartie + '/' + idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cbFn(body);
    }
  });
};

module.exports.gameStatus = function (cbFn) {
  request(config.battleUrl + 'game/status/' + idPartie + '/' + idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cbFn(body);
    }
  });
};

module.exports.moveAction = function (cbFn, actionMove) {
  config.lastMove = moveAction;
  request(config.battleUrl + 'game/play/' + idPartie + '/' + idEquipe + '/' + moveAction, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cbFn(body);
    }
  });
};

module.exports.getIdPartie = function (cbFn) {
  request(config.battleUrl + 'game/play/' + idPartie + '/' + idEquipe + '/' + moveAction, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      config.idPartie = body;
      cbFn();
    }
  });
};

// function play() {
//   request('http://---/battle-ws/duel/game/status/' + idPartie + '/' + idEquipe, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       if (gameState.canPlay === body) {
//         getLastMove();
//       } else if (gameState.cantPlay === body) {
//         play();
//       } else if (gameState.victory === body) {
//         console.log(gameState.victory + '!');
//       } else if (gameState.defeat === body) {
//         console.log(gameState.defeat + '!');
//         console.log('countBullet: ' + countBullet);
//         console.log('countCover: ' + countCover);
//         console.log('countBomb: ' + countBomb);
//       } else if (gameState.cancelled === body) {
//         console.log(gameState.cancelled + '!');
//       }
//     }
//   });
// }
//
// function move(moveAction) {
//   lastMove = moveAction;
//   request('http://---/battle-ws/duel/game/play/' + idPartie + '/' + idEquipe + '/' + moveAction, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log(body);
//       play();
//     }
//   });
// }
//
// request('http://---/battle-ws/duel/player/getIdEquipe/' + login + '/' + mdp, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     idEquipe = body;
//
//     request('http://---/battle-ws/duel/practice/new/' + botNumber + '/' + idEquipe, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         idPartie = body;
//         play();
//       }
//     });
//   }
// });
