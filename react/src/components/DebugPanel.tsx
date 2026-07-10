import type { Direction } from "../types/magic";
import type { MotionData } from "./MotionDetector";
import type { Magic } from "../types/magic";

type Props = {
  motion: MotionData;
  direction: Direction;
  magic: Magic | null;
};

export default function DebugPanel({
  motion,
  direction,
  magic,
}: Props) {
  const power = Math.sqrt(
    motion.x * motion.x +
    motion.y * motion.y +
    motion.z * motion.z
  );

  return (
    <details style={{ marginTop: "1rem" }}>
      <summary>🐞 Debug</summary>

      <pre
        style={{
          background: "#f5f5f5",
          padding: "12px",
          borderRadius: "8px",
        }}
      >
{`Motion
x: ${motion.x}
y: ${motion.y}
z: ${motion.z}

Power
${power.toFixed(2)}

Direction
${direction}

Magic
${magic?.name ?? "-"}`}
      </pre>
    </details>
  );
}
