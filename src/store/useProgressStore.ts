import { useReducer } from 'react';

/**
 * @description ProgressStoreState
 * @param {number} position - 进度条位置
 * @param {number} percentage - 进度条百分比
 * @param {boolean} suspending - 是否暂停
 * @param {boolean} dragging - 是否拖拽
 * @param {number} progressMouseDownVal - 鼠标按下
 * @param {number} progressMouseUpVal - 鼠标抬起
 */
export interface ProgressStoreState<T = number, U = boolean> {
    position: T;
    percentage: T;
    suspending: U;
    dragging: U;
    progressMouseDownVal: T;
    progressMouseUpVal: T;
}

export const initialState: ProgressStoreState = {
    position: 0,
    percentage: 0,
    suspending: false,
    dragging: false,
    progressMouseDownVal: 0,
    progressMouseUpVal: 0,
};

export const useProgressStore = () => {
    const reducer = (
        state: ProgressStoreState,
        payload: Partial<ProgressStoreState>
    ) => ({ ...state, ...payload });

    const [progressStore, progressStoreDispatch] = useReducer(reducer, initialState);

    return { progressStore, progressStoreDispatch };
};
