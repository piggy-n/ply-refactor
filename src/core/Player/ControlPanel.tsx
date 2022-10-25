import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import '@/assets/styles/global.scss';

const cn = 'Control-Panel';

const ControlPanel = () => {
    const {
        playerStore: {
            controlled,
        },
    } = useContext(PlayerContext);
    return (
        <div
            className={classes(cn, '')}
            style={{ opacity: controlled ? 1 : 0 }}
        >
            <div className={classes(cn, 'left-warp')}>
            </div>
            <div className={classes(cn, 'right-warp')}>
            </div>
        </div>
    );
};

export default ControlPanel;
