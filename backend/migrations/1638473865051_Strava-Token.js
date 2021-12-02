exports.up = (pgm) => {
  pgm.createTable(
    "StravaToken",
    {
      athleteId: {
        type: "integer",
        primaryKey: true,
      },
      token: {
        type: "varchar(255)",
        allowNull: false,
      },
      refreshToken: {
        type: "varchar(255)",
        allowNull: false,
      },
      expiresAt: {
        type: "integer",
        allowNull: false,
      },
      scope: {
        type: "varchar(255)[]",
        allowNull: true, // old tokens don't have the scope stored
      },
    },
    {
      ifNotExists: true,
    }
  );
};

exports.down = (pgm) => {};
