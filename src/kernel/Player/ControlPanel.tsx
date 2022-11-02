import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import '@/assets/styles/global.scss';
import PlayControl from '@/kernel/Player/PlayControl';
import { pcn } from '@/kernel/config';
import ReloadControl from '@/kernel/Player/ReloadControl';
import TimeViewer from '@/kernel/Player/TimeViewer';
import FormatViewer from '@/kernel/Player/FormatViewer';
import QualityViewer from '@/kernel/Player/QualityViewer';
import TransmissionRateViewer from '@/kernel/Player/TransmissionRateViewer';

const cn = 'Control-Panel';

const ControlPanel = () => {
    const {
        playerStore: {
            controlled,
        },
    } = useContext(PlayerContext);

    return (
        <div className={classes(cn, '', { [`${pcn}-op-1`]: controlled })}>
            <div className={classes(cn, 'left-warp')}>
                <PlayControl />
                <ReloadControl />
                <TimeViewer />
            </div>
            <div className={classes(cn, 'right-warp')}>
                <FormatViewer />
                <QualityViewer />
                <TransmissionRateViewer />
            </div>
        </div>
    );
};

export default ControlPanel;
