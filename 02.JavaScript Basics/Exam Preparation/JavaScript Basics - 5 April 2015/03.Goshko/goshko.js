function solve(input){
                //!          //*         //&          //#
    var index, carrots = 0, cabbage = 0, lettuce = 0, turnip = 0,
        currentRow, wallHits = 0, matrix = [], eatenCells = [],
        goshkoRow = 0, goshkoCol = 0, matrixColLength;
    var directions = input[0].split(', ');
    var patternForVegetables = /({!}|{#}|{\*}|{&})+/gi;
    var patternForCarrots = /({!})+/gi;
    var patternForCabbage = /({\*})+/gi;
    var patternForLettuce = /({&})+/gi;
    var patternForTurnip = /({#})+/gi;



    if(input.length === 2){
        wallHits = directions.length;
        printOutput();
    }else{
        for(index = 1; index < input.length; index++){
            currentRow = input[index].split(', ');
            matrix.push(currentRow);
        }

        matrixColLength = matrix[0].length;

        for(index in directions){
            makeMove(directions[index]);
        }
        printOutput();
    }



    function makeMove(direction) {
        switch(direction){
            case 'up':
                if(goshkoRow === 0){
                    wallHits++;
                }else{
                    goshkoRow--;
                    checkForEat();
                } break;
            case 'right':
                if(goshkoCol === matrixColLength - 1){
                    wallHits++;
                }else{
                    goshkoCol++;
                    checkForEat();
                } break;
            case 'left':
                if(goshkoCol === 0){
                    wallHits++;
                }else{
                    goshkoCol--;
                    checkForEat();
                } break;
            case 'down':
                if(goshkoRow === matrix.length - 1){
                    wallHits++;
                }else{
                    goshkoRow++;
                    checkForEat();
                } break;
        }
    }

    function checkForEat() {
        var isVegetableInCurrentCell = patternForVegetables.exec(matrix[goshkoRow][goshkoCol]);
        if(!isVegetableInCurrentCell){
            eatenCells.push(matrix[goshkoRow][goshkoCol]);
            return;
        }else{
            var matchCarrots = matrix[goshkoRow][goshkoCol].match(patternForCarrots);
            var matchCabbage = matrix[goshkoRow][goshkoCol].match(patternForCabbage);
            var matchLettuce = matrix[goshkoRow][goshkoCol].match(patternForLettuce);
            var matchTurnip = matrix[goshkoRow][goshkoCol].match(patternForTurnip);
            if(matchCarrots !== null){
                carrots++;
                matrix[goshkoRow][goshkoCol] = matrix[goshkoRow][goshkoCol].replace(matchCarrots, '@');
            }if(matchCabbage !== null){
                cabbage++;
                matrix[goshkoRow][goshkoCol] = matrix[goshkoRow][goshkoCol].replace(matchCabbage, '@');
            }if(matchLettuce !== null){
                lettuce++;
                matrix[goshkoRow][goshkoCol] = matrix[goshkoRow][goshkoCol].replace(matchLettuce, '@');
            }if(matchTurnip !== null){
                turnip++;
                matrix[goshkoRow][goshkoCol] = matrix[goshkoRow][goshkoCol].replace(matchTurnip, '@');
            }
            eatenCells.push(matrix[goshkoRow][goshkoCol]);
            patternForVegetables = /({!}|{#}|{\*}|{&})+/gi;
            patternForCarrots = /({!})+/gi;
            patternForCabbage = /({\*})+/gi;
            patternForLettuce = /({&})+/gi;
            patternForTurnip = /({#})+/gi;
        }
    }

    function printOutput() {
        var vegetablesOutput = '{"&":'+lettuce+',"*":'
                                +cabbage+',"#":'+turnip+',"!":'
                                +carrots+',"wall hits":'+wallHits+'}';
        console.log(vegetablesOutput);
        if(eatenCells.length === 0){
            console.log('no');
        }else{
            var joinedEatenCells = eatenCells.join('|');
            console.log(joinedEatenCells);
        }
    }

}

//solve(['right, up, up, down',
//    'asdf, as{#}aj{g}dasd, kjldk{}fdffd, jdflk{#}jdfj',
//    'tr{X}yrty, zxx{*}zxc, mncvnvcn, popipoip',
//    'poiopipo, nmf{X}02.Poll.JavaScript OOP Sample Exam 2{X}ei, mzoijwq, omcxzne']);
//
//solve(['up, right, left, down', 'as{!}xnk']);

solve(['right, right, down, left, left, down, right, right, down, left',
    'qwekjs, asd{#}a, mxz{#}{*}',
    'qwekjs, asd{#}a, xnc{&}a',
    'qwekjs, asd{#}a, xnc{&}a',
    'qwekjs, asd{#}a, xnc{&}a']);






