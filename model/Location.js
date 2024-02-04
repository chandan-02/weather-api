const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Locations = sequelize.define(
  'location', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'location',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "location_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }
);


module.exports = Locations;