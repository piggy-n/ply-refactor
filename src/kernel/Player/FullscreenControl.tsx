import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { classes } from '@/utils/methods/classes';
import * as React from 'react';
import Icon from '@/components/CommonComponents/Icon';
import { fullScreenHandler } from '@/utils/methods/fullScreen';
import '@/assets/styles/global.scss';

const cn = 'Fullscreen-Control';

const FullscreenControl = () => {
    const {
        fullScreen,
        videoContainerEle,
        playerStoreDispatch,
        playerStore: {
            isFullscreen
        }
    } = useContext(PlayerContext);

    return (
        fullScreen
            ? <div className={classes(cn, '')}>
                <Icon
                    name={isFullscreen ? 'close-fullscreen' : 'fullscreen'}
                    title={isFullscreen ? '退出全屏' : '全屏'}
                    size={18}
                    onClick={() => fullScreenHandler(videoContainerEle!, playerStoreDispatch)}
                />
            </div>
            : null
    );
};

export default FullscreenControl;
