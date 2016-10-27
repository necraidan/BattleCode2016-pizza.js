let request = require('request'),
  config = require('./pizzaConfig.js'),
  states = require('./pizzaStates.js'),
  engine = require('./pizzaOnvientpourelle.js');


// Récupère l'identifiant de l'équipe
module.exports.getIdEquipe = function (cbFn) {
  console.log(config.settings.battleUrl + 'player/getIdEquipe/' + config.settings.login + '/' + config.settings.mdp);
  request(config.settings.battleUrl + 'player/getIdEquipe/' + config.settings.login + '/' + config.settings.mdp, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      config.settings.idEquipe = body;
      console.log(body);
      cbFn();
    }
  });
};


// Récupère le dernier mouvement de l'adversaire (non utilisé actuellement)
module.exports.getLastMove = function (cbFn) {
  request(config.settings.battleUrl + 'game/getlastmove/' + config.settings.idPartie + '/' + config.settings.idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      config.settings.lastMoveIA = body;
      cbFn();
    }
  });
};

// Récupère le statut de la partie
module.exports.gameStatus = function () {
  request(config.settings.battleUrl + 'game/status/' + config.settings.idPartie + '/' + config.settings.idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      module.exports.gameLoop(body);
    }
  });
};

module.exports.moveAction = function (actionMove) {
  config.settings.lastMove = actionMove;
  let url = config.settings.battleUrl + 'game/play/' + config.settings.idPartie + '/' + config.settings.idEquipe + '/' + actionMove;
  console.log(url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //cbFn(body);
      console.log('Callback moveaction ' + body);
      module.exports.gameStatus();
    }
  });
};

// Récupère l'identifiant de la partie : lance un entraînement contre les bots
module.exports.getIdPartie = function (cbFn) {
  request(config.settings.battleUrl + 'practice/new/' + config.settings.botNumber + '/' + config.settings.idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      config.settings.idPartie = body;
      cbFn();
    }
  });
};

// Récupère l'identifiant de la partie : lance un match PvP
module.exports.getIdPartieBattle = function (cbFn) {
  request(config.settings.battleUrl + 'versus/next/' + config.settings.idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      config.settings.idPartie = body;
      cbFn();
    }
  });
};

// Récupère le plateau de jeu
module.exports.getBoard = function (cbFn) {
  request(config.settings.battleUrl + 'game/board/' + config.settings.idPartie, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      config.params.lastBoard = body;
      cbFn();
    }
  });
};


//Si jamais on relance une partie, il faut réinit la config de la partie (config.params)
module.exports.gameLoop = function (statusCode) {
  if (states.gameState.canPlay === statusCode) {
    module.exports.getBoard(engine.strat1);
  } else if (states.gameState.cantPlay === statusCode) {
    setTimeout(function () {
      module.exports.gameStatus();
    }, 200);
  } else if (states.gameState.victory === statusCode) {
    console.log(states.gameState.victory + '!');
    if (config.settings.battleModeVersus) {
      replayAnotherGame();
    }
  } else if (states.gameState.defeat === statusCode) {
    console.log(states.gameState.defeat + '!');
    if (config.settings.battleModeVersus) {
      replayAnotherGame();
    }
  } else if (states.gameState.cancelled === statusCode) {
    console.log(states.gameState.cancelled + '!');
    if (config.settings.battleModeVersus) {
      config.params = clone(config.defaultBattleParams);
      replayAnotherGame();
    }
  }
}

// Relance la partie
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