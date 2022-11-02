import type { ForwardRefRenderFunction } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';
import * as React from 'react';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import '@/assets/styles/global.scss';
import { classes } from '@/utils/methods/classes';
import useRndPlayerStore from '@/store/useRndPlayerStore';
import Loading from '@/kernel/Player/Loading';
import { useVideo } from '@/utils/hooks/useVideo';
import { useVideoMethods } from '@/utils/hooks/useVideoMethods';
import { usePlayerStore } from '@/store/usePlayerStore';
import { PlayerContext, playerContextDefaultValue } from '@/utils/hooks/usePlayerContext';
import { Video } from '@/kernel/Player/Video';
import PlayerController from '@/kernel/Player/PlayerController';
import { useResizing } from '@/utils/hooks/useResizing';
import { randomString } from '@/utils/methods/randomString';

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

    const videoMethods = useVideoMethods();
    const { videoAttributes } = useVideo(videoEleRef.current);
    const { playerStore, playerStoreDispatch } = usePlayerStore();
    const { setState } = useRndPlayerStore;

    const uuid = useMemo(
        () => randomString(),
        []
    );

    const playerContextValue = useMemo(
        () => {
            return Object.assign(
                {},
                {
                    ...playerContextDefaultValue,
                    playerStore,
                    playerStoreDispatch,
                    uuid,
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
            uuid,
            videoEleRef.current,
            videoContainerEleRef.current,
            { ...rest }
        ]
    );

    useResizing(playerStoreDispatch, videoContainerEleRef.current);

    useImperativeHandle(
        ref,
        () => ({
            video: videoEleRef.current,
            ...videoAttributes,
            ...videoMethods,
        }),
    );

    return (
        <PlayerContext.Provider value={playerContextValue}>
            <div
                ref={videoContainerEleRef}
                id={`${cnPrefix}-container-${uuid}`}
                className={classes(cn, '')}
                onMouseOver={() => setState({ disableDrag: true })}
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
