import create from 'zustand';

type Position = { x: number, y: number };
type MinSize = { width?: number | string, height?: number | string };

interface StateProps {
    position?: Position;
    minSize: MinSize;
    setRndPlayerStoreData: (val: Partial<StateProps>) => void;
}

const useRndPlayerStore = create<StateProps>((
        set
    ) => ({
        minSize: {},
        setRndPlayerStoreData: (val) => set((state) => ({ ...state, ...val })),
    })
);

export default useRndPlayerStore;
