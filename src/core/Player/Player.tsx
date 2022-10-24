import type { ForwardRefRenderFunction } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';
import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import '@/assets/styles/global.scss';
import { classes } from '@/utils/methods/classes';
import { useSize } from 'ahooks';
import useRndPlayerStore from '@/store/useRndPlayerStore';
import Loading from '@/core/Player/Loading';
import { useVideo } from '@/utils/hooks/useVideo';
import { useVideoMethods } from '@/utils/hooks/useVideoMethods';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PlayerContext, playerContextDefaultValue } from '@/utils/hooks/usePlayerContext';
import { Video } from '@/core/Player/Video';
import PlayerController from '@/core/Player/PlayerController';

const cn = 'Player';
const cnPrefix = `ws-${cn.toLowerCase()}`;

const VanillaPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        videoContainerEleOpts,
        ...rest
    },
    ref
) => {
    const videoEleRef = useRef<HTMLVideoElement | null>(null);
    const videoContainerEleRef = useRef<HTMLDivElement | null>(null);
    const videoResizingTimerRef = useRef<NodeJS.Timer>();
    const videoContainerEleSize = useSize(videoContainerEleRef);

    const videoMethods = useVideoMethods();
    const { videoAttributes } = useVideo(videoEleRef.current);
    const { playerStore, playerStoreDispatch } = usePlayerStore();

    const playerContextValue = useMemo(
        () => {
            return Object.assign(
                {},
                {
                    ...playerContextDefaultValue,
                    playerStore,
                    playerStoreDispatch,
                    videoAttributes,
                    videoEle: videoEleRef.current,
                    videoContainerEle: videoContainerEleRef.current,
                    ...rest
                }
            );
        },
        [
            playerStore,
            playerStoreDispatch,
            videoEleRef.current,
            videoContainerEleRef.current,
            { ...rest }
        ]
    );

    useImperativeHandle(
        ref,
        () => ({
            video: videoEleRef.current,
            ...videoAttributes,
            ...videoMethods,
        }),
    );

    useEffect(
        () => {
            playerStoreDispatch({ resizing: true });

            videoResizingTimerRef.current = setTimeout(
                () => playerStoreDispatch({ resizing: false }),
                300
            );

            return () => clearTimeout(videoResizingTimerRef.current);
        },
        [videoContainerEleSize]
    );

    return (
        <PlayerContext.Provider value={playerContextValue}>
            <div
                ref={videoContainerEleRef}
                id={`${cnPrefix}-container`}
                className={classes(cn, '')}
                onMouseOver={() => useRndPlayerStore.setState({ disableDrag: true })}
                {...videoContainerEleOpts}
            >
                <Video ref={videoEleRef} />
                <Loading />
                <PlayerController />
            </div>
        </PlayerContext.Provider>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(VanillaPlayer);
