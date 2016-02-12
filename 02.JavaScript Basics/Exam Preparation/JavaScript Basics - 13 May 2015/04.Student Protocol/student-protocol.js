function solve(input){
    var students = {},
        sortedStudent = {},
        language;

    function updateStudent(name,language, score){
        var newStudent = {
            name: name,
            result: score,
            makeUpExams: 0
        };
        var isStudent = students[language].filter(function(p){
            return p.name == name
        })[0];

        if(!isStudent){
            students[language].push(newStudent);
        }
        else {
            if(isStudent.result < score){
                isStudent.result = score;
            }
            isStudent.makeUpExams++;
        }
    }

    input.forEach(function (inputLine) {
        var inputTokens = inputLine.split('-'),
            name = inputTokens[0].trim(),
            resultData = inputTokens[1].split(':'),
            language = resultData[0].trim(),
            result = Number(resultData[1].trim());

        if(result >= 0 && result <= 400){
            if(!students[language]){
                students[language] = [];
            }
            updateStudent(name, language, result);
        }
    });

    Object.keys(students).forEach(function (entry) {
        sortedStudent[entry] = students[entry].sort(function (a, b) {
            if (a.result == b.result) {
                if(a.makeUpExams== b.makeUpExams){
                    return a.name.localeCompare(b.name);
                }
                return a.makeUpExams - b.makeUpExams;
            }
            return b.result - a.result;
        })
    });

    console.log(JSON.stringify(sortedStudent));

}

var data = [
    "Peter Jackson - Java : 350",
    "Jane - JavaScript : 200",
    "Jane     -    JavaScript :     400",
    "Simon Cowell - PHP : 100",
    "Simon Cowell-PHP: 500",
    "Simon Cowell - PHP : 200"
];

var dataSecond = [
    "Scarlett Johansson - HTML & CSS : 500",
    "Scarlett Johansson - HTML & CSS : 100",
    "Scarlett Johansson - HTML & CSS : 200",
    "Scarlett Johansson - HTML & CSS : 350",
    "Scarlett Johansson - HTML & CSS : 250",
    "Scarlett Johansson - HTML & CSS : 150",
    "Scarlett Johansson - HTML & CSS : 300"
];

solve(data);
solve(dataSecond);
