let request = require('request'),
  config = require('./pizzaConfig.js'),
  battleParams = require('./pizzaParams.js'),
  states = require('./pizzaStates.js'),
  engine = require('./pizzaOnvientpourelle.js');

module.exports.getIdEquipe = function (cbFn) {
  request(config.battleUrl + 'player/getIdEquipe/' + config.login + '/' + config.mdp, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      config.idEquipe = body;
      cbFn();
    }
  });
};

module.exports.getLastMove = function (cbFn) {
  request(config.battleUrl + 'game/getlastmove/' + config.idPartie + '/' + config.idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      battleParams.lastMoveIA = body;
      cbFn();
    }
  });
};

module.exports.gameStatus = function () {
  request(config.battleUrl + 'game/status/' + config.idPartie + '/' + config.idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      module.exports.gameLoop(body);
    }
  });
};

module.exports.moveAction = function (cbFn, actionMove) {
  config.lastMove = actionMove;
  request(config.battleUrl + 'game/play/' + config.idPartie + '/' + config.idEquipe + '/' + actionMove, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cbFn(body);
    }
  });
};

module.exports.getIdPartie = function (cbFn) {
  request(config.battleUrl + 'practice/new/' + config.botNumber + '/' + config.idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      config.idPartie = body;
      cbFn();
    }
  });
};

module.exports.getIdPartieBattle = function (cbFn) {
  request(config.battleUrl + 'versus/next/' + config.idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      config.idPartie = body;
      cbFn();
    }
  });
};


//Si jamais on relance une partie, il faut réinit les battleParams
module.exports.gameLoop = function (statusCode) {
  if (states.gameState.canPlay === statusCode) {
    module.exports.getLastMove(engine.strat1);
  } else if (states.gameState.cantPlay === statusCode) {
    setTimeout(function () {
      module.exports.gameStatus(module.exports.gameLoop);
    }, 100);
  } else if (states.gameState.victory === statusCode) {
    console.log(states.gameState.victory + '!');
  } else if (states.gameState.defeat === statusCode) {
    console.log(states.gameState.defeat + '!');
  } else if (states.gameState.cancelled === statusCode) {
    console.log(states.gameState.cancelled + '!');
  }
}
