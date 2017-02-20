import EventEmitter from 'eventemitter3');
import reportSlowTicks from './ReportSlowTicks';

const DEFAULT_OPTIONS = {
    response: 100,
    animation: 16,
    idle: 50,
    load: 1000,
    console: true
};


export default class Rail {
    static start(options) {
        this._options = {
            ...DEFAULT_OPTIONS,
            ...options
        };

        this._emitter = new EventEmitter();

        reportSlowTicks(this._emitter);
        loop(this._emitter);
    }
}
