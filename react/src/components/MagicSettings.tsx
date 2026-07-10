import type { Direction, MagicMapping } from "../types/magic";

type Props = {
  mapping: MagicMapping;
  onChange: (mapping: MagicMapping) => void;
};

const magics = [
  { id: "star", name: "⭐ スター" },
  { id: "moon", name: "🌙 ムーン" },
  { id: "heart", name: "💖 ハート" },
  { id: "ribbon", name: "🎀 リボン" },
  { id: "rainbow", name: "🌈 レインボー" },
  { id: "snow", name: "❄️ スノー" },
];

const directions: { key: Direction; label: string }[] = [
  { key: "UP", label: "上" },
  { key: "DOWN", label: "下" },
  { key: "LEFT", label: "左" },
  { key: "RIGHT", label: "右" },
  { key: "FRONT", label: "手前" },
  { key: "BACK", label: "奥" },
];

export default function MagicSettings({
  mapping,
  onChange,
}: Props) {
  const handleChange = (
    direction: Direction,
    magicId: string
  ) => {
    onChange({
      ...mapping,
      [direction]: magicId,
    });
  };

  return (
    <div>
      <h2>魔法の設定</h2>

      {directions.map(({ key, label }) => (
        <div key={key}>
          <label>{label}</label>

          <select
            value={mapping[key]}
            onChange={(e) =>
              handleChange(key, e.target.value)
            }
          >
            {magics.map((magic) => (
              <option key={magic.id} value={magic.id}>
                {magic.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
