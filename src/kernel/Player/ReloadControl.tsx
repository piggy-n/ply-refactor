import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import Icon from '@/components/CommonComponents/Icon';

const cn = 'Reload-Control';

const ReloadControl = () => {
    const clickHandler = () => {
        console.log('reload');
    };

    return (
        <div
            className={classes(cn, '')}
            onClick={clickHandler}
        >
            <Icon
                name={'reload'}
                size={18}
                title={'重载'}
            />
        </div>
    );
};

export default ReloadControl;
