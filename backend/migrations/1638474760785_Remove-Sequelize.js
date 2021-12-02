exports.up = (pgm) => {
  pgm.dropColumns("StravaSettings", ["createdAt", "updatedAt"], {
    ifExists: true,
  });
  pgm.dropColumns("StravaToken", ["createdAt", "updatedAt"], {
    ifExists: true,
  });
};
