import type { ForwardRefRenderFunction } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';
import * as React from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import '@/assets/styles/global.scss';
import { classes } from '@/utils/methods/classes';
import { useSize } from 'ahooks';
import usePlayerStore from '@/store/usePlayerStore';
import useRndPlayerStore from '@/store/useRndPlayerStore';
import Loading from '@/core/Player/Loading';

const cn = 'Player';
const cnPrefix = `ws-${cn.toLowerCase()}`;

const VanillaPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        videoContainerOpts,
        ...rest
    },
    ref
) => {
    const videoContainerEleRef = useRef<HTMLDivElement | null>(null);
    const videoResizingTimerRef = useRef<NodeJS.Timer>();
    const videoContainerEleSize = useSize(videoContainerEleRef);

    useEffect(
        () => usePlayerStore.setState({
            videoContainerEle: videoContainerEleRef.current,
            ...rest,
        }),
        [
            videoContainerEleRef.current,
            rest
        ]
    );

    useEffect(
        () => {
            usePlayerStore.setState({ resizing: true });

            videoResizingTimerRef.current = setTimeout(
                () => usePlayerStore.setState({ resizing: false }),
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
            {...videoContainerOpts}
        >
            <Loading/>
        </div>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(VanillaPlayer);
