import { createRoot } from 'react-dom/client';
import { capture } from '@/utils/methods/capture';
import * as React from 'react';
import { Screenshot } from '@/kernel/Player/Screenshot';

interface Options {
    videoEle: HTMLVideoElement;
    canvasEle?: HTMLCanvasElement;
    eleId: string;
    uuid: string;
}

const removeScreenshot = (opts: Options) => {
    const { eleId, uuid } = opts;
    const containerEle = document.querySelector(`#${eleId}-${uuid}`);
    const screenshotEle = document.querySelector(`#screenshot-${uuid}`);

    if (containerEle && screenshotEle) {
        containerEle.removeChild(screenshotEle);
    }
};

const createScreenshot = (opts: Options) => {
    const { videoEle, uuid, eleId } = opts;
    const containerEle = document.querySelector(`#${eleId}-${uuid}`);
    const screenshotEle = document.querySelector(`#screenshot-${uuid}`);

    if (screenshotEle) {
        removeScreenshot(opts);
    }

    const screenshotDiv = document.createElement('div');
    screenshotDiv.id = `screenshot-${uuid}`;

    if (containerEle) {
        containerEle.appendChild(screenshotDiv);
    }

    const root = createRoot(screenshotDiv);
    const canvas = capture(videoEle);
    root.render(<Screenshot {...opts} canvasEle={canvas} />);
};

export { createScreenshot, removeScreenshot };
