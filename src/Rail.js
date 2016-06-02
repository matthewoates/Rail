import Logdown from 'Logdown';

let RailLog = new Logdown({prefix: 'RAIL'});
let RLog = new Logdown({prefix: 'RESPONSE'}); // TODO
let ALog = new Logdown({prefix: 'ANIMATION'}); // TODO: false positives (response or idle)
let ILog = new Logdown({prefix: 'IDLE'}); // TODO
let LLog = new Logdown({prefix: 'LOAD'});
let verbose = false;
let now = () => Date.now();

let timing = {
    response: 100,
    animation: 16,
    idle: 50,
    load: 1000
};

function checkLoad() {
    return new Promise(resolve => {
        if (performance.timing.domContentLoadedEventEnd === 0) {
            if (verbose) LLog.debug('Scheduling load listener');
            addEventListener('load', () => {
                checkLoad();
                resolve();
            });
        } else {
            let delta = performance.timing.domContentLoadedEventEnd - performance.timing.connectStart;

            if (delta > timing.load) LLog.warn('*' + delta + '* ms load');
            else LLog.log('*' + delta + '* ms load');

            resolve();
        }
    });
}

var timeout;
var lastTimeout;
function tick() {
    let delta = now() - lastTimeout;
    if (delta > timing.animation) {
        ALog.warn('*' + (now() - lastTimeout) + '* animation');
    }

    lastTimeout = now();

    setTimeout(tick, 0);
}

function checkTimeSetting(setting) {
    if (timing[setting] < timing.animation) {
        RAIL.warn('*' + setting + '*' + ' too low!');
        timing[setting] = timing.animation;
    }
}

export default class Rail {
    static start(options) {
        verbose = options && options.verbose;
        timing = {
            ...timing,
            ...(options && options.timing)
        };

        checkTimeSetting('response');
        checkTimeSetting('idle');
        checkTimeSetting('load');

        checkLoad().then(tick);
    }

    static stop() {
        clearTimeout(lastTimeout);
    }
}
