import { classes } from '@/utils/methods/classes';
import * as React from 'react';
import '@/assets/styles/global.scss';
import { useContext, useState } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import Icon from '@/components/CommonComponents/Icon';

const cn = 'Capture-And-Recording';
const st = 'setting';
const slg = 'screenshot-lg';
const ssm = 'screenshot-sm';
const rs = 'recording-start';

const CaptureAndRecording = () => {
    const {
        screenshot,
        recording
    } = useContext(PlayerContext);

    const both = screenshot && recording;
    const os = screenshot && !recording;
    const or = !screenshot && recording;

    const [visible, setVisible] = useState(false);

    const screenshotHandler = () => {
        console.log('screenshot');
    };

    const recordingHandler = () => {
        // todo recording
        console.log('recording');
    };

    const clickHandler = () => {
        if (both) {
            setVisible(!visible);
        }

        if (os) {
            screenshotHandler();
        }

        if (or) {
            recordingHandler();
        }
    };

    return (
        <div className={classes(cn, '')}>
            <Icon
                name={both ? st : (os ? slg : rs)}
                size={18}
                title={os ? '截图' : '录像'}
                onClick={clickHandler}
            />

            {
                visible &&
                <div className={classes(cn, 'both')}>
                    <div
                        className={classes(cn, 'item')}
                        onClick={screenshotHandler}
                    >
                        <Icon name={ssm} />
                        <p>截图</p>
                    </div>
                    <div
                        className={classes(cn, 'item')}
                        onClick={recordingHandler}
                    >
                        <Icon name={rs} />
                        <p>录制</p>
                    </div>
                </div>
            }
        </div>
    );
};

export default CaptureAndRecording;
