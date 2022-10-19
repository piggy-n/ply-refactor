import create from 'zustand';
import type { PlayerProps } from '@/index.d';

interface StateProps extends PlayerProps {
    resizing: boolean;
    videoContainerEle: HTMLDivElement | null;
    videoEle: HTMLVideoElement | null;
    live: boolean;
    setLive: (url?: string) => void;
}

const usePlayerStore = create<StateProps>(set => ({
        resizing: false,
        videoContainerEle: null,
        videoEle: null,
        controllable: true,
        live: true,
        setLive: (url?: string) => set({ live: url?.startsWith('ws') }),
    })
);

export default usePlayerStore;
