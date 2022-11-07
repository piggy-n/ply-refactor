// import MP4Box from 'mp4box';
import type { Dispatch } from 'react';
import type { PlayerStoreState } from '@/store/usePlayerStore';

interface Options {
    dispatch: Dispatch<PlayerStoreState>;
}

export class StreamPlayer {
    ws?: WebSocket;
    ele?: HTMLVideoElement;
    url?: string;
    mime?: string;
    streaming?: boolean;
    mediaSource?: MediaSource;
    arrayBuffer: ArrayBuffer[];
    sourceBuffer?: SourceBuffer;
    MP4BoxFile?: any;
    connectionTimes: number;
    transmissionRate: number;

    loadHandler?: () => void;
    sourceOpenHandler?: () => void;
    dispatch: Dispatch<PlayerStoreState>;
    transmissionRateInterval?: NodeJS.Timeout;

    constructor(options: Options) {
        this.dispatch = options.dispatch;
        this.arrayBuffer = [];
        this.connectionTimes = 0;
        this.transmissionRate = 0;
    }

    bindFunc(obj: Record<string, unknown>, func: () => void) {
        return function () {
            func.apply(obj, arguments);
        };
    }
}
