import * as React from 'react';
import { createRoot } from 'react-dom/client';
// import RndPlayer from '@/core/RndPlayer';
import Player from '@/core/Player';
import { randomString } from '@/utils/methods/randomString';

const Demo = () => {
    const [url, setUrl] = React.useState('https://www.w3schools.com/html/mov_bbb.mp4');
    return (
        <>
            <button onClick={() => setUrl(randomString())}>
                设url
            </button>
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
                    url={url}
                />
            </div>
        </>
    );
};

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Demo/>);
