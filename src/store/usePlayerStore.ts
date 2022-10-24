import { useReducer } from 'react';

/**
 * @description VideoModelState
 * @param {boolean} buffering - 是否缓冲中
 * @param {boolean} controlled - 是否受控
 * @param {boolean} error - 是否出错
 * @param {boolean} loading - 是否加载中
 * @param {boolean} resizing - 是否正在调整大小
 */
export interface PlayerStoreState<U = boolean> {
    buffering?: U;
    controlled?: U;
    error?: U;
    live?: U;
    loading?: U;
    resizing?: U;
}

export const initialState: PlayerStoreState = {};

export const usePlayerStore = () => {
    const reducer = (
        state: PlayerStoreState,
        payload: Partial<PlayerStoreState>
    ) => ({ ...state, ...payload });

    const [playerStore, playerStoreDispatch] = useReducer(reducer, initialState);

    return { playerStore, playerStoreDispatch };
};
