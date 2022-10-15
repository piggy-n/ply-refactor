import type { CSSProperties } from 'react';

export type Device<T = string, U = boolean> = {
    /**
     * 设备ID
     */
    id: T;
    /**
     * 设备名称
     */
    name?: T;
    /**
     * 设备状态
     * true: online, false: offline
     * @default false
     */
    status?: U;
}

export type DefaultPositionAndSize<T = number> = {
    /**
     * left-position
     */
    x: T;
    /**
     * top-position
     */
    y: T;
    /**
     * 宽
     */
    width: T;
    /**
     * 高
     */
    height: T;
}

export type PlayerOpts = {
    /**
     * 默认位置和大小
     */
    defaultPositionAndSize?: DefaultPositionAndSize;
    /**
     * 拖拽边界
     */
    bounds?: string;
    /**
     * 样式
     */
    style?: CSSProperties;
}

export interface RndPlayerProps {
    /**
     * 设备信息配置
     */
    deviceOpts?: Device;
    /**
     * 播放器配置
     */
    playerOpts?: PlayerOpts;
}
