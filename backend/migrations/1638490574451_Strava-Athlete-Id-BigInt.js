exports.up = (pgm) => {
  pgm.alterColumn("StravaToken", "athleteId", {
    type: "bigint",
    primaryKey: true,
  });

  pgm.alterColumn("StravaSettings", "athleteId", {
    type: "bigint",
    primaryKey: true,
  });
};
