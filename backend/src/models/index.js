import Sequelize from "sequelize";

/**
 * Connect to Postgres
 */
const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
  }
);

const models = {
  User: sequelize.import("./user"),
  Profile: sequelize.import("./profile"),
};

// Bind the both tables
Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully!");
  })
  .catch((err) => {
    console.error("Unable to connect to the Database", err);
  });

export { sequelize };

export default models;
