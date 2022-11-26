import { TextIconSpacing } from "@react-md/icon";
import { List, SimpleListItem } from "@react-md/list";
import { ListSVGIcon } from "@react-md/material-icons";
import { Typography } from "@react-md/typography";
import { Helmet } from "react-helmet-async";
import { useIsLoggedInStrava } from "../../../../hooks/useIsLoggedInStrava";
import { LocationStateFog } from "../../../../services/location-state";
import { ButtonState } from "../../../ButtonState";
import { ConnectToStravaListItem } from "../../../ConnectToStravaListItem";
import { LoadingSpinnerListItem } from "../../../Loading";
import { FogComponent } from "./component";

interface Props {
  state: LocationStateFog;
}

export function Fog(props: Props) {
  const isLoggedInStrava = useIsLoggedInStrava();

  if (isLoggedInStrava === null) {
    return (
      <List>
        <Header state={props.state} />
        <LoadingSpinnerListItem />
      </List>
    );
  }

  if (!isLoggedInStrava) {
    return (
      <List>
        <Header state={props.state} />
        <ConnectToStravaListItem />
      </List>
    );
  }

  return (
    <>
      <Header state={props.state} />
      <FogComponent {...props} />
    </>
  );
}

interface HeaderProps {
  state: LocationStateFog;
}

function Header({ state }: HeaderProps) {
  return (
    <>
      <Helmet>
        <title>Fog of Zwift: {state.world.name}</title>
        <meta
          name="description"
          content="Explore every single piece of road on Zwift"
        />

        <meta
          property="og:title"
          content={`Fog of Zwift: ${state.world.name} - ZwiftMap`}
        />
        <meta
          property="og:description"
          content="Explore every single piece of road on Zwift"
        />
      </Helmet>
      <SimpleListItem>
        <ButtonState
          themeType="outline"
          query=""
          state={{ world: state.world, type: "default" }}
        >
          <TextIconSpacing icon={<ListSVGIcon />}>Route List</TextIconSpacing>
        </ButtonState>
      </SimpleListItem>

      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          Fog of Zwift
        </Typography>
      </SimpleListItem>
    </>
  );
}
