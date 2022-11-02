import { useEffect, useRef } from 'react';
import { useSize } from 'ahooks';
import type { PlayerStoreState } from '@/store/usePlayerStore';
import type { Dispatch } from 'react';

export const useResizing = (
    dispatch: Dispatch<PlayerStoreState>,
    ele: HTMLDivElement | null
) => {
    const resizingTimerRef = useRef<NodeJS.Timer>();
    const eleSize = useSize(ele);

    useEffect(
        () => {
            dispatch({ resizing: true });

            resizingTimerRef.current = setTimeout(
                () => dispatch({ resizing: false }),
                300
            );

            return () => clearTimeout(resizingTimerRef.current);
        },
        [eleSize]
    );
};
