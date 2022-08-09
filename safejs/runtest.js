const {NodeVM} = require('vm2');

const fs = require('fs');

const vm = new NodeVM();
const unsafe = fs.readFileSync('./unsafe.js').toString();
const parse = vm.runFile(`${process.argv[2]}/parse.js`);
const func = vm.run(unsafe + "\n\nmodule.exports=(...args) => add(...args)");

// The sandbox uses proxies that make returned arrays malformed.
// This fixes them by doing a deep copy
const fixArr = arr => {
    if(!arr[Symbol.iterator]) return arr;
    return [...arr.map(fixArr)]
}

process.stdin.on("data", data => {
    const returned = fixArr(parse(data.toString()));
    returned.forEach(val => {
        console.log(func(...val));
    })
})