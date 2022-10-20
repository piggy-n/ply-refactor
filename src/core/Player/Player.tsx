import type { ForwardRefRenderFunction } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';
import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import '@/assets/styles/global.scss';
import { classes } from '@/utils/methods/classes';
import { useDeepCompareEffect, useSize } from 'ahooks';
import usePlayerStore from '@/store/usePlayerStore';
import useRndPlayerStore from '@/store/useRndPlayerStore';
import Loading from '@/core/Player/Loading';
import Video from '@/core/Player/Video';
import { useVideo } from '@/utils/hooks/useVideo';
import { useVideoMethods } from '@/utils/hooks/useVideoMethods';
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
    const videoResizingTimerRef = useRef<NodeJS.Timer>();
    const videoContainerEleRef = useRef<HTMLDivElement | null>(null);
    const videoContainerEleSize = useSize(videoContainerEleRef);

    const { setState } = usePlayerStore;
    const { videoEle } = usePlayerStore(s => s);

    const { videoAttributes } = useVideo();
    const videoMethods = useVideoMethods();

    useImperativeHandle(
        ref,
        () => ({
            video: videoEle,
            ...videoAttributes,
            ...videoMethods,
        }),
    );

    useDeepCompareEffect(
        () => setState({
            videoContainerEle: videoContainerEleRef.current,
            ...rest,
        }),
        [rest]
    );

    useEffect(
        () => {
            setState({ resizing: true });

            videoResizingTimerRef.current = setTimeout(
                () => setState({ resizing: false }),
                300
            );

            return () => clearTimeout(videoResizingTimerRef.current);
        },
        [videoContainerEleSize]
    );

    return (
        <div
            ref={videoContainerEleRef}
            id={`${cnPrefix}-container`}
            className={classes(cn, '')}
            onMouseOver={() => useRndPlayerStore.setState({ disableDrag: true })}
            {...videoContainerEleOpts}
        >
            <Video />
            <Loading />
            <PlayerController />
        </div>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(VanillaPlayer);
