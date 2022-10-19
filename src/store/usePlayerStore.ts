import create from 'zustand';
import type { PlayerProps } from '@/index.d';

interface StateProps<U = boolean, K = null> extends PlayerProps {
    live?: U;
    resizing?: U;
    videoContainerEle: HTMLDivElement | K;
    videoEle: HTMLVideoElement | K;
}

interface Setters {
    setLive: (url?: string) => void;
}

const usePlayerStore = create<StateProps & Setters>(set => ({
        controllable: true,
        videoContainerEle: null,
        videoEle: null,
        setLive: url => set({ live: url?.startsWith('ws') }),
    })
);

export default usePlayerStore;
