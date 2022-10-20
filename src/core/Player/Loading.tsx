import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import Icon from '@/components/CommonComponents/Icon';
import usePlayerStore from '@/store/usePlayerStore';
import { useEffect, useRef } from 'react';
import { useVideo } from '@/utils/hooks/useVideo';

const cn = 'Loading';

const Loading = () => {
    const loadingTimerRef = useRef<NodeJS.Timer | null>(null);
    const { playing, networkState, readyState } = useVideo();
    const { setState } = usePlayerStore;
    const { controllable, buffering, loading } = usePlayerStore(s => s);

    useEffect(
        () => {
            const inBuffer = playing && buffering;
            const inPlay = playing && [1, 2].includes(networkState) && [3, 4].includes(readyState);
            const inError = [0, 3].includes(networkState);

            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }

            if (inBuffer) {
                loadingTimerRef.current = setTimeout(
                    () => setState({ loading: true }),
                    750
                );
            }

            if (inPlay) {
                setState({ loading: false });
            }

            setState({ error: inError });
        },
        [
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
