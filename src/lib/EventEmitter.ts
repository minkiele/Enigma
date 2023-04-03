import BaseEventEmitter from 'events';

/**
 * Inherit EventEmitter methods
 * without polluting the class implementation
 */
abstract class EventEmitter {
  #eventEmitter = new BaseEventEmitter();
  public on = this.#eventEmitter.on.bind(this);
  public off = this.#eventEmitter.off.bind(this);
  public once = this.#eventEmitter.once.bind(this);
  protected emit = this.#eventEmitter.emit.bind(this);
}

export default EventEmitter;
