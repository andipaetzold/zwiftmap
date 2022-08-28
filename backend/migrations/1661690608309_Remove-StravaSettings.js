/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropTable("StravaSettings");
};

exports.down = (pgm) => {};
