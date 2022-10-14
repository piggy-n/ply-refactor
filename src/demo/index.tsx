import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Icon from '@/components/Icon';

const Demo = () => {
    return (
        <>
            <h1>Hello</h1>
            <Icon name={'close'}/>
        </>
    );
};

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Demo/>);
