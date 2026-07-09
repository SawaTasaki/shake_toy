import { useEffect, useRef, useState } from "react";

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

  // 最後に音を鳴らした時間
  const lastPlayTime = useRef(0);

  // 効果音
  const audio = useRef(new Audio("/sounds/magicSound4.mp3"));

  useEffect(() => {
    return () => {
      window.removeEventListener(
        "devicemotion",
        handleMotion as EventListener
      );
    };
  }, []);

  const handleMotion = (event: DeviceMotionEvent) => {
    const accel = event.acceleration;

    if (!accel) return;

    const x = accel.x ?? 0;
    const y = accel.y ?? 0;
    const z = accel.z ?? 0;

    setMotionData({
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      z: Number(z.toFixed(2)),
    });

    // 加速度の強さ
    const power = Math.sqrt(x * x + y * y + z * z);

    const now = Date.now();

    // 閾値とクールダウン
    if (power > 8 && now - lastPlayTime.current > 300) {
      lastPlayTime.current = now;

      audio.current.currentTime = 0;
      audio.current.play().catch(console.error);

      console.log("Shake!", power);
    }
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
