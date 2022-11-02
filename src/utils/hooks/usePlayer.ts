import { useEffect } from 'react';
import type { Dispatch } from 'react';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import type { PlayerStoreState } from '@/store/usePlayerStore';

export const usePlayer = (
    dispatch: Dispatch<PlayerStoreState>,
    ele: HTMLVideoElement | null,
    url: string,
) => {
    const forceUpdate = useMandatoryUpdate();

    const waitingListener = () => dispatch({
        buffering: true
    });

    const playingListener = () => dispatch({
        buffering: false
    });

    useEffect(
        () => {
            if (!ele) {
                dispatch({ loading: false });
                return;
            }

            const live = /^ws:\/\/|^wss:\/\//.test(url);
            live ? console.log('live') : ele.src = url;

            dispatch({
                live,
                loading: true
            });

            forceUpdate();

            ele.addEventListener('waiting', waitingListener);
            ele.addEventListener('playing', playingListener);

            return () => {
                ele.removeEventListener('waiting', waitingListener);
                ele.removeEventListener('playing', playingListener);
            };
        },
        [
            url,
            ele
        ]
    );
};
