import * as React from 'react';
import { createRoot } from 'react-dom/client';
// import RndPlayer from '@/core/RndPlayer';
import Player from '@/core/Player';
// import { randomString } from '@/utils/methods/randomString';

const Demo = () => {
    const [url, setUrl] = React.useState('https://www.w3schools.com/html/mov_bbb.mp4');
    const [control, setControl] = React.useState(false);
    return (
        <>
            <button
                onClick={() => setUrl('https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/540p.mp4')}>
                设url
            </button>
            <button onClick={() => setUrl('')}>
                设url 空
            </button>
            <button
                onClick={() => setUrl('https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4')}>
                设url
            </button>
            <button
                onClick={() => setControl(!control)}>
                设控制
            </button>
            <div style={{
                width: '100vw',
                height: '100vh',
                background: 'rgba(0, 0, 0, 0.1)',
            }}>
                {/*<RndPlayer/>*/}
                <Player
                    videoContainerEleOpts={{
                        style: {
                            width: '480px',
                            height: '270px',
                        }
                    }}
                    controllable={control}
                    url={url}
                />
                {/*<Player*/}
                {/*    videoContainerEleOpts={{*/}
                {/*        style: {*/}
                {/*            width: '480px',*/}
                {/*            height: '270px',*/}
                {/*        },*/}
                {/*    }}*/}
                {/*    url={'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/test/file/2021/07/01/haiwang.mp4'}*/}
                {/*/>*/}
            </div>
        </>
    );
};

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Demo />);
