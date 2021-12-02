import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { DATABASE_URL, ENVIRONMENT } from "../config";
import { StravaSettingsDBRow } from "./types";

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
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
    allowNull: false,
    unique: true,
  },
  addLinkToActivityDescription: {
    type: DataTypes.BOOLEAN,
    unique: true,
  },
});

export async function syncModels() {
  await StravaSettingsModel.sync({ alter: true });
}
