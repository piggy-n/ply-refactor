import { useEffect, useRef } from 'react';
import { useSize } from 'ahooks';
import { usePlayerStore } from '@/store/usePlayerStore';

export const useResizing = (ele: HTMLDivElement | null) => {
    const { playerStoreDispatch } = usePlayerStore();
    const resizingTimerRef = useRef<NodeJS.Timer>();
    const eleSize = useSize(ele);

    useEffect(
        () => {
            playerStoreDispatch({ resizing: true });

            resizingTimerRef.current = setTimeout(
                () => playerStoreDispatch({ resizing: false }),
                300
            );

            return () => clearTimeout(resizingTimerRef.current);
        },
        [eleSize]
    );
};
