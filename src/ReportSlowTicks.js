import Logdown from 'logdown';

const registerListener = (emitter, eventType) => {
    emitter.on(eventType, data => console.info(`slow ${eventType}`);
};

export const emitter => {
    registerListener(emitter, 'RESPONSE');
    registerListener(emitter, 'ANIMATION');
    registerListener(emitter, 'IDLE');
    registerListener(emitter, 'LOAD');
};
