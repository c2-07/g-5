import React, { useState, useRef, useEffect } from 'react';

const IconPlay = () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M8 5v14l11-7z"/></svg>;
const IconPause = () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const IconVolHigh = () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
const IconVolMute = () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>;
const IconFullscreen = () => <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>;
const IconFocus = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.41 2.26-4.39C12.92 3.04 12.46 3 12 3z"/></svg>;
const IconBookmark = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>;
const IconReport = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>;
const IconShare = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>;
const IconDownload = () => <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>;
const IconCC = () => <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/></svg>;
const IconPiP = () => <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/></svg>;
const IconTheater = () => <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8z"/></svg>;
const IconTrophy = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>;
const IconAutoNext = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16 6v12h2V6h-2zm-10 0v12l8.5-6L6 6z"/></svg>;
const IconSkipTime = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M4 12A8 8 0 1 1 12 20 8 8 0 0 1 4 12zM12 6v6l4.5 4.5 1.5-1.5-4-4V6h-2z"/></svg>;

const CrisprVideoPlayer = ({ src, videoKey, title = "The Strongest Job is Apparently Not a Hero...", courseTitle, lectureIndex, totalLectures, onAutoNext, onTheaterToggle, isTheaterMode, onShare }) => {
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
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
       videoRef.current.load();
       const savedTime = localStorage.getItem(`video-progress-${videoKey}`);
       if (savedTime && !isNaN(parseFloat(savedTime))) {
         videoRef.current.currentTime = parseFloat(savedTime);
       }
       videoRef.current.play().then(() => setIsPlaying(true)).catch(e => setIsPlaying(false));
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

  const handleTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(p);
    setCurrentTime(formatTime(videoRef.current.currentTime));
    
    if (videoRef.current.duration - videoRef.current.currentTime > 2) {
      localStorage.setItem(`video-progress-${videoKey}`, videoRef.current.currentTime);
    } else {
      localStorage.removeItem(`video-progress-${videoKey}`);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(formatTime(videoRef.current.duration));
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
    if (videoRef.current) videoRef.current.muted = newMuted;
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

  const togglePiP = async () => {
    if (!videoRef.current) return;
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture().catch(console.error);
    } else if (document.pictureInPictureEnabled) {
      await videoRef.current.requestPictureInPicture().catch(console.error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
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
          if (newVolUp > 0 && isMuted) { setIsMuted(false); videoRef.current.muted = false; }
          break;
        case 'ArrowDown':
          e.preventDefault();
          const newVolDown = Math.max(0, videoRef.current.volume - 0.1);
          videoRef.current.volume = newVolDown;
          setVolume(newVolDown);
          if (newVolDown === 0 && !isMuted) { setIsMuted(true); videoRef.current.muted = true; }
          break;
        case ' ': 
          e.preventDefault();
          togglePlay();
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMuted, volume, togglePlay]);

  return (
    <>
      {isFocused && (
        <div 
          className="fixed top-0 left-0 w-screen h-screen bg-black/80 z-[9998]"
          onClick={() => setIsFocused(false)}
        />
      )}
      <div 
        className={`flex flex-col w-full overflow-hidden bg-[#121212] shadow-2xl font-sans ${isFocused ? 'relative z-[9999] shadow-[0_0_100px_50px_rgba(0,0,0,0.9)]' : ''} ${isTheaterMode ? 'rounded-none h-full' : 'rounded-lg'}`}
      >
        <div className="bg-[#1a1a1a] px-5 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-400">
            <span>{courseTitle}</span>
            {totalLectures && (
              <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-xs font-semibold text-white mx-2">
                <span className="text-yellow-400 w-3.5 h-3.5 flex items-center justify-center"><IconTrophy /></span> {Math.round((lectureIndex / totalLectures) * 100)}%
              </span>
            )}
            <span className="mx-2 text-gray-600">&gt;</span>
            <span className="text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-[400px]">{lectureIndex}. {title}</span>
          </div>
        </div>

        <div 
          className={`relative w-full bg-black flex justify-center items-center group ${isTheaterMode ? 'flex-1 min-h-0' : 'aspect-video'}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <video
            key={videoKey}
            ref={videoRef}
            className={`w-full h-full object-contain cursor-pointer`}
            src={src}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => {
              setIsPlaying(false);
              localStorage.removeItem(`video-progress-${videoKey}`);
              if (autoNext && onAutoNext) onAutoNext();
            }}
            onClick={togglePlay}
          />
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-5 pb-4 flex flex-col gap-3 z-10 transition-opacity duration-300 ${isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-full h-1 bg-white/20 cursor-pointer relative transition-all duration-100 hover:h-1.5 group/progress" onClick={handleProgressClick}>
                <div className="h-full bg-yellow-400 relative" style={{ width: `${progress}%` }}>
                  <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-yellow-400 rounded-full opacity-0 transition-opacity duration-100 group-hover/progress:opacity-100"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button className="text-white hover:text-yellow-400 transition-colors p-0 flex items-center justify-center" onClick={togglePlay}>
                    {isPlaying ? <IconPause /> : <IconPlay />}
                  </button>
                  <div className="flex items-center gap-2 group/volume">
                    <button className="text-white hover:text-yellow-400 transition-colors p-0 flex items-center justify-center" onClick={toggleMute}>
                      {isMuted ? <IconVolMute /> : <IconVolHigh />}
                    </button>
                    <input 
                      type="range" 
                      className="w-0 opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 h-1 bg-white/30 rounded outline-none cursor-pointer transition-all duration-200 appearance-none hover:bg-white/50 accent-white"
                      min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={handleVolumeChange}
                      style={{ WebkitAppearance: 'none' }}
                    />
                  </div>
                  <div className="text-gray-300 text-xs tracking-wide ml-1">
                    {currentTime} / {duration}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-white hover:text-yellow-400 transition-colors p-0 flex items-center justify-center" onClick={handleDownload} title="Download"><IconDownload /></button>
                  <button className="text-white hover:text-yellow-400 transition-colors p-0 flex items-center justify-center" onClick={togglePiP} title="Picture in Picture"><IconPiP /></button>
                  <button className="text-white hover:text-yellow-400 transition-colors p-0 flex items-center justify-center" title="Captions"><IconCC /></button>
                  <button className={`p-0 flex items-center justify-center transition-colors ${isTheaterMode ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`} onClick={() => onTheaterToggle && onTheaterToggle()} title="Theater Mode"><IconTheater /></button>
                  <button className="text-white hover:text-yellow-400 transition-colors p-0 flex items-center justify-center" onClick={toggleFullScreen} title="Fullscreen"><IconFullscreen /></button>
                </div>
              </div>
            </div>
        </div>

        <div className="bg-[#1a1a1b] px-5 py-3 flex items-center justify-between border-t border-[#2a2a2b]">
          <div className="flex items-center gap-5">
              <button className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isFocused ? 'text-yellow-400' : 'text-gray-400 hover:text-white'}`} onClick={() => setIsFocused(!isFocused)}>
                <span className="text-base"><IconFocus /></span> Focus
              </button>
              <button className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${autoNext ? 'text-orange-500' : 'text-gray-400 hover:text-white'}`} onClick={() => setAutoNext(!autoNext)}>
                 <span className="text-base"><IconAutoNext /></span> AutoNext
              </button>
              <button className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                <span className="text-base"><IconSkipTime /></span> Add Skiptime
              </button>
              <button className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isBookmarked ? 'text-yellow-400' : 'text-gray-400 hover:text-white'}`} onClick={() => setIsBookmarked(!isBookmarked)}>
                <span className="text-base"><IconBookmark /></span> Bookmark
              </button>
            </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors" onClick={() => onShare && onShare()}>
              <span className="text-base"><IconShare /></span> Share
            </button>
            <button className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors" onClick={() => alert("Reported!")}>
              <span className="text-base"><IconReport /></span> Report
            </button>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          transition: transform 0.1s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: none;
        }
      `}} />
    </>
  );
};

export default CrisprVideoPlayer;
