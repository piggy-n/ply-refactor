import * as React from 'react';
import { createRoot } from 'react-dom/client';
import RndPlayer from '@/core/RndPlayer';

const Demo = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.1)',
        }}>
            <RndPlayer/>
        </div>
    );
};

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Demo/>);
