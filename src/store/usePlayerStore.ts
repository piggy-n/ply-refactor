import create from 'zustand';
import type { PlayerProps, isArgVoid } from '@/index.d';
import { StreamPlayer } from '@/utils/methods/streamPlayer';

interface StateProps<U = boolean, K = null> extends PlayerProps {
    live?: U;
    resizing?: U;
    buffering?: U;
    videoContainerEle: HTMLDivElement | K;
    videoEle: HTMLVideoElement | K;
}

interface Classes {
    StreamPlayer: StreamPlayer;
}

interface Setters<U = boolean> {
    setLive: isArgVoid<U>;
}

const usePlayerStore = create<StateProps & Setters & Classes>(set => ({
        controllable: true,
        videoContainerEle: null,
        videoEle: null,
        StreamPlayer: new StreamPlayer(),
        setLive: live => set({ live }),
    })
);

export default usePlayerStore;
