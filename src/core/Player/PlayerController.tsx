import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import { useVideo } from '@/utils/hooks/useVideo';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';

const cn = 'Player-Controller';

const PlayerController = () => {
    const {
        url,
        controllable,
        videoEle,
        playerStoreDispatch,
        playerStore: {
            resizing,
            loading
        }
    } = useContext(PlayerContext);

    const { playing, ended } = useVideo(videoEle);

    const classHandler = (): string[] => {
        const classNameArr = [];

        if ((!playing || ended) && url && !loading) {
            classNameArr.push('dark-mask');
        }

        return classNameArr;
    };

    return (
        controllable && url
            ? <div
                className={classes(cn, '', classHandler())}
                onMouseEnter={() => playerStoreDispatch({ controlled: !resizing && !ended })}
                onMouseLeave={() => playerStoreDispatch({ controlled: false })}
            >

            </div>
            : null
    );
};

export default PlayerController;
