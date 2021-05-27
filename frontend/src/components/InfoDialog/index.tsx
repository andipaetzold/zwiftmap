import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { Text } from "@react-md/typography";
import React from "react";
import styles from "./index.module.scss";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function InfoDialog({ visible, onClose }: Props) {
  return (
    <Dialog
      id="info-dialog"
      aria-labelledby="info-dialog-title"
      visible={visible}
      onRequestClose={onClose}
      className={styles.Dialog}
    >
      <DialogHeader style={{ paddingBottom: 0 }}>
        <DialogTitle id="info-dialog-title">Zwift Map</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Text>ZwiftMap is a fan project created by Andi Pätzold.</Text>

        <Text>
          All code is open source and available on{" "}
          <a
            href="https://github.com/andipaetzold/zwiftmap"
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </a>
          .
        </Text>

        <Text>
          Route and Segment Information is collected and combined from:{" "}
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
          </ul>
        </Text>

        <Text>
          World maps were created by
          <a href="https://zwift.com" rel="noreferrer noopener" target="_blank">
            Zwift
          </a>
          .
        </Text>

        <Text>
          ZwiftMap does not collect, analyze or store any sensitive information.
          The app only uses data required for the operation and monitoring.
        </Text>

        <Text type="headline-6" style={{ margin: 0 }}>
          Contact
        </Text>
        <Text>
          Andi Pätzold
          <br />
          <a
            href="mainto:info@zwiftmap.com"
            rel="noreferrer noopener"
            target="_blank"
          >
            info@zwiftmap.com
          </a>
          <br />
          Support this project via{" "}
          <a
            href="https://paypal.me/andipaetzold"
            rel="noreferrer noopener"
            target="_blank"
          >
            PayPal
          </a>
        </Text>
      </DialogContent>
      <DialogFooter>
        <Button id="dialog-close" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
