import Component from '../Component.js';

export default abstract class WiredWheel implements Component {
  //It is the common point for rotors and reflectors
  // Note: there's no need to make it #private since
  // it would need both getter and setter
  protected abstract wirings: string;
}
