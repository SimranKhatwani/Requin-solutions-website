import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { ProductItem } from '../data/requinData';

interface ProductVideoModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote?: (productTitle: string) => void;
}

export const ProductVideoModal: React.FC<ProductVideoModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const duration = '02:30';

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setIsPlaying(true);
      setProgress(0);
      setCurrentTime('00:00');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Video playback simulation / video sync
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        const next = prev + 0.8;
        const totalSecs = Math.floor((next / 100) * 150);
        const mins = String(Math.floor(totalSecs / 60)).padStart(2, '0');
        const secs = String(totalSecs % 60).padStart(2, '0');
        setCurrentTime(`${mins}:${secs}`);
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Auto-hide controls when mouse is inactive
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const togglePlay = () => {
    if (videoElementRef.current) {
      if (isPlaying) {
        videoElementRef.current.pause();
      } else {
        videoElementRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-xl animate-fade-in select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Floating Top-Right Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer shadow-2xl focus:outline-none"
        aria-label="Close video"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Pure 16:9 Video Player Container (No Header Dialog, No Footer Banner) */}
      <div
        ref={videoContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className="relative w-full max-w-5xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-[0_0_80px_rgba(8,185,232,0.35)] border border-[#08B9E8]/30 flex items-center justify-center group"
      >
        {/* Video or High-Fidelity Animated Presentation */}
        {product.videoUrl ? (
          <video
            ref={videoElementRef}
            src={product.videoUrl}
            autoPlay
            playsInline
            muted={isMuted}
            className="w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
          />
        ) : (
          <div
            className="relative w-full h-full cursor-pointer"
            onClick={togglePlay}
          >
            <img
              src={product.image}
              alt={`${product.title} Video Demo`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          </div>
        )}

        {/* Center Clickable Play / Pause Button with Glow */}
        <button
          onClick={togglePlay}
          className={`absolute z-20 w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-[#08B9E8]/70 flex items-center justify-center text-white shadow-[0_0_50px_rgba(8,185,232,0.6)] transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none ${
            !isPlaying || showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-8 sm:w-10 h-8 sm:h-10 fill-white" />
          ) : (
            <Play className="w-8 sm:w-10 h-8 sm:h-10 fill-white translate-x-1" />
          )}
        </button>

        {/* Top-Left Minimalist Watermark Pill */}
        <div
          className={`absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#08B9E8] animate-pulse shadow-[0_0_8px_#08B9E8]" />
          <span className="font-bold text-white">{product.title}</span>
          <span className="text-slate-400 text-[11px]">• Product Demo</span>
        </div>

        {/* Bottom Video Control Bar Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 sm:p-6 space-y-3 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Interactive Timeline Scrubber */}
          <div
            className="w-full h-2 bg-white/20 hover:h-2.5 rounded-full overflow-hidden cursor-pointer transition-all duration-150 relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newPct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
              setProgress(newPct);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#08B9E8] to-[#00c2ff] rounded-full shadow-[0_0_12px_#08B9E8] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="hover:text-white transition-colors cursor-pointer focus:outline-none"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current" />
                )}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-white transition-colors cursor-pointer focus:outline-none"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              <div className="font-mono text-xs text-slate-400">
                <span className="text-white font-medium">{currentTime}</span> / {duration}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded bg-[#08B9E8]/20 border border-[#08B9E8]/40 text-[10px] font-bold text-[#08B9E8]">
                1080p HD
              </span>
              <button
                onClick={toggleFullscreen}
                className="hover:text-white transition-colors cursor-pointer focus:outline-none"
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
