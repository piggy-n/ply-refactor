import type { CSSProperties, VideoHTMLAttributes, HTMLAttributes } from 'react';

export type noArgVoid = () => void;

export type isArgVoid<T> = (arg: T) => void;

/**
 * @description 视频尺寸
 * @interface VideoSize
 * @param {number} videoWidth 视频宽度
 * @param {number} videoHeight 视频高度
 */
export type VideoSize<T = number> = {
    videoWidth: T;
    videoHeight: T;
}

/**
 * @description 播放属性
 * @interface VideoAttributes
 * @param {boolean} playing 是否播放
 * @param {number} currentTime 当前时间/s
 * @param {number} totalTime 总时长
 * @param {number} bufferedTime 缓存时长/s
 * @param {boolean} ended 是否结束
 * @param {null | number} error 错误
 * @param {VideoSize} videoSize 视频尺寸
 * @param {number} networkState 网络状态
 * @param {number} readyState 视频就绪状态
 */
export type VideoAttributes<T = number, U = boolean, K = null> = {
    playing: U;
    currentTime: T;
    totalTime: T;
    bufferedTime: T;
    ended: U;
    error: T | K;
    videoSize: VideoSize;
    networkState: T;
    readyState: T;
}

/**
 * @description 播放器方法
 * @param play 播放
 * @param pause 暂停
 * @param reload 重新加载
 * @param setPlayProgress 设置播放进度
 * @param setVideoSrc 设置视频源
 */
export type VideoMethods<T = noArgVoid, U = isArgVoid<T>> = {
    play: T;
    pause: T;
    reload: T;
    setPlayProgress: U<number>;
    setVideoSrc: U<string>;
}

/**
 * @description 播放器回调
 * @param onPlay 播放
 * @param onPause 暂停
 * @param onTimeUpdate 时间更新
 * @param onEnded 结束
 * @param onProgressMouseDown 进度条鼠标按下
 * @param onProgressMouseUp 进度条鼠标抬起
 * @param onVideoStateChange 视频状态改变
 * @param onError 错误
 */
export type VideoCallBack<T = VideoAttributes, U = isArgVoid<T>, K = noArgVoid> = {
    onPlay: U<T>;
    onPause: U<T>;
    onTimeUpdate: U<T>;
    onEnded: U<T>;
    onProgressMouseDown: U<T>;
    onProgressMouseUp: U<T>;
    onVideoStateChange: U<T>;
    onError: K;
}

export type PlayerRef = VideoAttributes & VideoMethods & { video: HTMLVideoElement | null };

/**
 * @description 播放器属性
 * @param {string} url 视频源
 */
export interface PlayerProps<T = VideoHTMLAttributes<HTMLVideoElement>, K = HTMLAttributes<HTMLDivElement>> {
    url?: string;
    controllable?: boolean;
    fullScreen?: boolean;
    recording?: boolean;
    screenshot?: boolean;
    videoContainerEleOpts?: K;
    videoEleOpts?: T;
}

/**
 * @description 设备信息
 * @typedef {Device} PlayerOpts
 * @param {string} id 设备id
 * @param {string} name 设备名称
 * @param {boolean} status 设备状态 true:在线 false:离线
 */
export type Device<T = string, U = boolean> = {
    id: T;
    name?: T;
    status?: U;
}

/**
 * @description 播放器默认位置
 * @typedef {DefaultPosition} PlayerOpts
 * @param {number} x x轴坐标 left-position
 * @param {number} y y轴坐标 top-position
 */
export type DefaultPosition<T = number> = {
    x: T;
    y: T;
}

/**
 * @description 播放器默认尺寸
 * @typedef {DefaultSize} PlayerOpts
 * @param {number} width 宽度 范围：200 - 960，外部传入的值会被限制在此范围内
 * @param {number} height 高度 范围：200 - 960，外部传入的值会被限制在此范围内
 */
export type DefaultSize<T = number> = {
    width: T;
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
 * @param {DefaultPosition} defaultPosition 默认位置
 * @param {DefaultSize} defaultSize 默认尺寸
 * @param {boolean} bounds 是否限制拖拽范围
 * @param {CSSProperties} style 自定义样式
 */
export type PlayerOpts = {
    defaultPosition?: DefaultPosition;
    defaultSize?: DefaultSize;
    bounds?: string;
    style?: CSSProperties;
}

/**
 * @description 播放器头部配置
 * @typedef {Header}
 */
export type Header = 'default' // | '...' 如有新header需求，在此处添加

/**
 * @description 播放器主体配置
 * @typedef {Main}
 */
export type Main = 'default' // | '...' 如有新main需求，在此处添加

/**
 * @description RndPlayer配置
 * @typedef {RndPlayerProps}
 * @param {Device} device 设备信息
 * @param {PlayerOpts} playerOpts 播放器配置
 * @param {Header} header 播放器头部组件配置
 * @param {Main} main 播放器主体组件配置
 */
export interface RndPlayerProps {
    deviceOpts?: Device;
    playerOpts?: PlayerOpts;
    header?: Header;
    main?: Main;
}
