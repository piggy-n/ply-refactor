import * as React from 'react';
import '@/assets/styles/global.scss';
import { classes } from '@/utils/methods/classes';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import Icon from '@/components/CommonComponents/Icon';

const cn = 'Play-Control';

const PlayControl = () => {
    const {
        playerStoreDispatch,
        streamPlayer,
        playerStore: {
            live,
            error
        },
        videoProperties: {
            playing,
            readyState,
            changePlayStatusHandler
        }
    } = useContext(PlayerContext);

    const clickHandler = () => {
        if (error) return;

        if (live && readyState !== 1) {
            playing ? streamPlayer.pause() : streamPlayer.play();
        }

        playerStoreDispatch({
            loading: false
        });

        changePlayStatusHandler && changePlayStatusHandler();
    };

    return (
        <div
            className={classes(cn, '')}
            onClick={clickHandler}
        >
            {
                playing
                    ? <Icon
                        name={live ? 'stop' : 'pause'}
                        size={18}
                        title={live ? '停止' : '暂停'}
                    />
                    : <Icon
                        name={'play'}
                        size={18}
                        title={'播放'}
                    />
            }
        </div>
    );
};

export default PlayControl;
