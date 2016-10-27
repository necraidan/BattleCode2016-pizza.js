let states = require('./pizzaStates.js'),
    config = require('./pizzaConfig.js'),
    calls = require('./pizzaCalls.js');

function callRoutine() {
    calls.gameStatus(module.exports.strat1);
}

module.exports.strat1 = function () {


    console.log(config.settings.idEquipe);
    console.log('Turn ' + config.params.coup);


    // Sélection des personnages
    if (config.params.coup === 0) {
        calls.moveAction(states.players.orc.name);
    } else if (config.params.coup === 1) {
        calls.moveAction(states.players.chaman.name);
    } else if (config.params.coup === 2) {
        calls.moveAction(states.players.paladin.name)
    } else {
        var fightersId = [];
        var target = '';
        var move = '';

        // Récupération du plateau de jeu
        var lastBoard = JSON.parse(config.params.lastBoard);


        lastBoard.playerBoards.forEach(function (player) {
            if (player.playerName === 'pizza.js') {
                // Sélection des personnages pouvant jouer
                player.fighters.forEach(function (fighter, index) {
                    if (fighter.currentLife > 0) {
                        // On ne choisit que les personnages vivants
                        fightersId.push('A' + (index + 1));
                    }
                });
            } else {
                var maxHp = 31;
                // Sélection des cibles
                player.fighters.forEach(function (fighter, index) {
                    if (fighter.currentLife > 0 && fighter.currentLife < maxHp) {
                        // Sélection de l'adversaire ayant le moins de points de vie
                        target = 'E' + (index + 1);
                        maxHp = fighter.currentLife;
                    }
                });
            }
        });


        // Construction de l'instruction qui va définir le tour
        fightersId.forEach(function (fighter) {
            move += fighter + ',ATTACK,' + target + '$';
        });

        // Log du mouvement transmis au serveur
        console.log(move);

        // Transmission du mouvement
        calls.moveAction(move.substr(0, move.length - 1));
    }

    // A la fin du tour, on incrémente le compteur
    config.params.coup++;
}
