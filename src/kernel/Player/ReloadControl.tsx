import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import Icon from '@/components/CommonComponents/Icon';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { useContext } from 'react';

const cn = 'Reload-Control';

const ReloadControl = () => {
    const {
        playerStore: {
            live
        },
        streamPlayer,
        videoEle,
        playerStoreDispatch
    } = useContext(PlayerContext);

    const clickHandler = () => {
        playerStoreDispatch({
            loading: true
        });

        live ? streamPlayer.reload() : videoEle?.load();
    };

    return (
        <div
            className={classes(cn, '')}
            onClick={clickHandler}
        >
            <Icon
                name={'reload'}
                size={18}
                title={'重载'}
            />
        </div>
    );
};

export default ReloadControl;
