import type { PlayerOpts } from '@/index.d';

const pcn = 'ws';

const DEFAULT_PLAYER_OPTS: PlayerOpts = {
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

const headerDictionaries: Record<string, string> = {
    'default': 'DefaultHeader',
};

const mainDictionaries: Record<string, string> = {
    'default': 'DefaultMain',
};

export {
    pcn,
    DEFAULT_PLAYER_OPTS,
    headerDictionaries,
    mainDictionaries,
};
