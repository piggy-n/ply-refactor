import { forwardRef, useContext, useEffect } from 'react';
import * as React from 'react';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import defaultPoster from '@/assets/images/snap.png';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import type { ForwardRefRenderFunction } from 'react';

const VanillaVideo: ForwardRefRenderFunction<HTMLVideoElement | null> = (
    _,
    videoEleRef
) => {
    const {
        url = '',
        videoEleOpts,
        videoEle,
        playerStoreDispatch,
    } = useContext(PlayerContext);

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

    return (
        url
            ? <video
                ref={videoEleRef}
                muted
                autoPlay
                poster={defaultPoster}
                crossOrigin={'anonymous'}
                {...videoEleOpts}
            />
            : null
    );
};

export const Video = forwardRef<HTMLVideoElement | null>(VanillaVideo);
