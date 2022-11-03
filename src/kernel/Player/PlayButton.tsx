import { Icon } from '@/index';
import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';

const PlayButton = () => {
    const {
        playerStore: {
            loading
        },
        videoProperties:{
            playing,
            ended,
            error
        }
    } = useContext(PlayerContext);

    const timerRef = useRef<NodeJS.Timer | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(
        () => {
            const isPlaying = playing && !ended && !error;
            const isPaused = !playing && !ended && !error && !loading;

            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            if (isPlaying || loading) {
                setVisible(false);
            }

            if (isPaused) {
                timerRef.current = setTimeout(
                    () => {
                        setVisible(true);
                    },
                    100
                );
            }
        },
        [
            playing,
            ended,
            error,
            loading
        ]
    );

    return (
        visible
            ? <Icon
                name={'play-lg'}
                size={55}
                title={'播放'}
            />
            : null
    );
};

export default PlayButton;
