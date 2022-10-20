import { useEffect, useMemo, useRef } from 'react';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import type { VideoAttributes } from '@/index.d';
import usePlayerStore from '@/store/usePlayerStore';

export interface UseVideo extends VideoAttributes {
    videoAttributes: VideoAttributes;
    changePlayStatusHandler: () => void;
}

export const useVideo = () => {
    const { videoEle } = usePlayerStore(s => s);

    const forceUpdate = useMandatoryUpdate();

    const videoInterval = useRef<NodeJS.Timeout | null>(null);
    const videoArgsRef = useRef<VideoAttributes>({
        playing: false,
        currentTime: 0,
        totalTime: 0,
        bufferedTime: 0,
        ended: false,
        error: null,
        networkState: 0,
        readyState: 0,
        videoSize: {
            videoWidth: 0,
            videoHeight: 0
        },
    });

    const setVideoArgsHandler = <T extends Partial<VideoAttributes>>(val: T) => {
        videoArgsRef.current = { ...videoArgsRef.current, ...val };
    };

    const changePlayStatusHandler = () => {
        if (videoArgsRef.current.playing) {
            videoEle!.pause();
        } else {
            videoEle!.play();
        }
    };

    useEffect(
        () => {
            if (!videoEle) return;

            videoEle.addEventListener(
                'canplay',
                () => {
                    setVideoArgsHandler({
                        totalTime: videoEle.duration,
                        videoSize: {
                            videoWidth: videoEle.videoWidth,
                            videoHeight: videoEle.videoHeight
                        },
                    });
                }
            );

            videoEle.addEventListener(
                'progress',
                () => {
                    if (videoEle.buffered.length >= 1) {
                        setVideoArgsHandler({
                            bufferedTime: videoEle.buffered.end(0),
                        });
                    }
                }
            );

            videoEle.addEventListener(
                'play',
                () => {
                    setVideoArgsHandler({
                        playing: !videoEle.paused,
                    });
                }
            );

            videoEle.addEventListener(
                'pause',
                () => {
                    setVideoArgsHandler({
                        playing: !videoEle.paused,
                    });
                }
            );

            videoEle.addEventListener(
                'timeupdate',
                () => {
                    setVideoArgsHandler({
                        playing: !videoEle.paused,
                    });
                }
            );

            videoEle.addEventListener(
                'ended',
                () => {
                    setVideoArgsHandler({
                        ended: videoEle.ended,
                    });
                }
            );

            videoEle.addEventListener(
                'error',
                () => {
                    setVideoArgsHandler({
                        error: Date.now(),
                    });
                }
            );

            videoInterval.current = setInterval(
                () => {
                    forceUpdate();

                    setVideoArgsHandler({
                        currentTime: videoEle.currentTime,
                        totalTime: videoEle.duration,
                        playing: !videoEle.paused,
                        ended: videoEle.ended,
                        networkState: videoEle.networkState,
                        readyState: videoEle.readyState,
                        videoSize: {
                            videoWidth: videoEle.videoWidth,
                            videoHeight: videoEle.videoHeight
                        },
                    });
                },
                1
            );

            return () => {
                videoInterval.current && clearInterval(videoInterval.current);
            };
        },
        [videoEle]
    );

    return useMemo<UseVideo>(
        () => ({
            ...videoArgsRef.current,
            videoAttributes: videoArgsRef.current,
            changePlayStatusHandler,
        }),
        [videoArgsRef.current]
    );
};
