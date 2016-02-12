"use strict";
function getAndPrintPassedStudents(input){
    for(var i = 0; i < input.length; i++){
        input[i].score = input[i].score * 1.1;
        if(input[i].score >= 100){
            input[i]['hasPassed'] = true;
        }
    }
    var passedStudents = input.filter(function(student){
        return student.score >= 100;
    });

    passedStudents.sort(function(student1, student2){
        return student1.name > student2.name;
    });

    jsConsole.writeLine(JSON.stringify(passedStudents));
}

getAndPrintPassedStudents([
        {
            'name' : 'Пешо',
            'score' : 91
        },
        {
            'name' : 'Лилия',
            'score' : 290
        },
        {
            'name' : 'Алекс',
            'score' : 343
        },
        {
            'name' : 'Габриела',
            'score' : 400
        },
        {
            'name' : 'Жичка',
            'score' : 70
        }
    ]
);