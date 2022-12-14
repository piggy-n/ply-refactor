import MP4Box from 'mp4box';
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

    bindFunc(obj: this, func: () => void) {
        return function () {
            func.apply(obj, arguments);
        };
    }

    load() {
        if (this.sourceBuffer?.updating) return;

        if (this.arrayBuffer.length > 0) {
            const arrayBuffer = this.arrayBuffer.shift();

            if (arrayBuffer && this.sourceBuffer) {
                try {
                    this.sourceBuffer.appendBuffer(arrayBuffer);
                } catch (e) {
                    console.log(e);
                }
            }
        } else {
            this.streaming = false;
        }
    }

    onMessage(data: any, byteLength: number) {
        this.transmissionRate += byteLength / 1024;

        if (!this.mime) {
            data.fileStart = 0;
            this.MP4BoxFile?.appendBuffer(data);
        }

        if (this.mime && !this.streaming) {
            const arrayBuffer = this.arrayBuffer.shift();

            if (arrayBuffer && this.sourceBuffer) {
                try {
                    this.sourceBuffer.appendBuffer(arrayBuffer);
                    this.streaming = true;
                } catch (e) {
                    console.log(e);
                    this.stop();
                }
            }
        }

        if (this.ele && this.ele.duration - this.ele.currentTime > 0.9) {
            this.ele.currentTime = this.ele.duration - 0.5;
        }

        this.arrayBuffer.push(data);
    }

    sourceOpen() {
        if (this.mediaSource) {
            try {
                this.mediaSource.duration = 1;
            } catch (e) {
                console.log(e);
            }
        }

        this.ws = new WebSocket(this.url!);
        this.ws.binaryType = 'arraybuffer';

        this.ws.onmessage = (e) => {
            this.onMessage(e.data, e.data.byteLength);
        };

        this.ws.onopen = () => {
            this.transmissionRateInterval = setInterval(
                () => {
                    this.dispatch({
                        transmissionRate: this.transmissionRate
                    });
                    this.transmissionRate = 0;
                },
                1000
            );

            this.connectionTimes = 0;
        };

        this.ws.onclose = () => {
            this.connectionTimes++;

            if (this.connectionTimes <= 3) {
                this.ws = new WebSocket(this.url!);
            }
        };

        this.ws.onerror = () => {
            this.ws?.close();
            this.MP4BoxFile?.stop();
        };
    }

    registerEvents() {
        this.MP4BoxFile.onError = () => {
            this.stop();
        };

        this.MP4BoxFile.onReady = (info: any) => {
            if (info.mime && MediaSource.isTypeSupported(info.mime)) {
                this.mime = info.mime;
                this.sourceBuffer = this.mediaSource?.addSourceBuffer(info.mime);
                this.loadHandler = this.bindFunc(this, this.load);

                if (this.sourceBuffer) {
                    this.sourceBuffer.mode = 'sequence';
                    this.sourceBuffer.addEventListener('updateend', this.loadHandler);
                }

                this.dispatch({
                    mime: this.mime?.includes('hvc1') ? 'H.265' : 'H.264',
                });
            }
        };
    }

    init() {
        this.mediaSource = new MediaSource();
        this.sourceOpenHandler = this.bindFunc(this, this.sourceOpen);
        this.mediaSource.addEventListener('sourceopen', this.sourceOpenHandler);
        this.ele!.src = URL.createObjectURL(this.mediaSource);
        this.MP4BoxFile = MP4Box.createFile();
        this.registerEvents();
    }

    play() {
        if (!this.ele || !this.url) return;
        this.init();
    }

    start(ele: HTMLVideoElement, url: string) {
        if (!ele || !url) return;

        this.ele = ele;
        this.url = url;
        this.init();
    }

    pause() {
        if (this.ws) {
            this.ws.close();
            this.ws.onopen = null;
            this.ws.onmessage = null;
            this.ws.onclose = null;
            this.ws = undefined;
        }

        if (this.MP4BoxFile) {
            this.MP4BoxFile.stop();
        }

        if (this.sourceBuffer) {
            this.sourceBuffer.removeEventListener('updateend', this.loadHandler!);
            this.mediaSource?.removeSourceBuffer(this.sourceBuffer);
            this.sourceBuffer = undefined;
        }

        if (this.mediaSource) {
            this.mediaSource.removeEventListener('sourceopen', this.sourceOpenHandler!);
            this.mediaSource = undefined;
        }

        if (this.transmissionRateInterval) {
            clearInterval(this.transmissionRateInterval);
        }

        this.mime = undefined;
        this.streaming = false;
        this.arrayBuffer = [];

        this.dispatch({
            transmissionRate: 0,
        });
    }

    stop() {
        this.pause();
        this.MP4BoxFile = undefined;
        this.ele = undefined;
        this.url = undefined;

        this.dispatch({
            mime: '',
        });
    }

    reload() {
        this.pause();
        this.play();
    }
}
