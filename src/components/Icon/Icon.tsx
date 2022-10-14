import * as React from 'react';
import { useMemo } from 'react';
import type { CSSProperties, FC, SVGAttributes } from 'react';
import { classes } from '@/utils/methods/classes';
import './styles/icon.scss';
import '@/utils/methods/importAll';

export interface IconProps extends SVGAttributes<SVGElement> {
    fill?: string;
    name: string;
    size?: number;
    title?: string;
    useStyles?: CSSProperties;
}

const cn = 'Icon';

const Icon: FC<IconProps> = (
    {
        className,
        fill = '#eff2f6',
        name,
        size,
        style,
        title,
        useStyles,
        ...rest
    },
) => {
    const iconName = useMemo(
        () => `#ws-${name}`,
        [name],
    );

    return (
        <svg
            className={classes(cn, '', [className])}
            style={{
                width: size && `${size}px`,
                height: size && `${size}px`,
                ...style,
            }}
            {...rest}
        >
            {
                title &&
                <title>{title}</title>
            }
            <use
                xlinkHref={iconName}
                fill={fill}
                style={useStyles}
            />
        </svg>
    );
};

export default Icon;
