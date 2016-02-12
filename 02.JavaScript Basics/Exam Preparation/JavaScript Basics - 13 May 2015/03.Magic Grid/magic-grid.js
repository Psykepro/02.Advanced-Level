function solve(inputArr){
    var string = inputArr[0];
    var magicNumber = Number(inputArr[1]);


    var firstNumRow = 0;
    var firstNumCol = 0;
    var rowOfFirstNum;
    var colOfFirstNum;
    var rowOfSecondNum;
    var colOfSecondNum;
    var magicCoupleFound = false;

    var row, col;
    var currentStringLine;

    var matrixLength = inputArr.length - 2;
    var matrix = [];

    for(row = 2;row < inputArr.length; row++){
        currentStringLine = String(inputArr[row]).split(" ");

        currentStringLine = currentStringLine.map(function(num){
            return Number(num);
        });

        matrix[row - 2] = currentStringLine;

    }

    var firstNumber = Number(matrix[0][0]);
    var secondNum = 0;
    while (!magicCoupleFound){

        for(row = firstNumRow; row < matrixLength; row++){
            for(col = row === firstNumRow ? firstNumCol + 1 : 0; col < matrixLength; col++){

                secondNum = matrix[row][col];
                if((firstNumber + secondNum) === magicNumber){
                    magicCoupleFound = true;
                    rowOfFirstNum = firstNumRow;
                    colOfFirstNum = firstNumCol;
                    rowOfSecondNum = row;
                    colOfSecondNum = col;
                    decryptAndPrintString();
                    return;
                }
            }
        }

        if(firstNumCol === matrixLength - 1){
            firstNumRow++;
            firstNumCol = 0;
        }
        else{
            firstNumCol++;
        }

        firstNumber = matrix[firstNumRow][firstNumCol];
    }

    function decryptAndPrintString(){
        var outputString = '';
        var sumOfRowsAndCols = rowOfFirstNum + colOfFirstNum + rowOfSecondNum + colOfSecondNum;
        for(col in string){
            if(col % 2 === 0){
                outputString += String.fromCharCode(string.charCodeAt(col) + sumOfRowsAndCols);
            }else{
                outputString += String.fromCharCode(string.charCodeAt(col) - sumOfRowsAndCols);
            }
        }
        console.log(outputString);
    }
}

var inputArr = ['QqdvSpg',
    '400',
    '100 200 120',
    '120 300 310',
    '150 290 370'
];

var inputArr1 = ['>scsimh$deo$]$^mnxdh]}',
    '400',
    '200 100 120',
    '120 102 300',
    '150 290 370'
];


//solve(inputArr);
solve(inputArr1);