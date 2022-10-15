import type { CSSProperties } from 'react';

/**
 * @description 设备信息
 * @typedef {Device} PlayerOpts
 */
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

/**
 * @description 播放器默认位置
 * @typedef {DefaultPosition} PlayerOpts
 */
export type DefaultPosition<T = number> = {
    /**
     * left-position
     */
    x: T;
    /**
     * top-position
     */
    y: T;
}

/**
 * @description 播放器默认尺寸
 * @typedef {DefaultSize} PlayerOpts
 */
export type DefaultSize<T = number> = {
    /**
     * 宽
     */
    width: T;
    /**
     * 高
     */
    height: T;
}

/**
 * @description 播放器默认位置和尺寸
 * @typedef {DefaultPositionAndSize}
 */
export type DefaultPositionAndSize<T = number> = DefaultPosition<T> & DefaultSize<T>;

/**
 * @description 播放器配置
 * @typedef {PlayerOpts}
 */
export type PlayerOpts = {
    /**
     * 默认位置
     */
    defaultPosition?: DefaultPosition;
    /**
     * 默认大小
     */
    defaultSize?: DefaultSize;
    /**
     * 拖拽边界
     */
    bounds?: string;
    /**
     * 样式
     */
    style?: CSSProperties;
}

/**
 * @description RndPlayer配置
 * @typedef {RndPlayerProps}
 */
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
