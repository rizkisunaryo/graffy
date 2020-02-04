export default class Graffy {
    constructor(path?: any[], core?: Core);
    core: Core;
    path: any[];
    on(type: any, ...args: any[]): void;
    onRead(...args: any[]): void;
    onWatch(...args: any[]): void;
    onWrite(...args: any[]): void;
    use(...args: any[]): void;
    call(type: any, unwrappedPayload: any, options: any): any;
    read(...args: any[]): Promise<any>;
    watch(...args: any[]): AsyncGenerator<any, void, unknown>;
    write(...args: any[]): Promise<any>;
}
import Core from "./Core.js";