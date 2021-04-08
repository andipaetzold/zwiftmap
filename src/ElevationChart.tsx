import { ResponsiveLine, Serie } from "@nivo/line";
import React, { useMemo } from "react";
import { Segment } from "./types";
import { simplify } from "./util/simplify";
import styles from "./ElevationChart.module.css";

interface Props {
  segment: Segment;
}

export function ElevationChart({ segment }: Props) {
  const data: Serie[] = useMemo(() => {
    const serie = {
      id: "Elevation",
      data: simplify(
        segment.distance.map((distance, index) => ({
          x: distance,
          y: segment.altitude[index],
        })),
        0.25
      ),
    };

    return [serie];
  }, [segment]);

  return (
    <div className={styles.Container}>
      <ResponsiveLine
        data={data}
        margin={{ top: 25, right: 25, bottom: 50, left: 50 }}
        xScale={{ type: "linear", min: "auto", max: "auto" }}
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          format: (value) => `${(value as number) / 1_000} km`,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickValues: 5,
          format: (value) => `${value} m`,
        }}
        pointSize={0}
        useMesh={true}
        enableSlices="x"
        animate={false}
        enableGridX={false}
        sliceTooltip={({ slice }) => (
          <table
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <tbody>
              <tr>
                <td>Distance:</td>
                <td>
                  <strong>
                    {Math.round((slice.points[0].data.x as number) / 1_000)} km
                  </strong>
                </td>
              </tr>
              <tr>
                <td>Elevation:</td>
                <td>
                  <strong>
                    {Math.round(slice.points[0].data.y as number)} m
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      />
    </div>
  );
}
