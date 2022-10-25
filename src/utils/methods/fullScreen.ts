import screenfull from 'screenfull';
import type { Dispatch } from 'react';

export const fullScreenHandler = (ele: HTMLDivElement, dispatch: Dispatch<unknown>) => {
    if (screenfull.isEnabled) {
        screenfull.toggle(ele);
        screenfull.on('change', () => {
            dispatch({
                isFullscreen: screenfull.isFullscreen,
            });
        });
    }
};
