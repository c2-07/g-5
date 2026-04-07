import React, { useState, useRef, useEffect } from 'react';
import css from './CrisprVideoPlayer.module.css';

const IconPlay = () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M8 5v14l11-7z"/></svg>;
const IconPause = () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const IconVolHigh = () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
const IconVolMute = () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>;
const IconFullscreen = () => <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>;
const IconSettings = () => <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>;
const IconHome = () => <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>;
const IconFocus = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.41 2.26-4.39C12.92 3.04 12.46 3 12 3z"/></svg>;
const IconBookmark = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>;
const IconReport = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>;
const IconLike = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 8.39C7.21 8.81 7 9.38 7 10v9c0 1.66 1.34 3 3 3h9c1.23 0 2.24-.74 2.67-1.83l1.83-4.28c.04-.15.06-.31.06-.47v-4z"/></svg>;
const IconDislike = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M15 3H6c-1.23 0-2.24.74-2.67 1.83l-1.83 4.28c-.04.15-.06.31-.06.47v4c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L11.83 23l6.59-7.39c.38-.42.58-.99.58-1.61V5c0-1.66-1.34-3-3-3zm4 0v12h4V3h-4z"/></svg>;
const IconShare = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>;
const IconDownload = () => <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>;
const IconCC = () => <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/></svg>;
const IconPiP = () => <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/></svg>;
const IconTheater = () => <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8z"/></svg>;
const IconArrowDown = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M7 10l5 5 5-5z"/></svg>;
const IconTrophy = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>;
const IconAutoNext = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16 6v12h2V6h-2zm-10 0v12l8.5-6L6 6z"/></svg>;
const IconSkipTime = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M4 12A8 8 0 1 1 12 20 8 8 0 0 1 4 12zM12 6v6l4.5 4.5 1.5-1.5-4-4V6h-2z"/></svg>;
const IconStar = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;

