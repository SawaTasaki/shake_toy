export type Direction =
  | "UP"
  | "DOWN"
  | "LEFT"
  | "RIGHT"
  | "FRONT"
  | "BACK";

export type Magic = {
  id: string;
  name: string;
  sound: string;
  image: string;
};

export type MagicMapping = Record<Direction, string>;
