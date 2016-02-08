function printArgsInfo(){
    var args = [this.name, this.age, this.isMale];
    for(var index in args){
        if(args[index] === null){
            console.log('null (' + typeof args[index] + ')');
        }else if(args[index] === undefined){
            console.log('undefined (' + typeof args[index] + ')');
        }else if(Array.isArray(args[index])){
            var space = args[index].toString() === '' ? '' : ' ';
            console.log(args[index].toString() + space + '(array)');
        }else{
            var space = args[index].toString() === '' ? '' : ' ';
            console.log(args[index].toString() + space + '(' + typeof args[index] + ')');
        }
    }
}
var obj = {
    name : 'gosho',
    age : 12,
    isMale : true
};

printArgsInfo.call(obj);
printArgsInfo.call(obj, obj.name, obj.age, obj.isMale);
printArgsInfo.apply(obj);
printArgsInfo.apply(obj, [obj.name, obj.age, obj.isMale]);


//printArgsInfo().call(obj, this.name, this.age, this.isMale);
//printArgsInfo([[1, [2, [3, [4, 5]]]], ["string", "array"]]);
//printArgsInfo("some string", [1, 2], ["string", "array"], ["mixed", 2, false, "array"], {name: "Peter", age: 20});
//printArgsInfo([1, 2], ["string", "array"], ["single value"]);
//printArgsInfo(null, undefined, "", 0, [], {});
//printArgsInfo(2, 3, 2.5, -110.5564, false);




