import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { formatTime } from '../../utils/dateTimeUtils';

type Shape = {
  x: number;
  y: number;
  w: number;
  h: number;
  class: string;
  confidence: number;
};

type ShapeData = {
  [time: string]: Shape[];
};

type VideoPlayerProps = {
  video: string | undefined;
  shapeData: ShapeData | undefined;
  className?: string;
};

function VideoPlayer(props: VideoPlayerProps) {
  const { video, shapeData, className } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const controllersRef = useRef<HTMLDivElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const formattedTime = formatTime(currentTime);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 700); 

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shapeData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const shapes = shapeData[formattedTime] || [];

    const originalVideoWidth = videoRef.current?.videoWidth || 1;
    const originalVideoHeight = videoRef.current?.videoHeight || 1;
    const displayedVideoWidth = videoRef.current?.offsetWidth || 1;
    const displayedVideoHeight = videoRef.current?.offsetHeight || 1;

    const xRatio = displayedVideoWidth / originalVideoWidth;
    const yRatio = displayedVideoHeight / originalVideoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach((shape) => {
      ctx.strokeStyle = shape.class === 'PERSON' ? 'orange' : 'cyan';
      ctx.lineWidth = 1;
      ctx.strokeRect(shape.x * xRatio, shape.y * yRatio, shape.w * xRatio, shape.h * xRatio);
    });
  }, [formattedTime, shapeData]);

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const currentTime = event.currentTarget.currentTime;
    setCurrentTime(roundToNearestInterval(currentTime, 0.2));
  };

  const roundToNearestInterval = (value: number, interval: number): number => {
    const roundedValue = Math.round(value / interval) * interval;
    return parseFloat(roundedValue.toFixed(6)); // Ensure 6 decimal places
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!videoRef.current) return;

    videoRef.current.currentTime = +value;
    setCurrentTime(+value);
  };

  if (!showComponent) {
    return (
      <span className="text-3xl">Loading...</span>
    );
  }

  return (
    <div className={`relative flex bg-black justify-center border border-solid rounded-3xl p-4 ${className}`}>
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        className="w-auto h-60vh"
      >
        <source src={video} type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        className="absolute"
        width={videoRef.current?.offsetWidth || 0}
        height={videoRef.current?.offsetHeight || 0}
      />
      <div className="absolute border-b rounded-b-3xl bottom-0 left-0 w-full bg-opacity-20 bg-gray-200  p-4 flex justify-between" ref={controllersRef}>
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
          <span className="ml-6">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
