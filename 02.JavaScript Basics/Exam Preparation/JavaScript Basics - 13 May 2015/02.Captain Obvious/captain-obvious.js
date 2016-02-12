function solve(input) {
    var text1ToArray = input[0].toLowerCase().replace(/[?!:,.'"]+/gi, '').split(' ');
    var wordIndex;
    var text2toArray = input[1];
    var mostFrequentWords = new Array();
    var mostFrequentCash = new Array();
    for (wordIndex in text1ToArray) {
        var currentWord = '\\b' + text1ToArray[wordIndex] + '\\b';
        var countOfCurrentWord = (input[0].match(new RegExp(currentWord, "gi")) || []).length;
        if (countOfCurrentWord >= 3) {
            if (mostFrequentCash[text1ToArray[wordIndex]] === undefined) {
                mostFrequentCash[text1ToArray[wordIndex]] = countOfCurrentWord;
                mostFrequentWords.push(text1ToArray[wordIndex]);
            }
        }
    }


    if(mostFrequentWords.length === 0){
      console.log("No words");
    }else {
        var mostFrequentWordsJoined = '(\\b' + mostFrequentWords.join('\\b|\\b') + '\\b)';
        var regexPattern = new RegExp('[A-Z]*[^.!?]*' + mostFrequentWordsJoined + '{1}[^.!?]*' + mostFrequentWordsJoined + '{1}[^.!?]*[.!?]{1}', 'gi');
        var match = regexPattern.exec(text2toArray);
        var bestSentences = new Array();
        while ((match) !== null) {
            bestSentences.push(match[0].trim());
            text2toArray = text2toArray.replace(match[0], '');
            regexPattern = new RegExp('[A-Z]*[^.!?]*' + mostFrequentWordsJoined + '[^.!?]*' + mostFrequentWordsJoined + '{1}[^.!?]*[.!?]{1}', 'gi');
            match = regexPattern.exec(text2toArray)
        }

        if (bestSentences.length === 0) {
            console.log("No sentences");
        } else {
            for (var sentenceIndex in bestSentences) {
                if (sentenceIndex < bestSentences.length - 2) {
                    bestSentences[sentenceIndex];
                }
                console.log(bestSentences[sentenceIndex]);
            }

        }
    }
}


//solve(["Captain Obvious was walking down the street. As the captain was walking a person came and told him: You are Captain Obvious! He replied: Thank you CAPTAIN OBVIOUS you are the man!",
//    "The captain was walking and he was obvious. He did not know what was going to happen to you in the future. Was he curious? We do not know."]
//);
//solve(["Why, why is he so crazy, so so crazy? Why?",
//    "There are no words that you should be matching. You should be careful."]);
//
//solve(["You will match no words in this text. Print No words in the console.",
//    "Do not look at this text. You already have an output."]);
//solve(["The words: the and are, are repeated more than three thimes. Look in the second text are there sentences with those words",
//    "Yup there are no such sentences."]);
//
//
//solve(["JavaScript is a nice programming language. Some say it is shitty others are like: This is the best I have ever seen! You can do everything you want with it.",
//       "JS is the best! This's a mock test to see if you made it."]);

solve(["Lorem ipsum dolor sit amet, sale errem nam no, dictas scaevola posidonium id per. Cibo rebum eloquentiam in per, est vide suavitate et? Duo eu nostro dolorum eloquentiam, at mei libris prompta expetendis, ius hinc vero fabulas ad. Duo natum putant voluptatum ei. Vix option offendit erroribus no, his no meis menandri, ne sea cibo choro dicam. Mei agam consul electram at, vel te iisque regione! Brute adversarium consequuntur in ius, ius ex essent meliore. Sea no modus omnesque expetenda, vix ludus ceteros id, per ancillae voluptatum definitionem ea? Id vis tota dicam exerci, mea mollis expetenda ei? Vel no tation partiendo, eu nam dolore pertinax adversarium, ea sea ludus atomorum! Vix option suscipiantur concludaturque id. His elit vitae explicari ne. Duo ut nonumy iisque pertinax, ut meis zril mel?",
    "Lorem ipsum dolor sit amet, ut accumsan adipisci nam! Has oratio docendi vulputate ei, ut vis vidit ceteros. Vel eu dolor oblique, ea quot unum vel. Sint convenire at his, tempor constituam est ex. Cibo epicuri ne est, per no convenire erroribus patrioque, has te utamur oblique scaevola! No euismod senserit concludaturque has? Ei legere commodo appellantur duo, assum ponderum eu sea, nulla graece no duo? Et erant eirmod propriae his, qui invenire scripserit efficiantur ut. Integre referrentur mea at. At amet ocurreret qui, cum libris possim praesent ea, velit legere viderer an his? Vim quis solet eirmod cu. Saperet perfecto cum eu, dicant ornatus vix ne. Discere euismod detraxit has ex, sea cibo legere adolescens cu, pro eu alii elit. Ex probatus signiferumque vel? Id vix audiam delectus necessitatibus, quod ocurreret disputationi eos cu. Mea eu animal fabellas sensibus, ut sit paulo torquatos! Oratio forensibus ut ius, sed scaevola torquatos definitionem an. Everti option atomorum cu quo, vix tempor postea tincidunt ea, eu viderer aliquid democritum mel. Sed dicta abhorreant contentiones ne, sed laoreet invenire democritum cu! Per laudem sententiae ea! Nam numquam commune vulputate ex. Ridens verear disputando qui eu, per in debitis accusamus consetetur, et nec hinc nostrum evertitur? Id est iuvaret mediocrem, fastidii pertinax consectetuer sit ei, has quaeque eruditi an? Liber abhorreant argumentum nam te, eos in inimicus mnesarchum."]);





