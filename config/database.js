const { Sequelize } = require("sequelize");
const chalk = require('chalk');
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // This line is crucial for development purposes, but be careful in production
    }
  }
});

const connect = async () => {
  try {
    console.log(chalk.blueBright.underline(`Connecting to Database...`));
    await sequelize.authenticate();
    console.log(chalk.blueBright.underline(
        `Database Connected Successfully!`
      ))
  } catch (error) {
    console.log(chalk.bold.redBright(`Error: ${error}`));
  }
};

connect();

module.exports = sequelize;
