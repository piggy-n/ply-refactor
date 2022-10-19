import { useEffect, useRef } from 'react';
import * as React from 'react';
import usePlayerStore from '@/store/usePlayerStore';

const Video = () => {
    const videoEleRef = useRef<HTMLVideoElement | null>(null);

    const { setState } = usePlayerStore;
    const {
        videoEleOpts,
        url,
        setLive,
    } = usePlayerStore(s => s);

    useEffect(
        () => setState({ videoEle: videoEleRef.current }),
        []
    );

    useEffect(
        () => {
            if (!videoEleRef.current) return;

            const live = /^ws:\/\/|^wss:\/\//.test(url ?? '');

            setLive(live);
        },
        [
            videoEleRef.current,
            url
        ]
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
