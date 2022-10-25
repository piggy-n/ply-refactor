import * as React from 'react';
import '@/assets/styles/global.scss';
import { classes } from '@/utils/methods/classes';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { useVideo } from '@/utils/hooks/useVideo';
import Icon from '@/components/CommonComponents/Icon';

const cn = 'Play-Control';

const PlayControl = () => {
    const {
        videoEle,
        playerStoreDispatch,
        playerStore: {
            live,
            error
        }
    } = useContext(PlayerContext);

    const { playing, changePlayStatusHandler } = useVideo(videoEle);

    const clickHandler = () => {
        if (error) return;

        if (live) {
            console.log('live');
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
                    ? <>
                        {
                            live
                                ? <Icon name={'stop'} size={18} title={'停止'} />
                                : <Icon name={'pause'} size={18} title={'暂停'} />
                        }
                    </>
                    : <Icon name={'play'} size={18} title={'播放'} />
            }
        </div>
    );
};

export default PlayControl;
