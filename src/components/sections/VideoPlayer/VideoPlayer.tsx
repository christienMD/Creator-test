import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoPlayerProps {
  previewUrl: string;
  thumbnail: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  previewUrl,
  thumbnail,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.pause();
      } else {
        ref.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref.current) {
      ref.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref.current) {
      const progress = (ref.current.currentTime / ref.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (
    e: React.MouseEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLVideoElement>
  ) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    const percentage = x / width;
    if (ref.current) {
      ref.current.currentTime = ref.current.duration * percentage;
    }
  };

  const handleVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: React.RefObject<HTMLVideoElement>
  ) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (ref.current) {
      ref.current.volume = value;
      setIsMuted(value === 0);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const VideoControls = ({
    videoRef,
    isModal = false,
  }: {
    videoRef: React.RefObject<HTMLVideoElement>;
    isModal?: boolean;
  }) => (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
      <div
        className="w-full h-1 bg-gray-600/40 rounded-full mb-2 cursor-pointer"
        onClick={(e) => handleProgressClick(e, videoRef)}
      >
        <div
          className="h-full bg-creator-bg-400 rounded-full relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-creator-bg-400 rounded-full" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-7 h-7 flex items-center justify-center">
            <button
              onClick={() => togglePlay(videoRef)}
              className="text-white hover:bg-creator-bg-400/20 rounded-full p-1.5 transition-colors transform-none"
            >
              {isPlaying ? (
                <Pause size={16} className="relative" />
              ) : (
                <Play size={16} className="relative" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleMute(videoRef)}
              className="text-white hover:bg-creator-bg-400/20 rounded-full p-1.5 transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(e, videoRef)}
              className="w-12 accent-creator-bg-400 cursor-pointer h-1"
            />
          </div>

          <div className="text-white text-xs">
            {videoRef.current &&
              `${formatTime(videoRef.current.currentTime)} / ${formatTime(
                videoRef.current.duration || 0
              )}`}
          </div>
        </div>

        {!isModal && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white hover:bg-creator-bg-400/20 rounded-full p-1.5 transition-colors"
          >
            <Maximize size={16} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`relative w-full h-full bg-black rounded-lg overflow-hidden ${className}`}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onTimeUpdate={() => handleTimeUpdate(videoRef)}
          onEnded={() => setIsPlaying(false)}
          poster={thumbnail}
          onClick={() => togglePlay(videoRef)}
        >
          <source src={previewUrl} type="video/mp4" />
        </video>

        <VideoControls videoRef={videoRef} />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black border-none">
          <div className="relative w-full h-[90vh]">
            <video
              ref={modalVideoRef}
              className="w-full h-full object-contain"
              onTimeUpdate={() => handleTimeUpdate(modalVideoRef)}
              onEnded={() => setIsPlaying(false)}
              autoPlay
            >
              <source src={previewUrl} type="video/mp4" />
            </video>

            <VideoControls videoRef={modalVideoRef} isModal={true} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoPlayer;
