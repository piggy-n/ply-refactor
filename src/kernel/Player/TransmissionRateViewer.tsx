import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { classes } from '@/utils/methods/classes';
import * as React from 'react';

const cn = 'Transmission-Rate-Viewer';

const TransmissionRateViewer = () => {
    const {
        playerStore: {
            transmissionRate = 0,
            live
        }
    } = useContext(PlayerContext);

    return (
        live
            ? <div className={classes(cn, '')}>
                {
                    transmissionRate >= 1024
                        ? `${(transmissionRate / 1024).toFixed(2)}Mbps`
                        : `${transmissionRate.toFixed(2)}Kbps`
                }
            </div>
            : null
    );
};

export default TransmissionRateViewer;
