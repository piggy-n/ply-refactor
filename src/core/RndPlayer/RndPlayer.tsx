import * as React from 'react';
import { Rnd } from 'react-rnd';
import type { FC } from 'react';
import type { RndPlayerProps, DefaultPositionAndSize } from '@/index.d';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import { DEFAULT_PLAYER_OPTS } from '@/core/RndPlayer/config';

const cn = 'Rnd-Player';

const RndPlayer: FC<RndPlayerProps> = (
    {
        playerOpts = {},
    }
) => {
    const {
        bounds = DEFAULT_PLAYER_OPTS.bounds,
        defaultSize = DEFAULT_PLAYER_OPTS.defaultSize,
        defaultPosition = DEFAULT_PLAYER_OPTS.defaultPosition,
        style,
    } = playerOpts;

    return (
        <Rnd
            className={classes(cn, '')}
            default={{ ...defaultSize, ...defaultPosition } as DefaultPositionAndSize}
            bounds={bounds}
            style={style}
            maxWidth={innerWidth}
            maxHeight={innerHeight}
        >
        </Rnd>
    );
};

export default RndPlayer;
