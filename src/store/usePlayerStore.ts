import { useReducer } from 'react';

/**
 * @description PlayerStoreState
 * @param {boolean} buffering - 是否缓冲中
 * @param {boolean} controlled - 是否受控
 * @param {boolean} error - 是否出错
 * @param {boolean} isFullScreen - 是否全屏
 * @param {boolean} loading - 是否加载中
 * @param {string} mime - mime类型
 * @param {boolean} resizing - 是否正在调整大小
 */
export interface PlayerStoreState<U = boolean, K = string> {
    buffering?: U;
    controlled?: U;
    error?: U;
    isFullscreen?: U;
    live?: U;
    loading?: U;
    mime?: K;
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
