import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { Link } from "@react-md/link";
import { Typography } from "@react-md/typography";
import styles from "./component.module.scss";

interface Props {
  onClose: () => void;
}

export default function InfoDialog({ onClose }: Props) {
  return (
    <Dialog
      id="info-dialog"
      aria-labelledby="info-dialog-title"
      visible={true}
      onRequestClose={onClose}
      className={styles.Dialog}
    >
      <DialogHeader style={{ paddingBottom: 0 }}>
        <DialogTitle id="info-dialog-title">ZwiftMap</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Typography>
          ZwiftMap is a fan project created by Andi Pätzold.
        </Typography>

        <Typography>
          All code is open source and available on{" "}
          <Link
            href="https://github.com/andipaetzold/zwiftmap"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </Link>
          .
        </Typography>

        <Typography>
          Route and Segment Information is collected and combined from:{" "}
        </Typography>
        <ul>
          <li>
            <Link
              href="https://strava.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              Strava
            </Link>
          </li>
          <li>
            <Link
              href="https://whatsonzwift.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              What&apos;s on Zwift
            </Link>
          </li>
          <li>
            <Link
              href="https://zwift.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              Zwift
            </Link>
          </li>
          <li>
            <Link
              href="https://zwifthub.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              ZwiftHub
            </Link>
          </li>
          <li>
            <Link
              href="https://zwiftpower.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              Zwift Power
            </Link>
          </li>
        </ul>

        <Typography>
          World maps were created by{" "}
          <Link
            href="https://zwift.com"
            rel="noreferrer noopener"
            target="_blank"
          >
            Zwift
          </Link>
          .
        </Typography>

        <Typography>
          ZwiftMap does not collect, analyze or store any sensitive information.
          The app only uses data required for the operation and monitoring.
        </Typography>

        <Typography type="headline-6" style={{ margin: 0 }}>
          Contact
        </Typography>
        <Typography>
          Andi Pätzold
          <br />
          <Link
            href="mailto:info@zwiftmap.com"
            rel="noreferrer noopener"
            target="_blank"
          >
            info@zwiftmap.com
          </Link>{" "}
          or{" "}
          <Link
            href="https://twitter.com/andipaetzold"
            rel="noreferrer noopener"
            target="_blank"
          >
            Twitter
          </Link>
          <br />
          Support this project via{" "}
          <Link
            href="https://paypal.com/donate?hosted_button_id=PWQGBVL8H88QW"
            rel="noreferrer noopener"
            target="_blank"
          >
            PayPal
          </Link>
        </Typography>
      </DialogContent>
      <DialogFooter>
        <Button id="dialog-close" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
