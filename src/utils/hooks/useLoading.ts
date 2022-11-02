import { useEffect, useRef } from 'react';
import { useVideo } from '@/utils/hooks/useVideo';
import type { PlayerStoreState } from '@/store/usePlayerStore';
import type { Dispatch } from 'react';

export const useLoading = (
    buffering: boolean,
    dispatch: Dispatch<PlayerStoreState>,
    ele: HTMLVideoElement | null,
) => {
    const loadingTimerRef = useRef<NodeJS.Timer | null>(null);

    const { playing, networkState, readyState } = useVideo(ele);

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
                    () => dispatch({ loading: true }),
                    750
                );
            }

            if (inPlay) {
                dispatch({ loading: false });
            }

            dispatch({ error: inError });
        },
        [
            playing,
            buffering,
            networkState,
            readyState
        ]
    );
};
