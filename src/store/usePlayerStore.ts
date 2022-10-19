import create from 'zustand';
import type { PlayerProps } from '@/index.d';

interface StateProps extends PlayerProps {
    resizing: boolean;
    videoContainerEle: HTMLDivElement | null;
    videoEle: HTMLVideoElement | null;
}

const usePlayerStore = create<StateProps>(() => ({
        resizing: false,
        videoContainerEle: null,
        videoEle: null,
        controllable: true,
    })
);

export default usePlayerStore;
