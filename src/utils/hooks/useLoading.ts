import { useEffect, useRef } from 'react';
import { useVideo } from '@/utils/hooks/useVideo';
import usePlayerStore from '@/store/usePlayerStore';

export const useLoading = () => {
    const loadingTimerRef = useRef<NodeJS.Timer | null>(null);
    const { playing, networkState, readyState } = useVideo();

    const { setState } = usePlayerStore;
    const { buffering } = usePlayerStore(s => s);

    useEffect(
        () => {
            const inBuffer = playing && buffering;
            const inPlay = playing && [1, 2].includes(networkState) && [3, 4].includes(readyState);
            const inError = [0, 3].includes(networkState);

            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }

            if (inBuffer) {
                loadingTimerRef.current = setTimeout(
                    () => setState({ loading: true }),
                    750
                );
            }

            if (inPlay) {
                setState({ loading: false });
            }

            setState({ error: inError });
        },
        [
            playing,
            buffering,
            networkState,
            readyState
        ]
    );
};
