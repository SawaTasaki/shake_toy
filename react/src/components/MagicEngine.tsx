import { useEffect, useRef } from "react";
import type { Direction } from "../types/magic";
import type { MotionData } from "./MotionDetector";

type Props = {
  motion: MotionData;
  onDetect: (direction: Direction) => void;
};

// 振る強さの閾値
const POWER_THRESHOLD = 12;

// 連続発動防止
const COOLDOWN = 500; // ms

export default function MagicEngine({
  motion,
  onDetect,
}: Props) {
  const lastDetectTime = useRef(0);

  useEffect(() => {
    const { x, y, z } = motion;

    // 加速度の大きさ
    const power = Math.sqrt(
      x * x +
      y * y +
      z * z
    );

    // 弱い振りは無視
    if (power < POWER_THRESHOLD) {
      return;
    }

    const now = Date.now();

    // クールダウン中
    if (now - lastDetectTime.current < COOLDOWN) {
      return;
    }

    // 一番大きい軸だけ採用
    const absX = Math.abs(x);
    const absY = Math.abs(y);
    const absZ = Math.abs(z);

    let direction: Direction;

    if (absX >= absY && absX >= absZ) {
      direction = x > 0 ? "RIGHT" : "LEFT";
    } else if (absY >= absX && absY >= absZ) {
      direction = y > 0 ? "UP" : "DOWN";
    } else {
      direction = z > 0 ? "FRONT" : "BACK";
    }

    lastDetectTime.current = now;
    onDetect(direction);

    console.log(
      `Magic: ${direction} (power=${power.toFixed(2)})`
    );
  }, [motion, onDetect]);

  return null;
}
