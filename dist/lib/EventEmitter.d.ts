/**
 * Inherit EventEmitter methods
 * without polluting the class implementation
 */
export default abstract class EventEmitter {
    #private;
    on: any;
    off: any;
    once: any;
    protected emit: any;
}
