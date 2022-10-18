import create from 'zustand';

interface StateProps {
    resizing: boolean;
}

const usePlayerStore = create<StateProps>((
        set
    ) => ({
        resizing: false,
    })
);

export default usePlayerStore;
