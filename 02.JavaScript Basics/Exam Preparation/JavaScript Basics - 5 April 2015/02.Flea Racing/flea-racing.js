function solve(input){
    var jumpsAllowed = Number(input[0]);
    var lengthOfTrack = Number(input[1]) - 1,
        index, tempFlea, fleaName, fleaJumpDistance, fleas = [], winnerAchieved = false, winnerName;
    function Flea(name, jumpsAllowed, jumpDistance){
        this.name = name;
        this.remainingJumps = jumpsAllowed;
        this.jumpDistance = jumpDistance;
        this.currentPosition = 0;
        this.makeJump = function(){
            this.currentPosition += jumpDistance;
            this.remainingJumps--;
        }
    }
    for(index = 2; index < input.length; index++){
        fleaName = input[index].split(',')[0];
        fleaJumpDistance = Number(input[index].split(',')[1].trim());
        tempFlea = new Flea(fleaName, jumpsAllowed, fleaJumpDistance);
        fleas.push(tempFlea);
    }

    if(lengthOfTrack === 0){
        winnerName = fleas[0].name;
        winnerAchieved = true;
    }else{
        while(fleas[0].remainingJumps > 0 && winnerAchieved !== true){
            fleas.forEach(function(flea){
                if(winnerAchieved === false) {
                    flea.makeJump();
                }
                if(flea.currentPosition >= lengthOfTrack){
                    winnerAchieved = true;
                    winnerName = flea.name;
                }
            });
        }
    }

    if(winnerAchieved === true){
        printTrack();
        console.log('Winner: ' + winnerName);
    }else{
        var furthestFleaDistance = 0;
        fleas.forEach(function(flea){
            if(flea.currentPosition > furthestFleaDistance){
                furthestFleaDistance = flea.currentPosition;
            }
        });
        var furthestFleas = fleas.filter(function(flea){
            return flea.currentPosition === furthestFleaDistance;
        });
        if(furthestFleas.length > 1){
            winnerName = furthestFleas[furthestFleas.length - 1].name;
            if(furthestFleas[furthestFleas.length - 1].currentPosition > lengthOfTrack){
                postitionOutOfTrack = furthestFleas[furthestFleas.length - 1].currentPosition;
            }
        }else{
            winnerName = furthestFleas[0].name;
            if(furthestFleas[0].currentPosition > lengthOfTrack){
                postitionOutOfTrack = furthestFleas[0].currentPosition;
            }
        }
        printTrack();
        console.log('Winner: ' + winnerName);
    }
    function printTrack(winnerOutOfTrack){
        var hashLine = '';
        var trackLine = '';
        for(var hashSigns = 0; hashSigns <= lengthOfTrack; hashSigns++){
            hashLine += '#';
        }
        for(index = 0; index < 2; index++){
            console.log(hashLine)
        }

        fleas.forEach(function(flea){
            if(flea.currentPosition > lengthOfTrack){
                for(index = 0; index < lengthOfTrack; index++){
                    trackLine += '.';
                }
                trackLine += flea.name[0].toUpperCase();
            }else{
                for(index = 0; index <= lengthOfTrack; index++){
                    if(index === flea.currentPosition){
                        trackLine += flea.name[0].toUpperCase();
                    }else{
                        trackLine += '.';
                    }
                }
            }

            console.log(trackLine);
            trackLine = '';
        });
        for(index = 0; index < 2; index++){
            console.log(hashLine)
        }

    }
}

solve(['10','19','angel, 9','Boris, 10','Georgi, 3','Dimitar, 7']);
solve(['3','5','cura, 1','Pepi, 1','UlTraFlea, 1','BOIKO, 1']);
solve(['3','10','Suzi, 5']);
solve(['1','1','pesho, 1','gosho, 1']);
















