import { Divider } from "@react-md/divider";
import { Select } from "@react-md/form";
import { List, ListItem, SimpleListItem } from "@react-md/list";
import React from "react";
import { routes, worlds } from "./data";
import styles from "./RouteSelector.module.css";
import { Route, WorldSlug } from "./types";

export interface RouteSelection {
  world: WorldSlug;
  route?: Route;
}

interface Props {
  selection: RouteSelection;
  onChange: (route: RouteSelection) => void;
}
export default function RouteSelector({ selection, onChange }: Props) {
  const filteredRoutes = routes
    .filter((route) => route.world === selection.world)
    .filter((route) => route.sport === "cycling")
    .filter((route) => route.stravaSegmentId !== undefined)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.Container}>
      <List style={{ width: "100%" }}>
        <SimpleListItem>
          <Select
            id="world-select"
            value={selection.world}
            onChange={(newWorldSlug) =>
              onChange({ world: newWorldSlug as WorldSlug })
            }
            labelKey="name"
            valueKey="slug"
            options={worlds as any}
            style={{ width: "100%" }}
          />
        </SimpleListItem>
        <Divider />
        {filteredRoutes.map((route) => (
          <ListItem
            key={route.slug}
            onClick={() => onChange({ world: route.world, route: route })}
          >
            {route.name}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
