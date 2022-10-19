import parseISO from "date-fns/parseISO";
import { Helmet } from "react-helmet-async";
import { EventSubgroup } from "../../../../types";
import { FORMAT_LONG } from "../../../../util/formats";

interface Props {
  subgroup: EventSubgroup;
}

export function EventHelmet({ subgroup }: Props) {
  const description = `Event details for "${
    subgroup.name
  }" starting ${FORMAT_LONG.format(
    parseISO(subgroup.eventSubgroupStart)
  )} on Zwift`;
  return (
    <Helmet>
      <title>{subgroup.name}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={`${subgroup.name} - ZwiftMap`} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
