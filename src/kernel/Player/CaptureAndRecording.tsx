import { classes } from '@/utils/methods/classes';
import * as React from 'react';
import '@/assets/styles/global.scss';
import { useContext, useMemo, useState } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import Icon from '@/components/CommonComponents/Icon';

const cn = 'Capture-And-Recording';

const CaptureAndRecording = () => {
    const {
        screenshot,
        recording
    } = useContext(PlayerContext);

    const [visible, setVisible] = useState(false);

    const state = useMemo(
        () => {
            if (screenshot && recording) {
                return 'both';
            }

            if (screenshot && !recording) {
                return 'screenshot';
            }

            if (!screenshot && recording) {
                return 'recording';
            }

            return 'none';
        },
        [
            screenshot,
            recording
        ]
    );

    const screenshotHandler = () => {
        console.log('screenshot');
    };

    const recordingHandler = () => {
        // todo recording
        console.log('recording');
    };

    const clickHandler = () => {
        if (state === 'both') {
            setVisible(!visible);
        }

        if (state === 'screenshot') {
            screenshotHandler();
        }

        if (state === 'recording') {
            recordingHandler();
        }
    };

    return (
        state !== 'none' ?
            <div className={classes(cn, '')}>
                <Icon
                    name={
                        state === 'both' ? 'setting' : (
                            state === 'screenshot' ? 'screenshot-lg' : 'recording-start'
                        )
                    }
                    size={18}
                    title={state === 'screenshot' ? '截图' : '录像'}
                    onClick={clickHandler}
                />
                {
                    visible &&
                    <div className={classes(cn, 'both')}>
                        <div
                            className={classes(cn, 'item')}
                            onClick={screenshotHandler}
                        >
                            <Icon name={'screenshot-sm'} />
                            <p>截图</p>
                        </div>
                        <div
                            className={classes(cn, 'item')}
                            onClick={recordingHandler}
                        >
                            <Icon name={'recording-start'} />
                            <p>录制</p>
                        </div>
                    </div>
                }
            </div>
            : null
    );
};

export default CaptureAndRecording;
