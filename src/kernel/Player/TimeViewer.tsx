import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { useVideo } from '@/utils/hooks/useVideo';
import { toMinutesAndSeconds } from '@/utils/methods/time';
import { classes } from '@/utils/methods/classes';
import * as React from 'react';

const cn = 'Time-Viewer';

const TimeViewer = () => {
    const {
        videoEle,
        playerStore: {
            live
        }
    } = useContext(PlayerContext);

    const { currentTime, totalTime } = useVideo(videoEle);

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
