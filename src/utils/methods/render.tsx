import * as React from 'react';

const headerDictionaries: Record<string, string> = {
    'default': 'DefaultHeader',
};

export const renderHeader = (name: string) => {
    try {
        const Component = require(`@/components/${headerDictionaries[name]}`).default;

        return <Component/>;
    } catch (e) {
        console.error(e);
    }
    return <></>;
};
