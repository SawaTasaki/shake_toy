import { useEffect, useState } from "react";

export type MotionData = {
  x: number;
  y: number;
  z: number;
};

type Props = {
  onMotion: (motion: MotionData) => void;
};

export default function MotionDetector({
  onMotion,
}: Props) {
  const [isListening, setIsListening] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    return () => {
      window.removeEventListener(
        "devicemotion",
        handleMotion as EventListener
      );
    };
  }, []);

const handleMotion = (event: DeviceMotionEvent) => {
  const accel =
    event.acceleration ??
    event.accelerationIncludingGravity;

  setErrorMsg(
    `acceleration: ${event.acceleration ? "OK" : "NG"}
gravity: ${event.accelerationIncludingGravity ? "OK" : "NG"}`
  );

  if (!accel) return;

  const motion = {
    x: Number((accel.x ?? 0).toFixed(2)),
    y: Number((accel.y ?? 0).toFixed(2)),
    z: Number((accel.z ?? 0).toFixed(2)),
  };

  onMotion(motion);
};

  const startDetection = async () => {
    setErrorMsg("");

    try {
      const DeviceMotion =
        DeviceMotionEvent as typeof DeviceMotionEvent & {
          requestPermission?: () => Promise<"granted" | "denied">;
        };

      if (typeof DeviceMotion.requestPermission === "function") {
        const permission =
          await DeviceMotion.requestPermission();

        if (permission !== "granted") {
          setErrorMsg("センサーの利用が許可されませんでした。");
          return;
        }
      }

      window.addEventListener(
        "devicemotion",
        handleMotion as EventListener
      );

      setIsListening(true);
    } catch (err) {
      setErrorMsg(String(err));
    }
  };

  return (
    <div>
      {!isListening ? (
        <button onClick={startDetection}>
          センサー開始
        </button>
      ) : (
        <p>🟢 センサー検知中</p>
      )}

      {errorMsg && (
        <p style={{ color: "red" }}>{errorMsg}</p>
      )}
    </div>
  );
}
