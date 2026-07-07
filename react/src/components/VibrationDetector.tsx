import { useEffect, useState } from "react";

type MotionData = {
  x: number;
  y: number;
  z: number;
};

export default function VibrationDetector() {
  const [isListening, setIsListening] = useState(false);
  const [motionData, setMotionData] = useState<MotionData>({
    x: 0,
    y: 0,
    z: 0,
  });

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
      event.acceleration || event.accelerationIncludingGravity;

    if (!accel) return;

    setMotionData({
      x: Number((accel.x ?? 0).toFixed(2)),
      y: Number((accel.y ?? 0).toFixed(2)),
      z: Number((accel.z ?? 0).toFixed(2)),
    });
  };

  const startDetection = async () => {
    setErrorMsg("");

    const debug = [
    `DeviceMotionEvent: ${"DeviceMotionEvent" in window}`,
    `Accelerometer: ${"Accelerometer" in window}`,
    `SecureContext: ${window.isSecureContext}`,
  ].join("\n");

  setErrorMsg(debug);

  if (!("DeviceMotionEvent" in window)) {
    setErrorMsg(
      debug + "\n\nこのブラウザは加速度センサーに対応していません。"
    );
    return;
  }

    try {
      const DeviceMotion =
        DeviceMotionEvent as typeof DeviceMotionEvent & {
          requestPermission?: () => Promise<"granted" | "denied">;
        };

      if (typeof DeviceMotion.requestPermission === "function") {
        const permission = await DeviceMotion.requestPermission();

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
      <h2>📱 振動センサー</h2>

      {!isListening ? (
        <button onClick={startDetection}>
          センサー開始
        </button>
      ) : (
        <>
          <p>🟢 検知中</p>

          <ul>
            <li>X：{motionData.x}</li>
            <li>Y：{motionData.y}</li>
            <li>Z：{motionData.z}</li>
          </ul>
        </>
      )}

      {errorMsg && (
        <p style={{ color: "red" }}>{errorMsg}</p>
      )}
    </div>
  );
}
