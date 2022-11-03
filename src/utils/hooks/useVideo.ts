import { useEffect, useMemo, useRef } from 'react';
import useMandatoryUpdate from '@/utils/hooks/useMandatoryUpdate';
import type { VideoAttributes } from '@/index.d';
import { useLatest } from 'ahooks';

export interface UseVideo extends VideoAttributes {
    videoAttributes: VideoAttributes;
    changePlayStatusHandler: () => void;
}

export const useVideo = (ele: HTMLVideoElement | null) => {
    const videoEleRef = useLatest(ele);
    const videoEle = videoEleRef.current;

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

    const canPlayHandler = () => {
        if (!videoEle) return;

        setVideoArgsHandler({
            totalTime: videoEle.duration,
            videoSize: {
                videoWidth: videoEle.videoWidth,
                videoHeight: videoEle.videoHeight
            },
        });
    };

    const progressHandler = () => {
        if (!videoEle) return;

        if (videoEle.buffered.length >= 1) {
            setVideoArgsHandler({
                bufferedTime: videoEle.buffered.end(0),
            });
        }
    };

    const playOrPauseHandler = () => {
        if (!videoEle) return;

        setVideoArgsHandler({
            playing: !videoEle.paused,
        });
    };

    const endHandler = () => {
        if (!videoEle) return;

        setVideoArgsHandler({
            ended: videoEle.ended,
        });
    };

    const errorHandler = () => {
        setVideoArgsHandler({
            error: Date.now(),
        });
    };

    useEffect(
        () => {
            if (!videoEle) return;

            videoEle.addEventListener('canplay', canPlayHandler);
            videoEle.addEventListener('progress', progressHandler);
            videoEle.addEventListener('play', playOrPauseHandler);
            videoEle.addEventListener('pause', playOrPauseHandler);
            videoEle.addEventListener('timeupdate', playOrPauseHandler);
            videoEle.addEventListener('ended', endHandler);
            videoEle.addEventListener('error', errorHandler);

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
                videoEle.removeEventListener('canplay', canPlayHandler);
                videoEle.removeEventListener('progress', progressHandler);
                videoEle.removeEventListener('play', playOrPauseHandler);
                videoEle.removeEventListener('pause', playOrPauseHandler);
                videoEle.removeEventListener('timeupdate', playOrPauseHandler);
                videoEle.removeEventListener('ended', endHandler);
                videoEle.removeEventListener('error', errorHandler);
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
