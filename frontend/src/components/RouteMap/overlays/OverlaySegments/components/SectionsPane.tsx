import { Pane, Polyline } from "react-leaflet";
import { COLORS, getSegmentColor } from "../../../../../constants";
import { Z_INDEX } from "../../../constants";
import { Section } from "../types";

interface Props {
  id: string;
  sections: Section[];
}

export function SectionsPane({ id, sections }: Props) {
  return (
    <Pane name={`${id}-sections`} style={{ zIndex: Z_INDEX.route }}>
      {sections.map((section, sectionIndex) => (
        <Polyline
          key={sectionIndex}
          positions={section.latlng}
          pathOptions={{
            color:
              section.type === "regular"
                ? COLORS.route
                : getSegmentColor(section.type),
            weight: 5,
          }}
          interactive={false}
        />
      ))}
    </Pane>
  );
}
