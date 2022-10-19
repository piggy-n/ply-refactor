import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';
import Icon from '@/components/CommonComponents/Icon';
import usePlayerStore from '@/store/usePlayerStore';
// import { useVideo } from '@/utils/hooks/useVideo';

const cn = 'Loading';

const Loading = () => {
    const { controllable } = usePlayerStore(s => s);
    
    return (
        <div className={classes(cn, '')}>
            <Icon name={'loading'} size={24}/>
            {
                controllable &&
                <p>正在加载中...</p>
            }
        </div>
    );
};

export default Loading;
