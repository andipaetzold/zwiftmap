import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { DATABASE_URL, ENVIRONMENT } from "../config";
import { StravaSettingsDBRow, StravaToken } from "./types";

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl:
      ENVIRONMENT === "production"
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : undefined,
  },
  define: {
    freezeTableName: true,
  },
  logging: ENVIRONMENT === "development",
});

export const StravaSettingsModel: ModelDefined<
  StravaSettingsDBRow,
  StravaSettingsDBRow
> = sequelize.define("StravaSettings", {
  athleteId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  addLinkToActivityDescription: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export const StravaTokenModel: ModelDefined<StravaToken, StravaToken> =
  sequelize.define("StravaToken", {
    athleteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    scope: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true, // old tokens don't have the scope stored
    },
  });

export async function syncModels() {
  await StravaSettingsModel.sync();
  await StravaTokenModel.sync();
}
