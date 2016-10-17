var request = require('request');

var botNumber = 5;

var login = 'pizza.js';
var mdp = 'PizzaTempo44300Nantes';
var idEquipe = '';
var idPartie = '';
var lastMove = '';
var lastLapBomb = '';

var countCover = 7;
var countCoverIA = 7;
var countBullet = 1;
var countBulletIA = 1;
var countBomb = 1;

var coup = 0;

var countCoverInARow = 0;

var toggleAim = false;

var gameState = {
  canPlay: 'CANPLAY',
  cantPlay: 'CANTPLAY',
  victory: 'VICTORY',
  defeat: 'DEFEAT',
  cancelled: 'CANCELLED'
};

var moveState = {
  shoot: 'SHOOT',
  reload: 'RELOAD',
  cover: 'COVER',
  aim: 'AIM',
  bomb: 'BOMB'
};

var firstShot = true;

function strat2(lastMoveIA) {
  coup++;
  console.log('Coup numero: ' + coup);
  if (lastMoveIA === moveState.cover) {
    countCoverIA--;
  } else if (lastMoveIA === moveState.bomb) {
    lastLapBomb = true;
  }

  if (firstShot) {
    firstShot = !firstShot;
    countBomb--;
    move(moveState.cover);
  }
  else if(coup === 6) {
      move(moveState.bomb);
  } else if(coup === 8) {
      move(moveState.reload);
  }else if(coup === 13 || coup === 15) {
      move(moveState.shoot);
  }else if(coup === 28) {
      move(moveState.bomb);
  }
  else if (coup === 3 || coup === 4) {
    move(moveState.reload);
  } else if (lastMoveIA === moveState.bomb && lastLapBomb && countCover > 0) {
    countCover--;
    move(moveState.cover);
  } else if (lastLapBomb && countCover > 0) {
    countCover--;
    lastLapBomb = !lastLapBomb;
    move(moveState.cover);
  } else if (lastMoveIA === moveState.shoot && countBomb > 0) {
    countBomb--;
    move(moveState.bomb);
  } else if (lastMoveIA === moveState.aim && countCover > 0) {
    countCover--;
    move(moveState.cover);
  } else if (lastMove === moveState.bomb && countBullet < 3) {
    countBullet++;
    move(moveState.reload);
  } else if (lastMove === moveState.reload) {
    move(moveState.aim);
  } else if (lastMove === moveState.aim) {
    countBullet--;
    move(moveState.shoot);
  } else {
    if (countBullet > 0) {
      countBullet--;
      move(moveState.shoot);
    } else {
      countBullet++;
      move(moveState.reload);
    }
  }

  console.log('countBullet: ' + countBullet);
  console.log('countCover: ' + countCover);
  console.log('countBomb: ' + countBomb);
}

function strat(lastMoveIA) {
  console.log(countCover);
  if (lastLapBomb) {
    lastMove = moveState.cover;
    countCover--;
    lastLapBomb = false;
    move(lastMove);
  } else if (lastMoveIA === moveState.aim) {
    if (countCover && countCoverInARow < 2) {
      if (lastMove === moveState.cover) {
        countCoverInARow++;
      }
      lastMove = moveState.cover;
      countCover--;
    } else {
      if (countBullet < 6) {
        lastMove = moveState.shoot;
        countBullet--;
      } else {
        lastMove = moveState.reload;
        countBullet++;
      }
      countCoverInARow = 0;
    }
    move(lastMove);
  } else if (lastMoveIA === moveState.shoot && countBomb !== 0) {
    lastMove = moveState.bomb;
    countBomb--;
    move(lastMove);
    console.log('launch bomb ' + countBomb);
  } else if (lastMoveIA === moveState.bomb) {
    lastLapBomb = true;
    if (countBullet < 6) {
      lastMove = moveState.shoot;
      countBullet--;
    } else {
      lastMove = moveState.reload;
      countBullet++;
    }
    move(lastMove);
  } else if (!lastMove) {
    lastMove = moveState.shoot;
    countCover--;
    move(lastMove);
  } else {
    if (countBullet < 6) {
      if (lastMove == moveState.aim) {
        lastMove = moveState.shoot;
      } else {
        lastMove = moveState.aim;
      }
      countBullet--;
    } else {
      lastMove = moveState.reload;
      countBullet++;
    }
    move(lastMove);
  }
}

function play() {
  request('http://www.codeandplay.date/battle-ws/duel/game/status/' + idPartie + '/' + idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      if (gameState.canPlay === body) {
        getLastMove();
      } else if (gameState.cantPlay === body) {
        play();
      } else if (gameState.victory === body) {
        console.log(gameState.victory + '!');
      } else if (gameState.defeat === body) {
        console.log(gameState.defeat + '!');
        console.log('countBullet: ' + countBullet);
        console.log('countCover: ' + countCover);
        console.log('countBomb: ' + countBomb);
      } else if (gameState.cancelled === body) {
        console.log(gameState.cancelled + '!');
      }
    }
  });
}

function move(moveAction) {
  lastMove = moveAction;
  request('http://www.codeandplay.date/battle-ws/duel/game/play/' + idPartie + '/' + idEquipe + '/' + moveAction, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      play();
    }
  });
}

function getLastMove() {
  request('http://www.codeandplay.date/battle-ws/duel/game/getlastmove/' + idPartie + '/' + idEquipe, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      strat2(body);
    }
  });
}

request('http://www.codeandplay.date/battle-ws/duel/player/getIdEquipe/' + login + '/' + mdp, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    idEquipe = body;

    request('http://www.codeandplay.date/battle-ws/duel/practice/new/' + botNumber + '/' + idEquipe, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        idPartie = body;
        play();
      }
    });
  }
});
