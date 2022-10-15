import * as React from 'react';
import { Rnd } from 'react-rnd';
import type { FC } from 'react';
import type { RndPlayerProps } from '@/index.d';
import { classes } from '@/utils/methods/classes';
import './styles/rndPlayer.scss';
import { DEFAULT_PLAYER_OPTS } from '@/core/RndPlayer/config';

const cn = 'Rnd-Player';

const RndPlayer: FC<RndPlayerProps> = (
    {
        playerOpts = {},
    }
) => {
    const {
        defaultPositionAndSize = DEFAULT_PLAYER_OPTS.defaultPositionAndSize,
        bounds = DEFAULT_PLAYER_OPTS.bounds,
        style,
    } = playerOpts;

    return (
        <Rnd
            className={classes(cn, '')}
            default={defaultPositionAndSize}
            bounds={bounds}
            style={style}
            maxWidth={innerWidth}
            maxHeight={innerHeight}
        >
        </Rnd>
    );
};

export default RndPlayer;
