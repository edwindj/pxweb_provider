const request = require("superagent");

export function say_hello(name:string){
    return `Hello #{name}`;
}