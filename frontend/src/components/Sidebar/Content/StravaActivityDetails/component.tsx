import { SimpleListItem } from "@react-md/list";
import { Typography } from "@react-md/typography";
import { Helmet } from "react-helmet-async";
import { StravaActivity } from "../../../../services/StravaActivityRepository";
import { StravaActivityElevationChart } from "./StravaActivityElevationChart";
import { StravaActivityFacts } from "./StravaActivityFacts";
import { StravaActivityLinks } from "./StravaActivityLinks";
import { StravaActivityRoutes } from "./StravaActivityRoutes";
import { StravaActivitySegments } from "./StravaActivitySegments";
import { StravaActivitySharing } from "./StravaActivitySharing";
import { StravaActivitySurface } from "./StravaActivitySurface";

interface Props {
  activity: StravaActivity;
}

export default function StravaActivityDetailsComponent({ activity }: Props) {
  return (
    <>
      <Helmet>
        <title>{activity.name}</title>
        <meta property="og:title" content={`${activity.name} - ZwiftMap`} />
      </Helmet>

      <SimpleListItem>
        <Typography type="headline-6" style={{ margin: 0 }}>
          {activity.name}
        </Typography>
      </SimpleListItem>

      <StravaActivityFacts activity={activity} />

      <StravaActivityElevationChart activity={activity} />
      <StravaActivitySurface activity={activity} />
      <StravaActivityRoutes activity={activity} />
      <StravaActivitySegments activity={activity} />
      <StravaActivitySharing activity={activity} />
      <StravaActivityLinks activity={activity} />
    </>
  );
}
