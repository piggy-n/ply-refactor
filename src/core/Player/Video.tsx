import { forwardRef, useContext } from 'react';
import * as React from 'react';
import defaultPoster from '@/assets/images/snap.png';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import type { ForwardRefRenderFunction } from 'react';
import { usePlayer } from '@/utils/hooks/usePlayer';

const VanillaVideo: ForwardRefRenderFunction<HTMLVideoElement | null> = (
    _,
    videoEleRef
) => {
    const { url = '', videoEleOpts } = useContext(PlayerContext);

    usePlayer();

    return (
        url
            ? <video
                ref={videoEleRef}
                muted
                autoPlay
                poster={defaultPoster}
                crossOrigin={'anonymous'}
                {...videoEleOpts}
            />
            : null
    );
};

export const Video = forwardRef<HTMLVideoElement | null>(VanillaVideo);
