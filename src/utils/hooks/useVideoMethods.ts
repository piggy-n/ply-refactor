import { useContext, useMemo } from 'react';
import type { VideoMethods } from '@/index.d';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';

export const useVideoMethods = () => {
    const {
        url,
        playerStore: {
            live
        }
    } = useContext(PlayerContext);

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
        [
            url,
            live
        ]
    );
};
