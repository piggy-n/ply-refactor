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
import { StreamPlayer } from '@/utils/methods/streamPlayer';
import { randomString } from '@/utils/methods/randomString';

const cn = 'Player';

const VanillaPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        videoContainerEleOpts,
        ...rest
    },
    ref
) => {
    const uuid = useMemo(() => randomString(), []);
    const { playerStore, playerStoreDispatch } = usePlayerStore();

    const videoEleRef = useRef<HTMLVideoElement | null>(null);
    const videoContainerEleRef = useRef<HTMLDivElement | null>(null);
    const streamPlayerRef = useRef<StreamPlayer>(
        new StreamPlayer({
            dispatch: playerStoreDispatch
        })
    );

    const videoMethods = useVideoMethods();
    const videoProperties = useVideo(videoEleRef.current);
    const { setState } = useRndPlayerStore;

    const playerContextValue = useMemo(
        () => Object.assign(
            {},
            {
                ...playerContextDefaultValue,
                playerStore,
                playerStoreDispatch,
                uuid,
                streamPlayer: streamPlayerRef.current,
                videoProperties,
                videoEle: videoEleRef.current,
                videoContainerEle: videoContainerEleRef.current,
                ...rest
            }
        ),
        [
            playerStore,
            playerStoreDispatch,
            videoEleRef.current,
            videoContainerEleRef.current,
            { ...rest }
        ]
    );

    useResizing(
        playerStoreDispatch,
        videoContainerEleRef.current
    );

    useImperativeHandle(
        ref,
        () => ({
            video: videoEleRef.current,
            ...videoProperties.videoAttributes,
            ...videoMethods,
        }),
    );

    return (
        <PlayerContext.Provider value={playerContextValue}>
            <div
                ref={videoContainerEleRef}
                id={`player-${uuid}`}
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
