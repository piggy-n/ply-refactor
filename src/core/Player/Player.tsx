import type { ForwardRefRenderFunction } from 'react';
import type { PlayerRef, PlayerProps } from '@/index.d';
import * as React from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import '@/assets/styles/global.scss';
import { classes } from '@/utils/methods/classes';
import { useSize } from 'ahooks';
import usePlayerStore from '@/store/usePlayerStore';
import useRndPlayerStore from '@/store/useRndPlayerStore';
import Loading from '@/components/CommonComponents/Loading';

const cn = 'Player';
const cnPrefix = `ws-${cn.toLowerCase()}`;

const VanillaPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        url,
        videoContainerOpts,
        videoElementOpts,
    },
    ref
) => {
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoElementRef = useRef<HTMLVideoElement>(null);
    const videoResizingTimerRef = useRef<NodeJS.Timer>();

    const videoContainerSize = useSize(videoContainerRef);

    useEffect(
        () => {
            usePlayerStore.setState({ resizing: true });

            videoResizingTimerRef.current = setTimeout(
                () => usePlayerStore.setState({ resizing: false }),
                300
            );

            return () => clearTimeout(videoResizingTimerRef.current);
        },
        [videoContainerSize]
    );

    return (
        <div
            ref={videoContainerRef}
            id={`${cnPrefix}-container`}
            className={classes(cn, '')}
            onMouseOver={() => useRndPlayerStore.setState({ disableDrag: true })}
            {...videoContainerOpts}
        >
            <video
                ref={videoElementRef}
                muted
                autoPlay
                crossOrigin={'anonymous'}
                {...videoElementOpts}
            />
            <Loading/>
        </div>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(VanillaPlayer);
