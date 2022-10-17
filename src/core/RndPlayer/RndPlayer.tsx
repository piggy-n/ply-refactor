import * as React from 'react';
import { Rnd } from 'react-rnd';
import type { FC } from 'react';
import type { RndPlayerProps } from '@/index.d';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import { DEFAULT_PLAYER_OPTS } from '@/core/RndPlayer/config';
import { renderHeader } from '@/utils/methods/render';

const cn = 'Rnd-Player';

const RndPlayer: FC<RndPlayerProps> = (
    {
        header = 'default',
        playerOpts = {},
    }
) => {
    const {
        bounds = DEFAULT_PLAYER_OPTS.bounds,
        defaultSize = DEFAULT_PLAYER_OPTS.defaultSize,
        // defaultPosition = DEFAULT_PLAYER_OPTS.defaultPosition,
        style,
    } = playerOpts;

    return (
        <Rnd
            className={classes(cn, '')}
            bounds={bounds}
            style={style}
            maxWidth={innerWidth}
            maxHeight={innerHeight}
            minHeight={defaultSize!.height}
            minWidth={defaultSize!.width}
            lockAspectRatio
        >
            <div className={classes(
                cn,
                'container',
                [`mw-${defaultSize!.width}`, `mh-${defaultSize!.height}`]
            )}>
                {renderHeader(header)}
            </div>
        </Rnd>
    );
};

export default RndPlayer;
