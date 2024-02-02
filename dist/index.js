"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let regex = /\[([^\]]+)]/g;
let regex2 = /\{([^\]]+)}/g;
function bracketz(text) {
    let x = (values) => {
        if (!values)
            return text;
        let keys = Object.keys(values);
        let result = text;
        for (let key of keys) {
            // @ts-ignore
            let val = values[key];
            // @ts-ignore
            result = result.replace(`[${key}]`, val);
            // @ts-ignore
            result = result.replace(`{${key}}`, val);
        }
        return result;
    };
    let iterable = text.matchAll(regex);
    let iterable2 = text.matchAll(regex2);
    let array = Array.from(iterable);
    let array2 = Array.from(iterable2);
    let results = [];
    array.forEach((v) => {
        // @ts-ignore
        results.push(v[1]);
    });
    array2.forEach((v) => {
        // @ts-ignore
        results.push(v[1]);
    });
    x.args = results;
    return x;
}
exports.default = bracketz;
console.log(bracketz("hello {username}").args);
