export const pauseOrReplayHandler = (live: boolean, ended: boolean, method?: () => void) => {
    if (ended) return;

    if (live) {
        console.log('live');
    }

    method && method();
};
