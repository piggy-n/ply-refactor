import * as React from 'react';
import { Rnd } from 'react-rnd';
import type { FC } from 'react';
import type { RndPlayerProps } from '@/index.d';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import { DEFAULT_PLAYER_OPTS, headerDictionaries, mainDictionaries } from '@/core/RndPlayer/config';
import useCreate from '@/utils/hooks/useCreate';

const cn = 'Rnd-Player';
const cnPrefix = `ws-${cn.toLowerCase()}`;

const RndPlayer: FC<RndPlayerProps> = (
    {
        header = 'default',
        main = 'default',
        playerOpts = {},
    }
) => {
    const {
        bounds = DEFAULT_PLAYER_OPTS.bounds,
        defaultSize = DEFAULT_PLAYER_OPTS.defaultSize,
        // defaultPosition = DEFAULT_PLAYER_OPTS.defaultPosition,
        style,
    } = playerOpts;

    useCreate(
        `${cnPrefix}-container`,
        'UI',
        `${headerDictionaries[header]}`,
        `${cnPrefix}-header`,
        'header',
        {
            width: '100%',
        },
        'before',
        [header]
    );

    useCreate(
        `${cnPrefix}-container`,
        'UI',
        `${mainDictionaries[main]}`,
        `${cnPrefix}-main`,
        'main',
        {
            width: '100%',
            flex: 1,
        },
        'after',
        [main]
    );

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
            <div
                id={`${cnPrefix}-container`}
                className={classes(
                    cn,
                    'container',
                    [`mw-${defaultSize!.width}`, `mh-${defaultSize!.height}`]
                )}
            />
        </Rnd>
    );
};

export default RndPlayer;
