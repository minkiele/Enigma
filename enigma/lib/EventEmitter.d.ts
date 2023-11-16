/**
 * Inherit EventEmitter methods
 * without polluting the class implementation
 */
export default interface EventEmitter {
    on: (evt: string | symbol, listener: (...args: Array<unknown>) => void) => this;
    off: (evt: string | symbol, listener: (...args: Array<unknown>) => void) => this;
    once: (evt: string | symbol, listener: (...args: Array<unknown>) => void) => this;
    emit: (evt: string | symbol, ...args: Array<unknown>) => void;
}
