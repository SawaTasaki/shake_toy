import { useMemo, useState } from "react";
import MotionDetector from "./components/MotionDetector";
import type { MotionData } from "./components/MotionDetector";
import MagicEngine from "./components/MagicEngine";
import MagicPlayer from "./components/MagicPlayer";
import MagicSettings from "./components/MagicSettings";
import DebugPanel from "./components/DebugPanel";

import { magics } from "./data/magics";
import type {
  Direction,
  MagicMapping,
} from "./types/magic";

const defaultMapping: MagicMapping = {
  UP: "star",
  DOWN: "moon",
  LEFT: "heart",
  RIGHT: "ribbon",
  FRONT: "rainbow",
  BACK: "snow",
};

export default function App() {
  const [motion, setMotion] = useState<MotionData>({
    x: 0,
    y: 0,
    z: 0,
  });

  const [direction, setDirection] =
    useState<Direction>("UP");

  const [mapping, setMapping] =
    useState<MagicMapping>(defaultMapping);

  const currentMagic = useMemo(() => {
    const magicId = mapping[direction];

    return (
      magics.find((magic) => magic.id === magicId) ??
      null
    );
  }, [direction, mapping]);

  return (
    <>
      <MotionDetector onMotion={setMotion} />

      <MagicEngine
        motion={motion}
        onDetect={setDirection}
      />

      <MagicSettings
        mapping={mapping}
        onChange={setMapping}
      />

      <MagicPlayer magic={currentMagic} />

      <DebugPanel
  motion={motion}
  direction={direction}
  magic={currentMagic}
/>
    </>
  );
}
