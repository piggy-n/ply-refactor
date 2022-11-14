import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '@/utils/hooks/usePlayerContext';
import { qualityObj } from '@/kernel/config';
import type { QualityType } from '@/kernel/config';
import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import '@/assets/styles/global.scss';

const cn = 'Quality-Viewer';

const QualityViewer = () => {
    const {
        videoProperties: {
            videoSize,
            readyState
        }
    } = useContext(PlayerContext);

    const { videoWidth } = videoSize || { videoWidth: 0 };
    const [quality, setQuality] = useState<QualityType>();

    useEffect(
        () => {
            if (videoWidth > 0 && videoWidth < 1280) {
                setQuality(qualityObj['SD']);
            }

            if (videoWidth >= 1280 && videoWidth < 1920) {
                setQuality(qualityObj['HD']);
            }

            if (videoWidth >= 1920 && videoWidth < 2560) {
                setQuality(qualityObj['FHD']);
            }

            if (videoWidth >= 2560 && videoWidth < 3840) {
                setQuality(qualityObj['QHD']);
            }

            if (videoWidth >= 3840) {
                setQuality(qualityObj['UHD']);
            }
        },
        [videoWidth]
    );

    return (
        videoWidth > 0 && readyState > 0
            ? <div className={classes(cn, '')}>
                {quality?.enName}
            </div>
            : <></>
    );
};

export default QualityViewer;
