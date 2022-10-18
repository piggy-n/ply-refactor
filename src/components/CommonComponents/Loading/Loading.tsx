import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import Icon from '@/components/CommonComponents/Icon';
import type { FC } from 'react';
import usePlayerStore from '@/store/usePlayerStore';
// import { useVideo } from '@/utils/hooks/useVideo';
import { useEffect } from 'react';

const cn = 'Loading';

interface LoadingProps {
    controllable?: boolean;
}

const Loading: FC<LoadingProps> = ({ controllable }) => {
    const { videoEle } = usePlayerStore(s => s);

    // const {
    //     networkState,
    //     readyState,
    //     playing
    // } = useVideo(
    //     videoEle as HTMLVideoElement,
    //     [videoEle]
    // );

    useEffect(
        () => {
        }, [videoEle]
    );

    return (
        <div className={classes(cn, '')}>
            <Icon name={'loading'} size={24}/>
            {
                controllable &&
                <p>正在加载中...</p>
            }
        </div>
    );
};

export default Loading;
