import React, { useState } from 'react'
import { css } from '@mui/styled-engine'

interface HTMLVideoElementWithCaptureStream extends HTMLVideoElement {
  captureStream(): MediaStream;
}

export const AudioCapture: React.FC = () => {

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const [audioContexts, setAudioContexts] = useState(([] as AudioContext[]));
  const [isAudioCapturing, setIsAudioCapturing] = useState(false);

  const style = css({
    fontSize: '4vw',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: isHover ? 'lightblue' : 'white',
  })

  function startAudioCapture(): void {
    setIsAudioCapturing(true);
    const _audioContexts: AudioContext[] = [];
    document.querySelectorAll('video').forEach((videoTag) => {
      const videoStream = (videoTag as HTMLVideoElementWithCaptureStream).captureStream();

      const audioCtx = new AudioContext();
      _audioContexts.push(audioCtx);
      const audioAnalyser = audioCtx.createAnalyser();

      const videoSource = audioCtx.createMediaStreamSource(videoStream);
      videoSource.connect(audioAnalyser);
      audioAnalyser.connect(audioCtx.destination);

      audioAnalyser.fftSize = 2048;
      const audioBufferLength = audioAnalyser.frequencyBinCount;
      const audioData = new Uint8Array(audioBufferLength);

      const canvas = document.createElement('canvas');
      videoTag.closest('div.MuiBox-root')?.appendChild(canvas);

      function draw() {

        // In order to make this canvas responsive and sync with window resize.
        canvas.width = 0;
        canvas.height = 0;
        canvas.width = videoTag.clientWidth;
        canvas.height = videoTag.clientHeight / 2;

        audioAnalyser.getByteTimeDomainData(audioData);
        const canvas_width = canvas.width;
        const canvas_hight = canvas.height;

        const canvasCtx = canvas.getContext("2d");
        if (!canvasCtx) {
          return;
        }

        canvasCtx.clearRect(0, 0, canvas_width, canvas_hight);

        canvasCtx.fillStyle = "rgb(200, 200, 200)";
        canvasCtx.fillRect(0, 0, canvas_width, canvas_hight);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "rgb(0, 0, 0)";
        canvasCtx.beginPath();

        const sliceWidth = canvas_width / audioBufferLength;
        let x = 0;

        for (let i = 0; i < audioBufferLength; i++) {
          const v = audioData[i] / 128.0;
          const y = v * (canvas_hight / 2);

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas_width, canvas_hight / 2);
        canvasCtx.stroke();

        requestAnimationFrame(draw);
      }

      setAudioContexts(_audioContexts);
      videoTag.muted = false;
      draw();
    });
  }

  function stopAudioCapture(): void {
    setIsAudioCapturing(false);
    audioContexts.forEach((audioContext) => {
      audioContext.close();
    });

    document.querySelectorAll('video').forEach((videoTag) => {
      videoTag.closest('div.MuiBox-root')?.querySelector('canvas')?.remove();
    });
  }

  function onClick(event: any): void {
    if (isAudioCapturing) {
      stopAudioCapture();
    } else {
      startAudioCapture();
    }
  }

  return <div
    css={style}
    onClick={onClick}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >{isAudioCapturing ? 'Stop audio capture' : 'Start audio capture'}</div>
}
