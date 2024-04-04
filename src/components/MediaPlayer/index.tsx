import { FC, useEffect, useRef, useState } from 'react';

import cx from 'classnames';

import FullScreenIcon from 'resources/svg/media-player/FullScreen';
import MuteIcon from 'resources/svg/media-player/Mute';
import PauseIcon from 'resources/svg/media-player/Pause';
import PlayIcon from 'resources/svg/media-player/Play';
import VolumeIcon from 'resources/svg/media-player/Volume';

type MediaPlayerType = {
  src: string;
  controllerClassName?: string;
  videoClassName?: string;
  wrapperClassName?: string;
  imageUrl?: string;
};

const MediaPlayer: FC<MediaPlayerType> = ({ src, controllerClassName, imageUrl, videoClassName, wrapperClassName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showController, setShowController] = useState(true);

  const audioPlayer = useRef<any>(); // reference our audio component
  const progressBar = useRef<any>(); // reference our progress bar
  const animationRef = useRef<any>(); // reference the animation

  const calculateTime = (secs: any) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };
  const remainTime = calculateTime(duration - currentTime);
  const playTime = calculateTime(currentTime);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    if (progressBar?.current?.value) {
      progressBar.current.value = audioPlayer?.current?.currentTime;
    }

    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar?.current?.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    const percentage = (progressBar?.current?.value / duration) * 100;
    progressBar?.current?.style?.setProperty('--seek-before-width', `${percentage}%`);
    setCurrentTime(progressBar?.current?.value);
  };

  const toggleMute = () => {
    setIsMuted((state) => !state);
  };
  const openFullscreen = () => {
    if (audioPlayer?.current?.requestFullscreen) {
      audioPlayer?.current?.requestFullscreen();
    } else if (audioPlayer?.current?.webkitRequestFullscreen) {
      /* Safari */
      audioPlayer?.current?.webkitRequestFullscreen();
    } else if (audioPlayer?.current?.msRequestFullscreen) {
      /* IE11 */
      audioPlayer?.current?.msRequestFullscreen();
    }
  };
  useEffect(() => {
    const setAudioData = () => {
      const seconds = audioPlayer.current.duration;
      setDuration(seconds);
      progressBar.current.max = seconds;
    };
    audioPlayer?.current?.addEventListener('loadeddata', setAudioData);

    return () => {
      audioPlayer?.current?.removeEventListener('loadeddata', setAudioData);
    };
  }, []);
  const handleMouseOver = () => {
    setShowController(true);
  };
  const handleMouseOut = () => {
    isPlaying && setShowController(false);
  };

  return (
    <div className={cx('audio-player', wrapperClassName)} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <video
        onClick={togglePlayPause}
        className={cx('video', videoClassName)}
        ref={audioPlayer}
        muted={isMuted}
        preload='metadata'
        loop
        poster={imageUrl}
      >
        <source src={src} />
      </video>
      <div className={cx('controller', controllerClassName, !showController && 'hidden')}>
        <button type='button' onClick={togglePlayPause} className='play-pause button'>
          {isPlaying ? <PauseIcon className='play' /> : <PlayIcon className='play' />}
        </button>
        <div className={'progress-wrap'}>
          <input type='range' className={'progress-bar'} defaultValue='0' ref={progressBar} onChange={changeRange} />
        </div>
        <div className={'duration'}>
          {duration && !isNaN(duration) && duration !== Infinity ? remainTime : playTime}
        </div>
        <button type='button' className='mute button' onClick={toggleMute}>
          {isMuted ? <MuteIcon /> : <VolumeIcon />}
        </button>
        <button type='button' onClick={openFullscreen} className='full-screen button'>
          <FullScreenIcon />
        </button>
      </div>
    </div>
  );
};

export default MediaPlayer;
