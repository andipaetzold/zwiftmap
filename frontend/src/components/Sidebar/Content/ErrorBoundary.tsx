import { List, ListItemLink, SimpleListItem } from "@react-md/list";
import { EmailFontIcon, RefreshFontIcon } from "@react-md/material-icons";

interface Props {
  eventId: string | null;
}

export function ErrorBoundary({ eventId }: Props) {
  const params = new URLSearchParams();
  params.set("subject", "ZwiftMap Error");
  params.set("body", `\n\n\nError: ${eventId}`);
  const mailtoHref = `mailto:info@zwiftmap.com?${params.toString()}`;

  return (
    <List>
      <SimpleListItem>Something went wrong!</SimpleListItem>
      <ListItemLink
        leftAddon={<RefreshFontIcon />}
        leftAddonType="icon"
        href={window.location.origin}
      >
        Reload the page
      </ListItemLink>
      <ListItemLink
        leftAddonType="icon"
        leftAddon={<EmailFontIcon />}
        href={mailtoHref}
      >
        Get in touch
      </ListItemLink>
    </List>
  );
}
