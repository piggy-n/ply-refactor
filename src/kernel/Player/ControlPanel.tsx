import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import '@/assets/styles/global.scss';
import PlayControl from '@/kernel/Player/PlayControl';

const cn = 'Control-Panel';

const ControlPanel = () => {
    const {
        playerStore: {
            controlled,
        },
    } = useContext(PlayerContext);

    return (
        <div className={classes(cn, '', { 'ws-op-1': controlled })}>
            <div className={classes(cn, 'left-warp')}>
                <PlayControl />
            </div>
            <div className={classes(cn, 'right-warp')}>
            </div>
        </div>
    );
};

export default ControlPanel;
