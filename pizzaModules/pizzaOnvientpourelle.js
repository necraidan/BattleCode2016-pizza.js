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
      var defenserId = [];
      var target = '';
      var secondaryTarget = undefined;
      var targetLife = 0;
      var move ='';
      
      var lastBoard = JSON.parse(battleParams.lastBoard);
      lastBoard.playerBoards.forEach(function(player){
          if(player.playerName === 'pizza.js') {
              player.fighters.forEach(function(fighter, index){
                  if(fighter.currentLife >0 && fighter.currentLife  <= 2) {
                      defenserId.push(index);
                  } else if(fighter.currentLife>0){
                      fightersId.push(index);
                  }
              });
          } else {
              var maxHp = 31;
              player.fighters.forEach(function(fighter, index){
                  if(fighter.currentLife>0 && fighter.currentLife<maxHp){
                      target = index;
                      maxHp = fighter.currentLife;
                      targetLife = fighter.currentLife;
                  } else if(fighter.currentLife>0){
                      secondaryTarget = index;
                  }
              });
          }
      });
      
      fightersId.forEach(function(fighter){
          
          if(targetLife>0 || !secondaryTarget){
              move += 'A' + (fighter+1) + ',ATTACK,E'+ (target+1) +'$';
          } else {
              move += 'A' + (fighter+1) + ',ATTACK,E'+ (secondaryTarget+1) +'$';
          }
          
          
          targetLife -= 2;
          
      });
      
      defenserId.forEach(function(fighter) {
          move += 'A' + (fighter+1) + ',DEFEND,A'+ (fighter+1) +'$';
      });
      
      console.log(move);
      calls.moveAction(move.substr(0,move.length-1));
  }
  battleParams.coup++;
}
