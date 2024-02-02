type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
export type ExtractPlaceholderNames<T extends string> = T extends `${string}[${infer Name}]${infer Rest}` ? Prettify<{
    [K in Name]: string;
} & ExtractPlaceholderNames<Rest>> : {};
export type ExtractPlaceholderNames2<T extends string> = T extends `${string}{${infer Name}}${infer Rest}` ? Prettify<{
    [K in Name]: string;
} & ExtractPlaceholderNames2<Rest>> : {};
type BracketzReturn<T extends string> = {
    (values?: ExtractPlaceholderNames<T> & ExtractPlaceholderNames2<T>): T;
    args?: string[];
};
export default function bracketz<T extends string>(text: T): BracketzReturn<T>;
export {};
