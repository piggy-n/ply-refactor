import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import Draggable from 'react-draggable';
import { useRef, useState } from 'react';
import type { MouseEventHandler } from 'react';
import Icon from '@/components/CommonComponents/Icon';
import ziv3 from '@/utils/methods/zxImageViewer';

const cn = 'Screenshot';

const Screenshot = () => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [imageBase64, setImageBase64] = useState<string>('');

    const screenshotDivRef = useRef<HTMLDivElement>(null);

    const imageClickHandler: MouseEventHandler = (e) => {
        e.stopPropagation();
        const imageArr: string[] = [];

        imageArr.push(imageBase64);

        ziv3.update(imageArr);
        ziv3.view(0);
    };

    return (
        <Draggable bounds={'parent'} disabled={disabled}>
            <div className={classes(cn, '')}>
                <div className={classes(cn, 'close')}>
                    <Icon
                        name={'ws-close'}
                        onClick={() => console.log('close')}
                    />
                </div>
                <div
                    ref={screenshotDivRef}
                    className={classes(cn, 'image')}
                    onClick={imageClickHandler}
                    onMouseEnter={() => setDisabled(true)}
                    onMouseLeave={() => setDisabled(false)}
                />
            </div>
        </Draggable>
    );
};

export default Screenshot;
