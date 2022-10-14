import type { CSSProperties, SVGAttributes } from 'react';

interface CompoundedComponent extends SVGAttributes<SVGElement> {
    fill?: string;
    name: string;
    size?: number;
    title?: string;
    useStyles?: CSSProperties;
}

declare const Icon: CompoundedComponent;
export default Icon;
export { Icon };
