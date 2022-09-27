const compose = require("koa-compose");
const { resolve } = require("path");
const glob = require("glob");

registerRouter = () => {
  let routes = [];
  glob
    .sync(resolve(__dirname, "./", "**/*.js"))
    .filter((pt) => !pt.includes("index.js"))
    .map((router) => {
      routes.push(require(router).routes());
      routes.push(require(router).allowedMethods());
    });
  return compose(routes);
};

module.exports = registerRouter;
