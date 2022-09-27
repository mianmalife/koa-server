const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_pass,
  {
    host: config.db_host,
    dialect: "mysql",
    timezone: "+08:00",
  }
);
const userInfo = sequelize.define(
  "userInfo",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
  },
  {
    sequelize,
    modelName: "userInfo",
  }
);
async function findOption(id) {
  try {
    // const allUser = await userInfo.findAll();
    // const user = await userInfo.findAll({
    //   attributes: ["name", "id"],
    // });
    // const user = await userInfo.findAll({
    //   attributes: [["name", "username"], "id"],
    // });
    // const user = await userInfo.findAll({
    //   where: {
    //     name: "杨过",
    //   },
    // });
    // const user = await userInfo.findAll({
    //   where: {
    //     name: {
    //       [Op.eq]: "杨过",
    //     },
    //   },
    // });
    // const user = await userInfo.findAll({
    //   where: {
    //     [Op.or]: [{ name: "杨过" }, { name: "洪七公" }],
    //   },
    // });
    // const user = await userInfo.findAll({
    //   where: {
    //     id: {
    //       [Op.or]: [
    //         "5501a757-a02c-4fa8-92d5-3b80bf8029be",
    //         "db307006-5c12-414f-9c10-cfc6e88b434b",
    //       ],
    //     },
    //   },
    // });
    // await userInfo.update(
    //   { name: "神雕大侠杨过" },
    //   {
    //     where: {
    //       name: "杨过",
    //     },
    //   }
    // );
    // await userInfo.destroy({
    //   where: {
    //     name: "洪七公",
    //   },
    // });
    // await userInfo.bulkCreate([
    //   {
    //     name: "东邪黄药师",
    //   },
    //   {
    //     name: "中神通王重阳",
    //   },
    // ]);
    // const user = await userInfo.findAll({
    //   order: ["createdAt"],
    // });
    const user = await userInfo.findAll({
      order: [["createdAt", "DESC"]],
    });
    console.log(JSON.stringify(user, null, 2));
    // console.log(user);
  } catch (error) {
    console.warn(error);
  }
}
async function connect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // const hongqig = await userInfo.build({ name: "洪七公" });
    // hongqig.set({
    //   name: "老乞丐",
    // });
    // await hongqig.update({
    //   name: "丐帮帮主洪七公",
    // });
    // await hongqig.save();
    // console.log(hongqig.toJSON());
    // await hongqig.destroy();
    console.log("Connection has been established successfully.");
    findOption();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
connect();
// db.execute = async (sql) => {
//   await db.startTransaction();
//   let res;
//   if (typeof sql === "string") {
//     res = await db.executeTransaction(sql);
//   } else {
//     sql.forEach(async (item) => {
//       res = await db.executeTransaction(item);
//     });
//   }
//   await db.stopTransaction();
//   return res;
// };

module.exports = { db: sequelize, userInfo };
