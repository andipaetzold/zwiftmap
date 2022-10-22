import { ListSubheader } from "@react-md/list";
import { LocationStateFog } from "../../../../services/location-state";
import { getFogImageUrl } from "../../../../util/image";
import { ShareImageListItem } from "../../../ShareImageListItem";

interface Props {
  state: LocationStateFog;
}

export function Sharing({ state }: Props) {
  const url = getFogImageUrl(state.world.slug);

  return (
    <>
      <ListSubheader>Sharing</ListSubheader>
      <ShareImageListItem url={url} filename={`fog-${state.world.slug}.png`} />
    </>
  );
}