const CrisprVideoPlayer = ({ src, videoKey, title = "The Strongest Job is Apparently Not a Hero...", courseTitle, lectureIndex, totalLectures, onAutoNext, onTheaterToggle, isTheaterMode, onLeaveRating, hasRated, onShare }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [autoNext, setAutoNext] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
       videoRef.current.load();
       
       const savedTime = localStorage.getItem(`video-progress-${videoKey}`);
       if (savedTime && !isNaN(parseFloat(savedTime))) {
         videoRef.current.currentTime = parseFloat(savedTime);
       }

       videoRef.current.play().then(() => {
         setIsPlaying(true);
       }).catch(e => {
         setIsPlaying(false);
       });
    }
  }, [src, videoKey]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipForward = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.currentTime + 10;
    }
  };

  const skipBackward = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(p);
    setCurrentTime(formatTime(videoRef.current.currentTime));
    
    // Only save progress if not within 2 seconds of the end, to prevent auto-skip loops
    if (videoRef.current.duration - videoRef.current.currentTime > 2) {
      localStorage.setItem(`video-progress-${videoKey}`, videoRef.current.currentTime);
    } else {
      localStorage.removeItem(`video-progress-${videoKey}`);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val > 0 && isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      } else if (val === 0 && !isMuted) {
        setIsMuted(true);
        videoRef.current.muted = true;
      }
    }
  };

  const handleDownload = async (e) => {
    if (e) e.stopPropagation();
    try {
      // Fetch as blob to force download, avoiding cross-origin navigation
      const response = await fetch(src);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${title || 'video'}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback
      window.open(src, '_blank');
    }
  };

  const toggleFullScreen = () => {
    const container = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore key events if the user is typing in an input or textarea
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      if (!videoRef.current) return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
          break;
        case 'ArrowUp':
          e.preventDefault();
          const newVolUp = Math.min(1, videoRef.current.volume + 0.1);
          videoRef.current.volume = newVolUp;
          setVolume(newVolUp);
          if (newVolUp > 0 && isMuted) {
            setIsMuted(false);
            videoRef.current.muted = false;
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          const newVolDown = Math.max(0, videoRef.current.volume - 0.1);
          videoRef.current.volume = newVolDown;
          setVolume(newVolDown);
          if (newVolDown === 0 && !isMuted) {
            setIsMuted(true);
            videoRef.current.muted = true;
          }
          break;
        case ' ': // Spacebar for Play/Pause
          e.preventDefault();
          togglePlay();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMuted, volume, togglePlay]);

  return (
    <>
      {isFocused && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9998 }} 
          onClick={() => setIsFocused(false)}
        />
      )}
      <div 
        className={css.playerContainer} 
        style={{
          ...(isFocused ? { boxShadow: '0 0 100px 50px rgba(0,0,0,0.9)', zIndex: 9999, position: 'relative' } : {}),
          ...(isTheaterMode ? { borderRadius: 0, height: '100%' } : {})
        }}
      >
        {/* Top Bar */}
        <div className={css.topBar}>
          <div className={css.topBarLeft}>
            <span className={css.breadcrumbCat}>{courseTitle}</span>
            {totalLectures && (
              <span className={css.courseProgressInline}>
                <IconTrophy /> {Math.round((lectureIndex / totalLectures) * 100)}%
              </span>
            )}
            <span className={css.breadcrumbSeparator}>&gt;</span>
            <span className={css.breadcrumbTitle}>{lectureIndex}. {title}</span>
          </div>
          <div className={css.topBarRight}>
            {/* removed progressBox */}
          </div>
        </div>

      <div 
        className={css.videoWrapper} 
        style={isTheaterMode ? { aspectRatio: 'auto', flex: 1, maxHeight: '100%' } : {}}
      >
        <video
          key={videoKey}
          ref={videoRef}
          className={css.videoElement}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => {
            setIsPlaying(false);
            localStorage.removeItem(`video-progress-${videoKey}`); // Start from beginning on rewatch
            if (autoNext) {
               console.log("AutoNext triggered");
               if (onAutoNext) onAutoNext();
            }
          }}
          onClick={togglePlay}
        />
        <div className={css.controlsOverlay}>
            <div className={css.progressBarContainer} onClick={handleProgressClick}>
              <div className={css.progressBar} style={{ width: `${progress}%` }}></div>
            </div>
            <div className={css.controlsRow}>
              <div className={css.leftControls}>
                <button className={css.controlBtn} onClick={togglePlay}>
                  {isPlaying ? <IconPause /> : <IconPlay />}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button className={css.controlBtn} onClick={toggleMute}>
                    {isMuted ? <IconVolMute /> : <IconVolHigh />}
                  </button>
                  <input 
                    type="range" 
                    className={css.volumeSlider}
                    min="0" 
                    max="1" 
                    step="0.05" 
                    value={isMuted ? 0 : volume} 
                    onChange={handleVolumeChange}
                  />
                </div>
                <div className={css.timeDisplay}>
                  {currentTime} / {duration}
                </div>
              </div>
              <div className={css.rightControls}>
                <button className={css.controlBtn} onClick={handleDownload} title="Download"><IconDownload /></button>
                <button className={css.controlBtn} title="Picture in Picture"><IconPiP /></button>
                <button className={css.controlBtn} title="Captions"><IconCC /></button>
                <button className={css.controlBtn} onClick={() => onTheaterToggle && onTheaterToggle()} title="Theater Mode" style={{ color: isTheaterMode ? '#ffcc00' : '' }}><IconTheater /></button>
                <button className={css.controlBtn} onClick={toggleFullScreen} title="Fullscreen"><IconFullscreen /></button>
              </div>
            </div>
          </div>
      </div>

      {/* Secondary Toolbar Below Video */}
      <div className={css.secondaryToolbar}>
        <div className={css.toolGroup}>
            <button 
              className={`${css.stBtn} ${isFocused ? css.activeIcon : ''}`}
              onClick={() => setIsFocused(!isFocused)}
            >
              <span className={css.stIcon}><IconFocus /></span> Focus
            </button>
            <button 
              className={`${css.stBtn} ${autoNext ? css.active : ''}`}
              onClick={() => setAutoNext(!autoNext)}
            >
               <span className={css.stIcon}><IconAutoNext /></span> AutoNext
            </button>
            <button className={css.stBtn}>
              <span className={css.stIcon}><IconSkipTime /></span> Add Skiptime
            </button>
            <button 
              className={`${css.stBtn} ${isBookmarked ? css.activeIcon : ''}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <span className={css.stIcon}><IconBookmark /></span> Bookmark
            </button>
          </div>
        <div className={`${css.toolGroup} ${css.toolGroupRight}`}>
          <button 
            className={css.stBtn}
            onClick={() => onShare && onShare()}
          >
            <span className={css.stIcon}><IconShare /></span> Share
          </button>
          <button className={css.stBtn} onClick={() => alert("Reported!")}>
            <span className={css.stIcon}><IconReport /></span> Report
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CrisprVideoPlayer;
