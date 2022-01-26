import { ListSubheader, SimpleListItem } from "@react-md/list";
import chunk from "lodash/chunk";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ZwiftEvent } from "../../../../services/events";

interface PowerUp {
  name: string;
  color: string;
}

// TODO: adjust colors
const POWER_UPS: Record<number, PowerUp> = {
  0: { name: "Feather", color: "#a1cb2a" },
  1: { name: "Draft Boost", color: "#1983eb" },
  2: { name: "Small Bonus (10 XP)", color: "#de45c9" },
  3: { name: "Large Bonus (250 XP)", color: "#da3e49" },
  4: { name: "Burrito", color: "#a87b4b" },
  5: { name: "Aero Boost", color: "#8bf4f6" },
  6: { name: "Ghost", color: "#0a0d15" },
  7: { name: "Steamroller", color: "#7015b0" },
  8: { name: "Anvil", color: "#4a4a4a" },
};

interface Props {
  event: ZwiftEvent;
}

export function EventPowerUps({ event }: Props) {
  const tag = event.tags.find((tag) => tag.startsWith("powerup_percent="));

  if (!tag) {
    return null;
  }

  const data = Object.fromEntries(
    chunk(
      tag
        .substring('powerup_percent="'.length, tag.length - 1)
        .split(",")
        .map((v) => +v),
      2
    )
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <>
      <ListSubheader>Power Ups</ListSubheader>

      <SimpleListItem aria-hidden="true">
        <div style={{ width: "100%", height: 100 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={600} height={300} data={[data]} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide />
              <Legend />
              {Object.entries(POWER_UPS)
                .filter(([key]) => data[key])
                .map(([key, { name, color }]) => (
                  <Bar
                    dataKey={key}
                    stackId="stack"
                    name={name}
                    fill={color}
                    isAnimationActive={false}
                  />
                ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SimpleListItem>
    </>
  );
}
