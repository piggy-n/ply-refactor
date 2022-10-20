import { useEffect, useRef } from 'react';
import * as React from 'react';
import usePlayerStore from '@/store/usePlayerStore';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import defaultPoster from '@/assets/images/snap.png';

const Video = () => {
    const videoEleRef = useRef<HTMLVideoElement | null>(null);
    const forceUpdate = useMandatoryUpdate();

    const { setState } = usePlayerStore;
    const { videoEleOpts, url = '' } = usePlayerStore(s => s);

    const waitingListener = () => setState({ buffering: true });

    const playingListener = () => setState({ buffering: false });

    useEffect(
        () => setState({ videoEle: videoEleRef.current }),
        [videoEleRef.current]
    );

    useEffect(
        () => {
            const videoEle = videoEleRef.current;

            if (!videoEle) {
                setState({ loading: false });
                return;
            }

            const live = /^ws:\/\/|^wss:\/\//.test(url);
            live ? console.log('live') : videoEle.src = url;

            setState({ live, loading: true });
            forceUpdate();

            videoEle?.addEventListener('waiting', waitingListener);
            videoEle?.addEventListener('playing', playingListener);

            return () => {
                videoEle?.removeEventListener('waiting', waitingListener);
                videoEle?.removeEventListener('playing', playingListener);
            };
        },
        [url]
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

export default Video;
