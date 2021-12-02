exports.up = (pgm) => {
  pgm.createTable(
    "StravaSettings",
    {
      athleteId: {
        type: "integer",
        primaryKey: true,
      },
      addLinkToActivityDescription: {
        type: "boolean",
        notNull: true,
        default: false,
      },
    },
    {
      ifNotExists: true,
    }
  );
};

exports.down = (pgm) => {};
