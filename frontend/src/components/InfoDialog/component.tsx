import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
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
        <Typography>ZwiftMap is a fan project created by Andi Pätzold.</Typography>

        <Typography>
          All code is open source and available on{" "}
          <a
            href="https://github.com/andipaetzold/zwiftmap"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </a>
          .
        </Typography>

        <Typography>
          Route and Segment Information is collected and combined from:{" "}
        </Typography>
        <ul>
          <li>
            <a
              href="https://strava.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              Strava
            </a>
          </li>
          <li>
            <a
              href="https://whatsonzwift.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              What's on Zwift
            </a>
          </li>
          <li>
            <a
              href="https://zwift.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              Zwift
            </a>
          </li>
          <li>
            <a
              href="https://zwifthub.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              ZwiftHub
            </a>
          </li>
          <li>
            <a
              href="https://zwiftpower.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              Zwift Power
            </a>
          </li>
        </ul>

        <Typography>
          World maps were created by{" "}
          <a href="https://zwift.com" rel="noreferrer noopener" target="_blank">
            Zwift
          </a>
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
          <a
            href="mailto:info@zwiftmap.com"
            rel="noreferrer noopener"
            target="_blank"
          >
            info@zwiftmap.com
          </a>
          <br />
          Support this project via{" "}
          <a
            href="https://paypal.com/donate?hosted_button_id=PWQGBVL8H88QW"
            rel="noreferrer noopener"
            target="_blank"
          >
            PayPal
          </a>
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
