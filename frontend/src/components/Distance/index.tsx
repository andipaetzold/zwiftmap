import { useSettings } from "../../hooks/useSettings";
import { Units } from "../../types";

const formatDigits = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  style: "decimal",
});

const formatNoDigits = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: "decimal",
});

interface Props {
  distance: number;
  label?: string;
}

export function Distance({ distance, label = "Distance" }: Props) {
  const units = useSettings((state) => state.units);
  const text = formatDistance(distance, units);
  return <span title={`${label}: ${text}`}>{text}</span>;
}

export function formatDistance(distance: number, units: Units): string {
  switch (units) {
    case "imperial": {
      const value = distance / 1.609;
      if (value < 0.3) {
        return `${formatNoDigits.format(value * 5280)}ft`;
      } else {
        return `${formatDigits.format(value)}mi`;
      }
    }
    case "metric": {
      if (distance < 1) {
        return `${formatNoDigits.format(distance * 1000)}m`;
      } else {
        return `${formatDigits.format(distance)}km`;
      }
    }
  }
}
