import create from 'zustand';

type Position = { x: number, y: number };

interface StateProps {
    position?: Position;
    setPosition: (val: Position) => void;
}

const useRndPlayerStore = create<StateProps>((
        set
    ) => ({
        setPosition: (val: Position) => set(() => ({ position: val })),
    })
);

export default useRndPlayerStore;
