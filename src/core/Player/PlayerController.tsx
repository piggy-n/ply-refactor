import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import { useVideo } from '@/utils/hooks/useVideo';
import usePlayerStore from '@/store/usePlayerStore';

const cn = 'Player-Controller';

const PlayerController = () => {
    const { playing, ended } = useVideo();
    const { setState } = usePlayerStore;
    const { resizing } = usePlayerStore(s => s);

    const classHandler = (): string[] => {
        const classNameArr = [];

        if (!playing || ended) {
            classNameArr.push('dark-mask');
        }

        return classNameArr;
    };

    return (
        <div
            className={classes(cn, '', classHandler())}
            onMouseEnter={() => setState({ controlled: !resizing && !ended })}
            onMouseLeave={() => setState({ controlled: false })}
        >

        </div>
    );
};

export default PlayerController;
