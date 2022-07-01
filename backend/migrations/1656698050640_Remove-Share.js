/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropTable("Share");
  pgm.dropTable("ShareStravaActivity");
};

exports.down = (pgm) => {};
