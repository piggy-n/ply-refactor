import { Icon } from '@/index';
import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useVideo } from '@/utils/hooks/useVideo';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';

const PlayButton = () => {
    const {
        videoEle,
    } = useContext(PlayerContext);

    const timerRef = useRef<NodeJS.Timer | null>(null);
    const [visible, setVisible] = useState(false);
    const { playing, ended, error } = useVideo(videoEle);

    useEffect(
        () => {
            const isPlaying = playing && !ended && !error;
            const isPaused = !playing && !ended && !error;

            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            if (isPlaying) {
                setVisible(false);
            }

            if (isPaused) {
                timerRef.current = setTimeout(
                    () => {
                        setVisible(true);
                    },
                    300
                );
            }
        },
        [
            playing,
            ended,
            error,
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
