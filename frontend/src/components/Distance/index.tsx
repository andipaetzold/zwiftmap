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
}

export function Distance({ distance }: Props) {
  const [settings] = useSettings();
  switch (settings.units) {
    case "imperial": {
      const value = distance / 1.609;
      if (value < 0.3) {
        return <>{formatNoDigits.format(value * 5280)}ft</>;
      } else {
        return <>{formatDigits.format(value)}mi</>;
      }
    }
    case "metric": {
      if (distance < 1) {
        return <>{formatNoDigits.format(distance * 1000)}m</>;
      } else {
        return <>{formatDigits.format(distance)}km</>;
      }
    }
  }
}
