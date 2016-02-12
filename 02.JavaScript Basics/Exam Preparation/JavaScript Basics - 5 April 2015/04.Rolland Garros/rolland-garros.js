function solve(input){
    var index, players = [];

    for(index in input){
        var names = input[index].split(':')[0].trim();
        var results = input[index].split(':')[1].trim().split(' ').filter(function(elem){
            return elem !== "";
        });
        var patternForWhitespaces = /[\s]+/gi;
        var player1, player2;

        names = names.split('vs.').map(function(elem){
            return elem.trim();
        });

        for(index in names){
            names[index] = names[index].replace(patternForWhitespaces, ' ').trim();
        }
        player1 = {
            name: names[0],
            matchesWon: 0,
            matchesLost: 0,
            setsWon: 0,
            setsLost: 0,
            gamesWon: 0,
            gamesLost: 0
        };

        player2 = {
            name: names[1],
            matchesWon: 0,
            matchesLost: 0,
            setsWon: 0,
            setsLost: 0,
            gamesWon: 0,
            gamesLost: 0
        };

        for(index in results){
            results[index] = results[index].split('-').map(function(elem){
                return Number(elem);
            });
            if(results[index][0] > results[index][1]){
                player1.setsWon++;
                player2.setsLost++;
                player1.gamesWon += results[index][0];
                player1.gamesLost += results[index][1];
                player2.gamesWon += results[index][1];
                player2.gamesLost += results[index][0];
            }else{
                player1.setsLost++;
                player2.setsWon++;
                player2.gamesWon += results[index][1];
                player2.gamesLost += results[index][0];
                player1.gamesWon += results[index][0];
                player1.gamesLost += results[index][1];
            }
        }

        if(player1.setsWon > player2.setsWon){
            player1.matchesWon++;
            player2.matchesLost++;
        }else{
            player2.matchesWon++;
            player1.matchesLost++;
        }
        updatePlayers();

    }

    function updatePlayers() {
        var currentPlayer = player1;
        for(var i = 0; i < 2; i++){
            var existingPlayer = players.filter(function (player) {
                return player.name === currentPlayer.name;
            })[0];
            if(!existingPlayer){
                players.push(currentPlayer);
            }else{
                existingPlayer.matchesWon += currentPlayer.matchesWon;
                existingPlayer.matchesLost += currentPlayer.matchesLost;
                existingPlayer.setsLost += currentPlayer.setsLost;
                existingPlayer.setsWon += currentPlayer.setsWon;
                existingPlayer.gamesWon += currentPlayer.gamesWon;
                existingPlayer.gamesLost += currentPlayer.gamesLost;
            }
            currentPlayer = player2;
        }
    }

    players.sort(function(a,b){
        if(a.matchesWon === b.matchesWon){
            if(a.setsWon === b.setsWon){
                if(a.gamesWon === b.gamesWon){
                    return a.name.localeCompare(b.name);
                }
                return b.gamesWon - a.gamesWon;
            }
            return b.setsWon - a.setsWon;
        }
        return b.matchesWon - a.matchesWon;
    });
    console.log(JSON.stringify(players));
}

solve(['Novak Djokovic vs. Roger Federer : 6-3    6-3     3-6',
    'Roger    Federer    vs.        Novak Djokovic    :         6-2 6-3',
    'Rafael Nadal vs. Andy Murray : 4-6 6-2 5-7',
    'Andy Murray vs. David     Ferrer : 6-4 7-6',
    'Tomas   Bedrych vs. Kei Nishikori : 4-6 6-4 6-3 4-6 5-7',
    'Grigor Dimitrov vs. Milos Raonic : 6-3 4-6 7-6 6-2',
    'Pete Sampras vs. Andre Agassi : 2-1',
    'Boris Beckervs.Andre        Agassi:2-1']);
