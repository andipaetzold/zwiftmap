import { useSettings } from "../../hooks/useSettings";

const formatNoDigits = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: "decimal",
});

interface Props {
  elevation: number;
  label?: string;
}

export function Elevation({ elevation, label = "Elevation" }: Props) {
  const units = useSettings((state) => state.units);
  let text: string;
  switch (units) {
    case "imperial":
      text = `${formatNoDigits.format(elevation * 3.28084)}ft`;
      break;
    case "metric":
      text = `${formatNoDigits.format(elevation)}m`;
      break;
  }
  return <span title={`${label}: ${text}`}>{text}</span>;
}
