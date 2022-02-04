import { useSettings } from "../../hooks/useSettings";

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
  let text: string;
  switch (units) {
    case "imperial": {
      const value = distance / 1.609;
      if (value < 0.3) {
        text = `${formatNoDigits.format(value * 5280)}ft`;
      } else {
        text = `${formatDigits.format(value)}mi`;
      }
      break;
    }
    case "metric": {
      if (distance < 1) {
        text = `${formatNoDigits.format(distance * 1000)}m`;
      } else {
        text = `${formatDigits.format(distance)}km`;
      }
      break;
    }
  }

  return <span aria-label={`${label}: ${text}`}>{text}</span>;
}
