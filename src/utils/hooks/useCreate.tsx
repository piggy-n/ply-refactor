import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import * as React from 'react';
import type { DependencyList, CSSProperties } from 'react';

const useCreate = <K extends keyof HTMLElementTagNameMap, T = string>
(
    containerId: T,
    componentType: 'UI' | 'CM',
    componentName: T,
    wrapperId: T,
    wrapperTagName: K,
    wrapperStyles: CSSProperties,
    dep: DependencyList = [],
) => {
    useEffect(
        () => {
            try {
                const wrapperEle = document.querySelector(`#${wrapperId}`);

                if (wrapperEle) {
                    document
                        .querySelector(`#${containerId}`)!
                        .removeChild(wrapperEle);
                }

                if (!wrapperEle) {
                    const Component = require(
                        `@/components/${componentType === 'UI' ? 'UIComponents' : 'CommonComponents'}/${componentName}`
                    ).default;
                    const componentWrapper = document.createElement(wrapperTagName);

                    componentWrapper.id = `${wrapperId}`;
                    Object.assign(componentWrapper.style, wrapperStyles);

                    document
                        .querySelector(`#${containerId}`)!
                        .appendChild(componentWrapper);

                    const root = createRoot(componentWrapper);
                    root.render(<Component/>);
                }
            } catch (e) {
                console.error(e);
            }
        },
        dep
    );
};

export default useCreate;
