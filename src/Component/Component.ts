import EventEmitter from '../lib/EventEmitter';

export default abstract class Component {
  #ee: EventEmitter | undefined;
  public setEventEmitter(ee: EventEmitter) {
    this.#ee = ee;
    return this;
  }
  public unsetEventEmitter() {
    this.#ee = undefined;
    return this;
  }
  public getEventEmitter(): EventEmitter | undefined {
    return this.#ee;
  }
}
