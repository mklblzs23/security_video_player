import { useEffect, useState } from 'react';
import { formatTime  } from '../../../utils/dateTimeUtils';
import useVideoPlayerControls from './useVideoPlayerControls';
import { ShapeData } from '../../../types';

type VideoPlayerProps = {
  video: string | undefined;
  shapeData: ShapeData | undefined;
  className?: string;
};

function VideoPlayer(props: VideoPlayerProps) {
  const { video, shapeData, className } = props;
  const [showComponent, setShowComponent] = useState(false);
  const {
    videoRef, canvasRef, isPlaying, currentTime,
    handleTimeUpdate, togglePlayPause, handleSliderChange
  } = useVideoPlayerControls({ shapeData });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 700); 

    return () => clearTimeout(timer);
  }, []);

  if (!showComponent) {
    return (
      <span className="text-3xl">Loading...</span>
    );
  }

  return (
    <div className={`relative flex bg-black justify-center border border-solid rounded-3xl h-60vh p-4 min-w-820 ${className}`}>
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={video} type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        className="absolute"
        width={videoRef.current?.offsetWidth || 0}
        height={videoRef.current?.offsetHeight || 0}
      />
      <div className="absolute border-b rounded-b-3xl bottom-0 left-0 w-full bg-opacity-20 bg-gray-200  p-4 flex justify-between">
        <button onClick={togglePlayPause} className="bg-transparent p-0 mr-6">
          <img
            src={isPlaying ? "/pause.svg" : "/play.svg"}
            alt={isPlaying ? "Pause svg" : "Play svg"}
            className="w-7 h-7"
          />
        </button>
        <div className="flex items-center w-full text-white">
          <input
            type="range"
            value={currentTime}
            min={0}
            max={videoRef.current?.duration || 0}
            onChange={handleSliderChange}
            className="w-full h-2 outline-none"
          />
          <span className="ml-6">{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
