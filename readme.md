# Bracketz - Parse brackets in string

Parse brackets in string with the power of typescript.

## Usage

```ts
let b = bracketz("Hello [username], you are connected since [login_timestamp]");

console.log(b.args); // [ "username", "login_timestamp" ]
console.log(b({ username: "Nekomancer", login_timestamp: "615245162162414" })); // Hello Nekomancer, you are connected since 615245162162414
```
