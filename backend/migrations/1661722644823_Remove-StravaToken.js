/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropTable("StravaToken");
};

exports.down = (pgm) => {};
