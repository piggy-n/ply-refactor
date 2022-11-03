import { Icon } from '@/index';
import * as React from 'react';
import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';

const EndButton = () => {
    const {
        playerStore: {
            live
        },
        videoProperties: {
            ended
        }
    } = useContext(PlayerContext);

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
