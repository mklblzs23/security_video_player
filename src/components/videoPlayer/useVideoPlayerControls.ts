import { ChangeEvent, useEffect, useRef, useState } from "react";
import { formatTimeMilisec } from "../../../utils/dateTimeUtils";
import { ShapeData } from '../../../types';

type PropsType = {
  shapeData: ShapeData | undefined;
};

export default function useVideoPlayerControls(props: PropsType) {
  const { shapeData } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const formattedTime = formatTimeMilisec(currentTime);

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
      ctx.strokeRect(shape.x * xRatio, shape.y * yRatio, shape.w * xRatio, shape.h * yRatio);
    });
  }, [formattedTime, shapeData]);

  
  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const currentTime = event.currentTarget.currentTime;
    setCurrentTime(roundToNearestInterval(currentTime, 0.2));
    if (videoRef.current && currentTime && currentTime == videoRef.current.duration) setIsPlaying(false);
  };

  const roundToNearestInterval = (value: number, interval: number): number => {
    const roundedValue = Math.round(value / interval) * interval;
    return parseFloat(roundedValue.toFixed(6));
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

  return {
    videoRef,
    canvasRef,
    currentTime,
    isPlaying,
    handleTimeUpdate,
    togglePlayPause,
    handleSliderChange,
  }
}
