import { Select } from "@react-md/form";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { World, worlds, WorldSlug } from "zwift-data";
import { WORLDS_BY_SLUG } from "../../constants";
import styles from "./WorldSelect.module.scss";

const options = [...worlds]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((world) => ({
    label: world.name,
    value: world.slug,
  }));

interface Props {
  world: World;
  onWorldChange: (newWorld: World) => void;
}

export function WorldSelect({ world, onWorldChange }: Props) {
  return (
    <div className={styles.Container}>
      <Select
        id="world-select"
        options={options}
        value={world.slug}
        listboxStyle={{ zIndex: 3000 }}
        onChange={(newWorldSlug) =>
          onWorldChange(WORLDS_BY_SLUG[newWorldSlug as WorldSlug])
        }
        rightChildren={<ArrowDropDownSVGIcon />}
      />
    </div>
  );
}
