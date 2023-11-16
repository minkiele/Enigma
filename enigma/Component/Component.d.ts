import EventEmitter from '../lib/EventEmitter';
export default abstract class Component {
    #private;
    setEventEmitter(ee: EventEmitter): this;
    unsetEventEmitter(): this;
    getEventEmitter(): EventEmitter | undefined;
}
