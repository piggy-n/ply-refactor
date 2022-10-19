import { useEffect, useRef } from 'react';
import * as React from 'react';
import usePlayerStore from '@/store/usePlayerStore';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';

const Video = () => {
    const videoEleRef = useRef<HTMLVideoElement | null>(null);
    const forceUpdate = useMandatoryUpdate();

    const { setState } = usePlayerStore;
    const {
        videoEleOpts,
        url = '',
        setLive,
    } = usePlayerStore(s => s);

    const waitingListener = () => setState({ buffering: true });

    const playingListener = () => setState({ buffering: false });

    useEffect(
        () => setState({ videoEle: videoEleRef.current }),
        []
    );

    useEffect(
        () => {
            const videoEle = videoEleRef.current;
            const live = /^ws:\/\/|^wss:\/\//.test(url);

            if (videoEle) {
                live ? console.log('live') : videoEle.src = url;
            }

            setLive(live);
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
        <video
            ref={videoEleRef}
            muted
            autoPlay
            crossOrigin={'anonymous'}
            {...videoEleOpts}
        />
    );
};

export default Video;
