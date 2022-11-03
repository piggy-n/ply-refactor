import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import Icon from '@/components/CommonComponents/Icon';
import { useLoading } from '@/utils/hooks/useLoading';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { useContext } from 'react';

const cn = 'Loading';

const Loading = () => {
    const {
        controllable,
        videoEle,
        playerStoreDispatch,
        videoProperties,
        playerStore: {
            buffering,
            loading,
        }
    } = useContext(PlayerContext);

    useLoading(!!buffering, playerStoreDispatch, videoEle, videoProperties);

    return (
        loading
            ? <div className={classes(cn, '')}>
                <Icon name={'loading'} size={24} />
                {
                    controllable &&
                    <p>正在加载中...</p>
                }
            </div>
            : null
    );
};

export default Loading;
