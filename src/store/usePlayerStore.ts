import create from 'zustand';

interface StateProps {
    resizing: boolean;
    videoContainerEle: HTMLDivElement | null;
    videoEle: HTMLVideoElement | null;
}

const usePlayerStore = create<StateProps>(() => ({
        resizing: false,
        videoContainerEle: null,
        videoEle: null,
    })
);

export default usePlayerStore;
