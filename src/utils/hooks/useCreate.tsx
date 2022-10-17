import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import * as React from 'react';
import type { DependencyList, CSSProperties } from 'react';

type ComponentType = 'UI' | 'CM';
type Position = 'before' | 'after';

const useCreate = <K extends keyof HTMLElementTagNameMap, T = string>(
    containerId: T,
    componentType: ComponentType,
    componentName: T,
    wrapperId: T,
    wrapperTagName: K,
    wrapperStyles: CSSProperties,
    position: Position,
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

                    if (position === 'before') {
                        document
                            .querySelector(`#${containerId}`)!
                            .insertBefore(componentWrapper, document.querySelector(`#${containerId}`)!.firstChild);
                    }

                    if (position === 'after') {
                        document
                            .querySelector(`#${containerId}`)!
                            .appendChild(componentWrapper);
                    }

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
