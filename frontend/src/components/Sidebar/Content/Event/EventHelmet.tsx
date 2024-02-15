import { parseISO } from "date-fns";
import { Helmet } from "react-helmet-async";
import { EventSubgroup, ZwiftEvent } from "../../../../types";
import { FORMAT_LONG } from "../../../../util/formats";

interface Props {
  name: string;
  event: ZwiftEvent;
  subgroup: EventSubgroup | undefined;
}

export function EventHelmet({ name, event, subgroup }: Props) {
  const description = `Event details for "${name}" starting ${FORMAT_LONG.format(
    parseISO(subgroup?.eventSubgroupStart ?? event.eventStart)
  )} on Zwift`;
  return (
    <Helmet>
      <title>{name}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={`${name} - ZwiftMap`} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
