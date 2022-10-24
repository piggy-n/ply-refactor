import { useContext, useEffect } from 'react';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';

export const usePlayer = () => {
    const { url = '', videoEle, playerStoreDispatch } = useContext(PlayerContext);
    const forceUpdate = useMandatoryUpdate();

    const waitingListener = () => playerStoreDispatch({
        buffering: true
    });

    const playingListener = () => playerStoreDispatch({
        buffering: false
    });

    useEffect(
        () => {
            if (!videoEle) {
                playerStoreDispatch({ loading: false });
                return;
            }

            const live = /^ws:\/\/|^wss:\/\//.test(url);
            live ? console.log('live') : videoEle.src = url;

            playerStoreDispatch({
                live,
                loading: true
            });

            forceUpdate();

            videoEle.addEventListener('waiting', waitingListener);
            videoEle.addEventListener('playing', playingListener);

            return () => {
                videoEle.removeEventListener('waiting', waitingListener);
                videoEle.removeEventListener('playing', playingListener);
            };
        },
        [
            url,
            videoEle
        ]
    );
};
