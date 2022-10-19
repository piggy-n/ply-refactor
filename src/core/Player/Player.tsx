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
import Video from '@/core/Player/Video';
import { useVideo } from '@/utils/hooks/useVideo';

const cn = 'Player';
const cnPrefix = `ws-${cn.toLowerCase()}`;

const VanillaPlayer: ForwardRefRenderFunction<PlayerRef, PlayerProps> = (
    {
        videoContainerEleOpts,
        ...rest
    },
    ref
) => {
    const videoContainerEleRef = useRef<HTMLDivElement | null>(null);
    const videoResizingTimerRef = useRef<NodeJS.Timer>();
    const videoContainerEleSize = useSize(videoContainerEleRef);

    const { setState } = usePlayerStore;
    const { videoEle } = usePlayerStore(s => s);

    const { videoAttributes } = useVideo(videoEle, [videoEle]);

    useEffect(
        () => setState({
            videoContainerEle: videoContainerEleRef.current,
            ...rest,
        }),
        []
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
            <Video/>
            <Loading/>
        </div>
    );
};

export const Player = forwardRef<PlayerRef, PlayerProps>(VanillaPlayer);
