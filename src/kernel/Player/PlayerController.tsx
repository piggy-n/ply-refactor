import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import { useVideo } from '@/utils/hooks/useVideo';
import { useContext, useRef } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { useRafInterval, useReactive } from 'ahooks';
import { fullScreenHandler } from '@/utils/methods/fullScreen';
import PlayButton from '@/kernel/Player/PlayButton';
import EndButton from '@/kernel/Player/EndButton';
import ProgressBar from '@/kernel/Player/ProgressBar';
import ControlPanel from '@/kernel/Player/ControlPanel';
import { pcn } from '@/kernel/config';

const cn = 'Player-Controller';

const PlayerController = () => {
    const {
        url,
        controllable,
        fullScreen,
        videoEle,
        playerStoreDispatch,
        videoContainerEle,
        playerStore: {
            resizing,
            loading,
            error,
            live
        }
    } = useContext(PlayerContext);

    const mouseState = useReactive({
        mouseIsMoving: false,
        mouseIsOnController: false,
        mouseClickCount: 0,
    });

    const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { ended, changePlayStatusHandler } = useVideo(videoEle);

    const playerControllerMouseStatusHandler = (status: 'move' | 'leave') => {
        if (status === 'move') {
            mouseState.mouseIsMoving = true;
            mouseState.mouseIsOnController = false;
        }

        if (status === 'leave') {
            mouseState.mouseIsMoving = false;
        }
    };

    const clickHandler = () => {
        if (error) return;
        mouseState.mouseClickCount += 1;

        clickTimeoutRef.current && clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(
            () => {
                if (mouseState.mouseClickCount === 1) {
                    pauseOrReplayHandler();
                }

                if (mouseState.mouseClickCount === 2 && fullScreen) {
                    fullScreenHandler(videoContainerEle!, playerStoreDispatch);
                }

                mouseState.mouseClickCount = 0;
            },
            300
        );
    };

    const pauseOrReplayHandler = () => {
        if (ended) {
            playerStoreDispatch({
                controlled: !resizing && !ended
            });
        } else {
            if (live) {
                console.log('live');
            }

            playerStoreDispatch({
                loading: false
            });
        }
        changePlayStatusHandler && changePlayStatusHandler();
    };

    const mouseAndControllerStyleChangeHandler = () => {
        if (mouseState.mouseIsMoving) {
            playerControllerMouseStatusHandler('leave');

            playerStoreDispatch({
                controlled: !resizing && !ended,
            });

            inactivityTimeoutRef.current && clearTimeout(inactivityTimeoutRef.current);
            inactivityTimeoutRef.current = setTimeout(
                () => {
                    if (
                        !mouseState.mouseIsMoving &&
                        !mouseState.mouseIsOnController
                    ) {
                        playerStoreDispatch({
                            controlled: false,
                        });
                    }
                },
                5000
            );
        }
    };

    useRafInterval(
        mouseAndControllerStyleChangeHandler,
        200,
        {
            immediate: true,
        }
    );

    return (
        controllable && url
            ? <div
                className={classes(cn, '', { [`${pcn}-dark-mask`]: ended && url && !loading })}
                onMouseEnter={() => playerStoreDispatch({ controlled: !resizing && !ended })}
                onMouseLeave={() => playerStoreDispatch({ controlled: false })}
            >
                <div
                    className={classes(cn, 'wrapper')}
                    onMouseMove={() => playerControllerMouseStatusHandler('move')}
                    onMouseLeave={() => playerControllerMouseStatusHandler('leave')}
                    onClick={clickHandler}
                />
                <div
                    className={classes(cn, 'btn')}
                    onClick={pauseOrReplayHandler}
                >
                    <PlayButton />
                    <EndButton />
                </div>
                <div
                    className={classes(cn, 'pnc')}
                    onMouseEnter={() => mouseState.mouseIsOnController = true}
                    onMouseLeave={() => mouseState.mouseIsOnController = false}
                >
                    <ProgressBar />
                    <ControlPanel />
                </div>
            </div>
            : null
    );
};

export default PlayerController;
