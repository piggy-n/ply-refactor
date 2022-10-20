import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import Icon from '@/components/CommonComponents/Icon';
import usePlayerStore from '@/store/usePlayerStore';
import { useEffect, useRef, useState } from 'react';
import { useVideo } from '@/utils/hooks/useVideo';

const cn = 'Loading';

const Loading = () => {
    const [loading, setLoading] = useState(false);
    const loadingTimerRef = useRef<NodeJS.Timer | null>(null);

    const { playing, networkState, readyState } = useVideo();
    const { url, controllable, buffering } = usePlayerStore(s => s);

    useEffect(
        () => {
            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }

            if (url) {
                setLoading(true);
            }

            if (
                (playing && buffering)
                ||
                (networkState <= 2 && readyState <= 1)
            ) {
                loadingTimerRef.current = setTimeout(
                    () => setLoading(true),
                    500
                );
            } else {
                setLoading(false);
            }
        },
        [
            url,
            playing,
            buffering,
            networkState,
            readyState
        ]
    );

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
