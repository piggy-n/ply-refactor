import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { toMinutesAndSeconds } from '@/utils/methods/time';
import { classes } from '@/utils/methods/classes';
import * as React from 'react';

const cn = 'Time-Viewer';

const TimeViewer = () => {
    const {
        playerStore: {
            live
        },
        videoProperties:{
            currentTime,
            totalTime
        }
    } = useContext(PlayerContext);

    return (
        <div className={classes(cn, '')}>
            {
                live
                    ? <div>实时</div>
                    : <div className={classes(cn, 'time')}>
                        {
                            toMinutesAndSeconds(currentTime)
                        }
                        &nbsp;/&nbsp;
                        {
                            toMinutesAndSeconds(totalTime)
                        }
                    </div>
            }
        </div>
    );
};

export default TimeViewer;
