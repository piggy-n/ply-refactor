import type { PlayerOpts } from '@/index.d';

export const DEFAULT_PLAYER_OPTS: PlayerOpts = {
    defaultPosition: {
        x: 0,
        y: 0,
    },
    defaultSize: {
        width: 480,
        height: 270,
    },
    bounds: 'body',
};
