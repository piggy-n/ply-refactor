import create from 'zustand';
import type { PlayerProps } from '@/index.d';
import { StreamPlayer } from '@/utils/methods/streamPlayer';

interface StateProps<U = boolean, K = null> extends PlayerProps {
    live?: U;
    resizing?: U;
    buffering?: U;
    loading?: U;
    error?: U;
    controlled?: U;
    videoContainerEle: HTMLDivElement | K;
    videoEle: HTMLVideoElement | K;
}

interface Classes {
    StreamPlayer: StreamPlayer;
}

const usePlayerStore = create<StateProps & Classes>(() => ({
        controllable: true,
        videoContainerEle: null,
        videoEle: null,
        StreamPlayer: new StreamPlayer(),
    })
);

export default usePlayerStore;
