export type Shape = {
  x: number;
  y: number;
  w: number;
  h: number;
  class: string;
  confidence: number;
};

export type ShapeData = {
  [time: string]: Shape[];
};
