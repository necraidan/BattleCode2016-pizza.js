let states = require('./pizzaStates.js'),
  config = require('./pizzaConfig.js'),
  calls = require('./pizzaCalls.js'),
  battleParams = require('./pizzaParams.js');

function callRoutine() {
  calls.gameStatus(module.exports.strat1);
}

module.exports.strat1 = function () {
    console.log(config.idEquipe);
  console.log('Turn ' + battleParams.coup);
  if (battleParams.coup === 0) {
    calls.moveAction(states.players.orc.name);
  } else if (battleParams.coup === 1) {
    calls.moveAction(states.players.chaman.name);
  } else if (battleParams.coup === 2) {
    calls.moveAction(states.players.paladin.name)
  } else {
    //calls.moveAction('A1,ATTACK,E1$A2,ATTACK,E1$A3,ATTACK,E1');
    /*batlleParams.lastBoard.forEach(function(item){
        if(item.name==='pizza.js'){
            
        }
    });*/
      var fightersId = [];
      var target = '';
      var move ='';
      
      var lastBoard = JSON.parse(battleParams.lastBoard);
      lastBoard.playerBoards.forEach(function(player){
          if(player.playerName === 'pizza.js') {
              player.fighters.forEach(function(fighter, index){
                  if(fighter.currentLife>0){
                      fightersId.push('A' + (index+1));
                  }
              });
          } else {
              var maxHp = 31;
              player.fighters.forEach(function(fighter, index){
                  if(fighter.currentLife>0 && fighter.currentLife<maxHp){
                      target = 'E' + (index + 1);
                      maxHp = fighter.currentLife;
                  }
              });
          }
      });
      
      fightersId.forEach(function(fighter){
          move += fighter + ',ATTACK,'+target +'$';
          
      });
      
      console.log(move);
      calls.moveAction(move.substr(0,move.length-1));
  }
  battleParams.coup++;
}
