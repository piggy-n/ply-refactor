import create from 'zustand';
import type { PlayerProps } from '@/index.d';
import { StreamPlayer } from '@/utils/methods/streamPlayer';

interface StateProps<U = boolean, K = null> extends PlayerProps {
    live?: U;
    resizing?: U;
    videoContainerEle: HTMLDivElement | K;
    videoEle: HTMLVideoElement | K;
}

interface Classes {
    StreamPlayer: StreamPlayer;
}

interface Setters<U = boolean> {
    setLive: (arg: U) => void;
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
