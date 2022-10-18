import * as React from 'react';
import { createRoot } from 'react-dom/client';
// import RndPlayer from '@/core/RndPlayer';
import Player from '@/core/Player';

const Demo = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.1)',
        }}>
            {/*<RndPlayer/>*/}
            <Player
                videoContainerOpts={{
                    style: {
                        width: '480px',
                        height: '270px',
                    }
                }}
            />
        </div>
    );
};

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Demo/>);
