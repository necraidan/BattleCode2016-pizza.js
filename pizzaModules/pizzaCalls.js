let request = require('request'),
  config = require('./pizzaConfig.js'),
  battleParams = require('./pizzaParams.js'),
  states = require('./pizzaStates.js'),
  engine = require('./pizzaOnvientpourelle.js');

module.exports.getIdEquipe = function (cbFn) {
  console.log(config.battleUrl + 'player/getIdEquipe/' + config.login + '/' + config.mdp);
  request(config.battleUrl + 'player/getIdEquipe/' + config.login + '/' + config.mdp, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      config.idEquipe = body;
      console.log(body);
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

module.exports.moveAction = function (actionMove) {
  config.lastMove = actionMove;
  let url = config.battleUrl + 'game/play/' + config.idPartie + '/' + config.idEquipe + '/' + actionMove;
  console.log(url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //cbFn(body);
      console.log('Callback moveaction ' + body);
      module.exports.gameStatus();
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

module.exports.getBoard = function (cbFn) {
  request(config.battleUrl + 'game/board/' + config.idPartie, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      battleParams.lastBoard = body;
      cbFn();
    }
  });
};


//Si jamais on relance une partie, il faut réinit les battleParams
module.exports.gameLoop = function (statusCode) {
  if (states.gameState.canPlay === statusCode) {
    module.exports.getBoard(engine.strat1);
  } else if (states.gameState.cantPlay === statusCode) {
    setTimeout(function () {
      module.exports.gameStatus();
    }, 200);
  } else if (states.gameState.victory === statusCode) {
    console.log(states.gameState.victory + '!');
    if (config.battleModeVersus) {
      replayAnotherGame();
    }
  } else if (states.gameState.defeat === statusCode) {
    console.log(states.gameState.defeat + '!');
    if (config.battleModeVersus) {
      replayAnotherGame();
    }
  } else if (states.gameState.cancelled === statusCode) {
    console.log(states.gameState.cancelled + '!');
    if (config.battleModeVersus) {
      battleParams = clone(defaultBattleParams);
      replayAnotherGame();
    }
  }
}

function replayAnotherGame() {
  calls.getIdPartieBattle(() => calls.gameStatus());
}

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

defaultBattleParams = {
  coup: 0,
  lastBoard: null
};
