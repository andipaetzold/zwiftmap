import { useSettings } from "../../hooks/useSettings";

const formatNoDigits = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: "decimal",
});

interface Props {
  elevation: number;
}

export function Elevation({ elevation }: Props) {
  const [settings] = useSettings();
  switch (settings.units) {
    case "imperial":
      return <>{formatNoDigits.format(elevation * 3.28084)}ft</>;
    case "metric":
      return <>{formatNoDigits.format(elevation)}m</>;
  }
}
