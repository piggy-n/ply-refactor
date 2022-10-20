import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import { useVideo } from '@/utils/hooks/useVideo';
import usePlayerStore from '@/store/usePlayerStore';

const cn = 'Player-Controller';

const PlayerController = () => {
    const { playing, ended } = useVideo();

    const { setState } = usePlayerStore;
    const { url, controllable, resizing, loading } = usePlayerStore(s => s);

    const classHandler = (): string[] => {
        const classNameArr = [];

        if ((!playing || ended) && url && !loading) {
            classNameArr.push('dark-mask');
        }

        return classNameArr;
    };

    return (
        controllable && url
            ? <div
                className={classes(cn, '', classHandler())}
                onMouseEnter={() => setState({ controlled: !resizing && !ended })}
                onMouseLeave={() => setState({ controlled: false })}
            >

            </div>
            : null
    );
};

export default PlayerController;
