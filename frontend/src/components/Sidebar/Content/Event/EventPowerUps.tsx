import { ListSubheader, SimpleListItem } from "@react-md/list";
import chunk from "lodash-es/chunk";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { EventSubgroup, ZwiftEvent } from "../../../../types";

interface PowerUp {
  name: string;
  color: string;
}

// TODO: adjust colors
const POWER_UPS: Record<number, PowerUp> = {
  0: { name: "Feather", color: "#a1cb2a" },
  1: { name: "Draft Boost", color: "#1983eb" },
  2: { name: "Small Bonus", color: "#de45c9" },
  3: { name: "Large Bonus", color: "#da3e49" },
  4: { name: "Burrito", color: "#a87b4b" },
  5: { name: "Aero Boost", color: "#8bf4f6" },
  6: { name: "Ghost", color: "#0a0d15" },
  7: { name: "Steamroller", color: "#7015b0" },
  8: { name: "Anvil", color: "#4a4a4a" },
};

/**
 * source: https://zwiftinsider.com/distribution-of-zwift-powerups/
 */
const DEFAULT_DISTRIBUTION = {
  0: 25,
  1: 25,
  2: 29,
  3: 1,
  5: 20,
};

interface Props {
  event: ZwiftEvent;
  subgroup: EventSubgroup | undefined;
}

export function EventPowerUps({ event, subgroup }: Props) {
  const rulesSet = (subgroup ?? event).rulesSet;
  const tags = (subgroup ?? event).tags;
  if (
    rulesSet.includes("NO_POWERUPS") ||
    event.eventType === "TIME_TRIAL" ||
    event.eventType === "GROUP_WORKOUT"
  ) {
    return null;
  }

  const tag = tags.find((tag) => tag.startsWith("powerup_percent="));
  const distribution = tag
    ? Object.fromEntries(
        chunk(
          tag
            .substring('powerup_percent="'.length, tag.length - 1)
            .split(",")
            .map((v) => +v),
          2,
        ),
      )
    : DEFAULT_DISTRIBUTION;

  return (
    <>
      <ListSubheader>Power Ups</ListSubheader>

      <SimpleListItem aria-hidden="true">
        <div style={{ width: "100%", height: 100 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={600}
              height={300}
              data={[distribution]}
              layout="vertical"
            >
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide />
              <Legend />
              {Object.entries(POWER_UPS)
                .filter(([key]) => distribution[key])
                .map(([key, { name, color }]) => (
                  <Bar
                    key={key}
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
