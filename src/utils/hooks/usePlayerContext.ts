import { createContext } from 'react';
import type { Dispatch } from 'react';
import type { PlayerStoreState } from '@/store/usePlayerStore';
import type { PlayerProps } from '@/index.d';
// import type { VideoAttributes } from '@/index.d';
import { initialState } from '@/store/usePlayerStore';

export interface PlayerContextType extends PlayerProps {
    playerStore: PlayerStoreState;
    playerStoreDispatch: Dispatch<PlayerStoreState>;
    // videoAttributes: VideoAttributes;
    videoEle: HTMLVideoElement | null;
    videoContainerEle: HTMLDivElement | null;
}

export const defaultValue: Partial<PlayerContextType> = {
    playerStore: initialState,
    videoEle: null,
    videoContainerEle: null,
};

export const PlayerContext = createContext<PlayerContextType>(<PlayerContextType>defaultValue);
