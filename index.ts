type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ExtractPlaceholderNames<T extends string> =
  T extends `${string}[${infer Name}]${infer Rest}`
    ? Prettify<{ [K in Name]: string } & ExtractPlaceholderNames<Rest>>
    : {};

export type ExtractPlaceholderNames2<T extends string> =
  T extends `${string}{${infer Name}}${infer Rest}`
    ? Prettify<{ [K in Name]: string } & ExtractPlaceholderNames2<Rest>>
    : {};

let regex = /\[([^\]]+)]/g;
let regex2 = /\{([^\]]+)}/g;

type BracketzReturn<T extends string> = {
  (values?: ExtractPlaceholderNames<T> & ExtractPlaceholderNames2<T>): T;
  args?: string[];
};

export default function bracketz<T extends string>(text: T): BracketzReturn<T> {
  let x: BracketzReturn<T> = (
    values?: ExtractPlaceholderNames<T> & ExtractPlaceholderNames2<T>
  ) => {
    if (!values) return text;

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

  let results: string[] = [];

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

console.log(bracketz("hello {username}").args);
