import { useContext } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { classes } from '@/utils/methods/classes';
import * as React from 'react';
import '@/assets/styles/global.scss';

const cn = 'Format-Viewer';

const FormatViewer = () => {
    const {
        playerStore: {
            mime,
            live,
            error
        }
    } = useContext(PlayerContext);

    return (
        live && mime && !error
            ? <div className={classes(cn, '')}>
                {mime}
            </div>
            : null
    );
};

export default FormatViewer;
