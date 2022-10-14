import * as React from 'react';
import { createRoot } from 'react-dom/client';

const Demo = () => {
    return (
        <h1>Hello</h1>
    );
};

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<Demo/>);
