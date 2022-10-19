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
                const containerEle = document.querySelector(`#${containerId}`)!;

                if (wrapperEle) {
                    containerEle.removeChild(wrapperEle);
                }

                if (!wrapperEle) {
                    const Component = require(
                        `@/components/${componentType === 'UI' ? 'UIComponents' : 'CommonComponents'}/${componentName}`
                    ).default;
                    const componentWrapper = document.createElement(wrapperTagName);

                    componentWrapper.id = `${wrapperId}`;
                    Object.assign(componentWrapper.style, wrapperStyles);

                    position === 'after'
                        ? containerEle.appendChild(componentWrapper)
                        : containerEle.insertBefore(componentWrapper, containerEle.firstChild);

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
