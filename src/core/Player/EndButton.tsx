import { Icon } from '@/index';
import * as React from 'react';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { useVideo } from '@/utils/hooks/useVideo';

const EndButton = () => {
    const {
        videoEle,
        playerStore: {
            live
        }
    } = useContext(PlayerContext);

    const { ended } = useVideo(videoEle);

    return (
        ended && !live
            ? <Icon
                name={'replay'}
                size={55}
                title={'重播'}
            />
            : null
    );
};

export default EndButton;
