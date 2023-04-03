/**
 * Inherit EventEmitter methods
 * without polluting the class implementation
 */
declare abstract class EventEmitter {
    #private;
    on: any;
    off: any;
    once: any;
    protected emit: any;
}
export default EventEmitter;
