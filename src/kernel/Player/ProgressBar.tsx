import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { useProgressStore } from '@/store/useProgressStore';
import useWindowClient from '@/utils/hooks/useWindowClient';
import { percentToSeconds, toMinutesAndSeconds } from '@/utils/methods/time';
import { hoverStylesHandler } from '@/utils/methods/hoverStylesHandler';
import type { MouseEventHandler } from 'react';

const cn = 'Progress-Bar';

const ProgressBar = () => {
    const {
        playerStore: {
            controlled,
            live,
            error
        },
        videoProperties:{
            currentTime,
            totalTime,
            bufferedTime,
            networkState,
            readyState
        },
        videoEle,
    } = useContext(PlayerContext);

    const distanceOfClientXRef = useRef<number>(0);
    const progressMaskRef = useRef<HTMLDivElement>(null);
    const progressWrapperRef = useRef<HTMLDivElement>(null);
    const progressControlPointRef = useRef<HTMLDivElement>(null);
    const hoverStylesIntervalRef = useRef<NodeJS.Timer | null>(null);
    const draggingIntervalRef = useRef<NodeJS.Timer | null>(null);

    const {
        progressStore: {
            suspending,
            dragging,
            percentage,
            position,
            // progressMouseDownVal,
            // progressMouseUpVal,
        },
        progressStoreDispatch
    } = useProgressStore();

    const bufferedPercentage = useMemo(
        () => [2, 3].includes(networkState) && readyState === 0
            ? 0
            : ((bufferedTime / totalTime) * 100).toString(),
        [
            bufferedTime,
            totalTime,
            networkState,
            readyState
        ]
    );

    const processPercentage = useMemo(
        () => [2, 3].includes(networkState) && readyState === 0
            ? 0
            : ((currentTime / totalTime) * 100).toString(),
        [
            totalTime,
            currentTime,
            networkState,
            readyState
        ]
    );

    const { clientX } = useWindowClient();

    distanceOfClientXRef.current = clientX;

    const mouseDownHandler = () => {
        if (error) return;

        const progressMaskEleOffsetWidth = progressMaskRef.current!.offsetWidth;

        draggingIntervalRef.current && clearInterval(draggingIntervalRef.current);
        draggingIntervalRef.current = setInterval(
            () => {
                const position = distanceOfClientXRef.current - progressMaskRef.current!.getBoundingClientRect().left + 1;

                if (position >= 0 && position <= progressMaskEleOffsetWidth) {
                    const percentage = position / progressMaskEleOffsetWidth;

                    progressStoreDispatch({
                        percentage,
                        position,
                        suspending: true,
                        dragging: true,
                    });

                    videoEle!.currentTime = percentToSeconds(percentage, totalTime);
                }

                if (position < 0) {
                    videoEle!.currentTime = 0;
                }

                if (position > progressMaskEleOffsetWidth) {
                    videoEle!.currentTime = totalTime;
                }

                progressStoreDispatch({
                    progressMouseDownVal: Date.now()
                });
            },
            1
        );
    };

    const mouseUpHandler = () => {
        draggingIntervalRef.current && clearInterval(draggingIntervalRef.current);

        if (currentTime < totalTime && dragging) {
            videoEle?.play();

            progressStoreDispatch({
                dragging: false,
                progressMouseUpVal: Date.now()
            });
        }

        progressStoreDispatch({
            suspending: false,
        });
    };

    const mouseMoveHandler: MouseEventHandler = (e) => {
        const position = e.clientX - progressMaskRef.current!.getBoundingClientRect().left + 1;

        progressStoreDispatch({
            position,
            percentage: position / progressMaskRef.current!.offsetWidth,
            suspending: true,
        });
    };

    const mouseLeaveHandler = () => {
        progressStoreDispatch({
            suspending: false,
        });
    };

    const clickHandler = () => {
        if (error) return;

        videoEle!.currentTime = percentToSeconds(percentage, totalTime);

        progressStoreDispatch({
            suspending: true,
        });
    };

    useEffect(
        () => {
            if (progressWrapperRef.current && progressControlPointRef.current) {
                const progressWrapperEle = progressWrapperRef.current;
                const progressControlPointEle = progressControlPointRef.current;

                hoverStylesIntervalRef.current = setInterval(
                    () => {
                        hoverStylesHandler({
                            height: suspending ? 7 : 3,
                            opacity: suspending ? 1 : 0,
                            aniName: suspending ? 'example' : 'leave',
                            progressWrapperEle,
                            progressControlPointEle
                        });
                    },
                    100
                );
            }

            return () => {
                hoverStylesIntervalRef.current && clearInterval(hoverStylesIntervalRef.current);
            };
        },
        [suspending]
    );

    useEffect(
        () => {
            addEventListener('mouseup', mouseUpHandler);

            return () => removeEventListener('mouseup', mouseUpHandler);
        },
        [
            currentTime,
            totalTime,
            dragging
        ]
    );

    return (
        !live
            ? <div className={classes(cn, '', { [`ws-op-1`]: controlled })}>
                <div
                    ref={progressMaskRef}
                    className={classes(cn, 'mask')}
                    onMouseDown={mouseDownHandler}
                    onMouseUp={mouseUpHandler}
                    onMouseMove={(e) => mouseMoveHandler(e)}
                    onMouseLeave={mouseLeaveHandler}
                    onClick={clickHandler}
                />
                <div
                    ref={progressWrapperRef}
                    className={classes(cn, 'wrapper')}
                >
                    <div
                        className={classes(cn, 'buffered')}
                        style={{ width: `${bufferedPercentage}%` }}
                    />
                    <div
                        className={classes(cn, 'played')}
                        style={{ width: `${processPercentage}%` }}
                    >
                        <i ref={progressControlPointRef} />
                    </div>
                    {
                        suspending && totalTime > 0 &&
                        <div
                            className={classes(cn, 'pointer')}
                            style={{ left: `${position}px` }}
                        >
                            <i />
                            <span>
                                {
                                    toMinutesAndSeconds(totalTime, percentage)
                                }
                            </span>
                        </div>
                    }
                </div>
            </div>
            : null
    );
};

export default ProgressBar;
