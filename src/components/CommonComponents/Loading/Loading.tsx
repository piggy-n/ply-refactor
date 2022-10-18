import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import Icon from '@/components/CommonComponents/Icon';

const cn = 'Loading';

const Loading = () => {
    return (
        <div className={classes(cn, '')}>
            <Icon name={'loading'} size={24}/>
        </div>
    );
};

export default Loading;
