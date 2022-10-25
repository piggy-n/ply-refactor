import { useContext, useEffect, useRef } from 'react';
import { useVideo } from '@/utils/hooks/useVideo';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';

export const useLoading = () => {
    const {
        playerStore: {
            buffering,
        },
        videoEle,
        playerStoreDispatch,
    } = useContext(PlayerContext);

    const loadingTimerRef = useRef<NodeJS.Timer | null>(null);

    const { playing, networkState, readyState } = useVideo(videoEle);

    useEffect(
        () => {
            const inBuffer = playing && buffering;
            const inPlay = playing && [1, 2].includes(networkState) && [3, 4].includes(readyState);
            const inError = [0, 3].includes(networkState) || readyState === 0;

            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }

            if (inBuffer) {
                loadingTimerRef.current = setTimeout(
                    () => playerStoreDispatch({ loading: true }),
                    750
                );
            }

            if (inPlay) {
                playerStoreDispatch({ loading: false });
            }

            playerStoreDispatch({ error: inError });
        },
        [
            playing,
            buffering,
            networkState,
            readyState
        ]
    );
};
