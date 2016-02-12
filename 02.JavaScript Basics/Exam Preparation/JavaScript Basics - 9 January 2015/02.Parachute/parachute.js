function solve(input){
    var col, row, startingRow, currentLine, positionFound = false, index, index2, leftArrows, rightArrows;
    var leftArrowsPattern = /</gi;
    var rightArrowsPattern = />/gi;
    const ground = '_',
        water = '~',
        cliff1 = '/',
        cliff2 = '\\',
        cliff3 = '|';
    for(index in input){
        if(positionFound){
            break;
        }
        currentLine = input[index];
        for(index2 in currentLine){
            if(currentLine[index2] === 'o'){
                col = Number(index2);
                row = Number(index);
                startingRow = row;
                positionFound = true;
                break;
            }
        }
    }

    for(var index = 1; index < input.length; index++) {
        currentLine = input[index];

        leftArrows = currentLine.match(leftArrowsPattern);
        rightArrows = currentLine.match(rightArrowsPattern);
        if (leftArrows) {
            leftArrows = leftArrows.length;
        }
        if (rightArrows) {
            rightArrows = rightArrows.length;
        }
        leftArrowsPattern = /</gi;
        rightArrowsPattern = />/gi;
        if (leftArrows === rightArrows || (leftArrows === 0 || rightArrows === 0)) {
            row++;
            var landed = checkIfHitLandingPlace(currentLine);
            if (landed) {
                // print result with method
                printResult(landed);
                return;
            }
        } else {
            if (leftArrows > rightArrows) {
                leftArrows = leftArrows - rightArrows;
                col -= leftArrows;
            } else {
                rightArrows = rightArrows - leftArrows;
                col += rightArrows;
            }
            row++;
            var landed = checkIfHitLandingPlace(currentLine);
            if (landed) {
                // print result with method
                printResult(landed);
                return;
            }
        }
    }
        function printResult(landed) {
            var output = '';
            if(landed === 'ground'){
                output = 'Landed on the ground like a boss!' + '\n' + row + ' ' + col;
                console.log(output);
                return;
            }else if(landed === 'water') {
                output = 'Drowned in the water like a cat!' + '\n' + row + ' ' + col;
                console.log(output);
                return;
            }else {
                output = 'Got smacked on the rock like a dog!' + '\n' + row + ' ' + col;
                console.log(output);
                return;
            }
        }

        function checkIfHitLandingPlace(currentLine) {
            if (currentLine[col] === water) {
                return 'water';
            } else if (currentLine[col] === ground) {
                return 'ground';
            } else if (currentLine[col] === cliff1 || currentLine[col] === cliff2 || currentLine[col] === cliff3) {
                return 'cliff';
            }
        }
}



solve(['--o----------------------',
    '>------------------------',
    '>------------------------',
    '>-----------------/\\-----',
    '-----------------/--\\----',
    '>---------/\\----/----\\---',
    '---------/--\\--/------\\--',
    '<-------/----\\/--------\\-',
    '\\------/----------------\\',
    '-\\____/------------------']);

solve(['-------------o-<<--------',
    '-------->>>>>------------',
    '---------------->-<---<--',
    '------<<<<<-------/\\--<--',
    '--------------<--/-<\\----',
    '>>--------/\\----/<-<-\\---',
    '---------/<-\\--/------\\--',
    '<-------/----\\/--------\\-',
    '\\------/--------------<-\\',
    '-\\___~/------<-----------']);






















