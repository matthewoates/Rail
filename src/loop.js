const getTime = () => new Date().getTime();

const loop = emitter => {
    emitter.emit('tick', getTime());

    requestAnimationFrame(loop);
};

export default loop;