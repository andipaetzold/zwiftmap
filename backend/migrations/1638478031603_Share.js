exports.up = (pgm) => {
  pgm.createTable("Share", {
    id: {
      type: "CHAR(22)",
      primaryKey: true,
    },
    type: {
      type: "VARCHAR(255)",
      notNull: true,
    },
  });

  pgm.createTable("ShareStravaActivity", {
    id: {
      type: "CHAR(22)",
      primaryKey: true,
    },
    athlete: {
      type: "jsonb",
      notNull: true,
    },
    activity: {
      type: "jsonb",
      notNull: true,
    },
    streams: {
      type: "json",
      notNull: true,
    },
  });
};
