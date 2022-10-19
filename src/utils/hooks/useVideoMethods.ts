import usePlayerStore from '@/store/usePlayerStore';
import { useMemo } from 'react';
import type { VideoMethods } from '@/index.d';

export const useVideoMethods = () => {
    const { url, live } = usePlayerStore(s => s);

    const play = () => {
        console.log('play');
    };

    const pause = () => {
        console.log('pause');
    };

    const reload = () => {
        console.log('reload');
    };

    const setPlayProgress = (progress: number) => {
        console.log(progress);
    };

    const setVideoSrc = (src: string) => {
        console.log(src);
    };

    return useMemo<VideoMethods>(
        () => ({
            play,
            pause,
            reload,
            setPlayProgress,
            setVideoSrc,
        }),
        [url, live]
    );
};
