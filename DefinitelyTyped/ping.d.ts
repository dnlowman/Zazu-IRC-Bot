/// <reference path="./node.d.ts" />
declare module 'ping' {
    var sys: {
        probe(host: any, message: any): void;
    };
}
