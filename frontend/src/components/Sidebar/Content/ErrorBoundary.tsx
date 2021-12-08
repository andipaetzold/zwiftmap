import {
  List,
  ListItemLink,
  ListItemText,
  SimpleListItem,
} from "@react-md/list";
import { EmailSVGIcon, RefreshSVGIcon } from "@react-md/material-icons";

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
        leftAddon={<RefreshSVGIcon />}
        leftAddonType="icon"
        href={window.location.origin}
      >
        <ListItemText>Reload the page</ListItemText>
      </ListItemLink>
      <ListItemLink
        leftAddonType="icon"
        leftAddon={<EmailSVGIcon />}
        href={mailtoHref}
      >
        <ListItemText>Get in touch</ListItemText>
      </ListItemLink>
    </List>
  );
}
