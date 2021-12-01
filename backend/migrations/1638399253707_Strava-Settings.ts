import { MigrationBuilder } from "node-pg-migrate";

exports.up = (pgm: MigrationBuilder) => {
  pgm.createTable("strava_settings", {
    athlete_id: {
      type: "int",
      unique: true,
      primaryKey: true,
      notNull: true,
    },
    add_link_to_activity_description: {
      type: "boolean",
      notNull: true,
    },
  });
};
