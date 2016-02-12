function solve(input){
    const asciiIncrementor = 13;
    var patternParagraphs = /(?:<p>)(.*?)(?:<\/p>)/g,
        patternFromAtoM = /[a-m]/g,
        patternFromNtoZ = /[n-z]/g,
        patternForReplace = /[^a-z0-9]+/g,
        outputString = '',
        match,
        letterForReplace,
        index;

    while (match = patternParagraphs.exec(input)){
        outputString += match[1];
    }

    outputString = outputString.replace(patternForReplace, ' ');
    for(index in outputString){
        if(outputString[index].match(patternFromAtoM)){
            letterForReplace = String.fromCharCode(outputString.charCodeAt(index) + asciiIncrementor);
            outputString = replaceAt(outputString, index, letterForReplace);
            continue;
        }else if(outputString[index].match(patternFromNtoZ)){
            letterForReplace = String.fromCharCode(outputString.charCodeAt(index) - asciiIncrementor);
            outputString = replaceAt(outputString, index, letterForReplace);
        }
    }
    outputString = outputString.replace(/[\s]+/gi, ' ');
    console.log(outputString);

    function replaceAt(string, index, char) {
        var a = string.split("");
        a[index] = char;
        return a.join("");
    }
}
solve('<p>jura qevivat va jrg fyvccrel!@##$%%^&&&*!@##$%%^&&&* fabjl pbaqvgvbaf fabj !@##$%%^&&&*punvaf ner nofbyhgryl rffragvny sbe<p></p>%%%%%%% fnsr unaqyvat nygubhtu fabj punvaf znl ybbx vagvzvqngvat gur!@##$%%^&&&*onfvp vqrn vf ernyyl fvzcyr svg gurz bire lbhe gverf qevir sbejneq fybjyl naq gvtugra gurz hc!@##$%%^&&&* va pbyq</p>');
//solve('<html><head><title></title></head><body><p>Intro</p><ul><li>Item01</li><li>Item02</li><li>Item03</li></ul><p>jura qevivat va jrg%^&%^&^%&^))))()%^&%^&^%&^))))()%^&%^&^%&^))))() fyvccrel fabjl</p><div><button>Click me, baby!</button></div><p> pbaqvgvbaf fabj punvaf ner nofbyhgryl nygubhtu fabj punvaf znl ybbx </p><span>This manual is false, do not trust it! The illuminati %^&%^&^%&^))))()wrote it down to trick you!</span><p>vagvzvqngvat gur onfvp vqrn vf ernyyl fvzcyr svg gurz bire lbhe gverf qevir sbejneq fybjyl naq gvtugra gurz hc va pbyq jrg</p><p> pbaqvgvbaf guvf vf rnfvre %^&%^&^%&^))))()%^&%^&^%&^))))()fnvq guna qbar ohg vs lbh chg ba lbhe gverf </p><p>it is frustrating that you have not put car chains yet... embarrassing...</p><p>orsber lbh ernpu fabjl ebnqf lbh jvyy znxr lbhe yvsr jnl rnfvre</p><span>it is not that fun making tests sometimes, onlysometimes :)</span></body>');
//solve('<html><head><title></title></head><body><h1>hello</h1><p>znahny!@#%&&&&****</p><div><button>dsad</button></div><p>grkg^^^^%%%)))([]12</p></body></html>');
//solve('<html><head><title></title></head><body><h1>Intro</h1><ul><li>Item01</li><li>Item02</li><li>Item03</li></ul><p>jura qevivat va jrg%^&%^&^%&^))))()%^&%^&^%&^))))()%^&%^&^%&^))))() fyvccrel fabjl</p><div><button>Click me, baby!</button></div><p> pbaqvgvbaf fabj punvaf ner nofbyhgryl nygubhtu fabj punvaf znl ybbx </p><span>This manual is false, do not trust it! The illuminati %^&%^&^%&^))))()wrote it down to trick you!</span><p>vagvzvqngvat gur onfvp vqrn vf ernyyl fvzcyr svg gurz bire lbhe gverf qevir sbejneq fybjyl naq gvtugra gurz hc va pbyq jrg</p><p> pbaqvgvbaf guvf vf rnfvre %^&%^&^%&^))))()%^&%^&^%&^))))()fnvq guna qbar ohg vs lbh chg ba lbhe gverf </p><p>it is frustrating that you have not put car chains yet... embarrassing...</p><p>orsber lbh ernpu fabjl ebnqf lbh jvyy znxr lbhe yvsr jnl rnfvre</p><span>it is not that fun making tests sometimes, onlysometimes :)</span></body>');
//solve('<html><head><title></title></head><body><h1>Intro</h1><ul><li>Item01</li><li>Item02</li><li>Item03</li></ul><p>jura qevivat va jrg fyvccrel fabjl</p><div><button>Click me, baby!</button></div><p> pbaqvgvbaf fabj  qpunvaf ner nofbyhgryl rffragvny sbe fnsr unaqyvat nygubhtu fabj punvaf znl ybbx </p><span>This manual is false, do not trust it! The illuminati wrote it down to trick you!</span><p>vagvzvqngvat gur onfvp vqrn vf ernyyl fvzcyr svg gurz bire lbhe gverf qevir sbejneq fybjyl naq gvtugra gurz hc va pbyq jrg</p><p> pbaqvgvbaf guvf vf rnfvre fnvq guna qbar ohg vs lbh chg ba lbhe gverf</p></body>');