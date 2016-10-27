module.exports.gameState = {
  canPlay: 'CANPLAY',
  cantPlay: 'CANTPLAY',
  victory: 'VICTORY',
  defeat: 'DEFEAT',
  cancelled: 'CANCELLED'
};

module.exports.moveState = {
  attack: 'ATTACK',
  charge: 'CHARGE',
  cleanse: 'CLEANSE',
  defend: 'DEFEND',
  firebolt: 'FIREBOLT',
  yell: 'YELL',
  heal: 'HEAL',
  protect: 'PROTECT',
  rest: 'REST'
};

module.exports.playerStatus = {
  burning: 'BURNING',
  scared: 'SCARED',
  stunned: 'STUNNED'
};

module.exports.players = {
  archer: {
    name: 'ARCHER',
    specialMove: module.exports.moveState.firebolt
  },
  chaman: {
    name: 'CHAMAN',
    specialMove: module.exports.moveState.cleanse
  },
  guard: {
    name: 'GUARD',
    specialMove: module.exports.moveState.protect
  },
  orc: {
    name: 'ORC',
    specialMove: module.exports.moveState.yell
  },
  paladin: {
    name: 'PALADIN',
    specialMove: module.exports.moveState.charge
  },
  prist: {
    name: 'PRIEST',
    specialMove: module.exports.moveState.heal
  }
};