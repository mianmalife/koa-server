const Router = require("koa-router");
const router = new Router();
const { userInfo } = require("../libs/db");

router.get("/", async (ctx) => {
  const users = await userInfo.findAll();
  console.log(JSON.stringify(users, null, 2), "111");
  const stringify = JSON.stringify(users, null, 2);
  console.log(JSON.parse(stringify));
  const parse = JSON.parse(stringify);

  await ctx.render("index", { title: parse[1].firstName });
});
router.get("/user/:id", (ctx) => {
  console.log(ctx.db);
  ctx.body = `Welcome ${ctx.params.id}`;
});

module.exports = router;
