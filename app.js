const staticCache = require("koa-static-cache");
const convert = require("koa-convert");
const views = require("koa-views");
const registerRouter = require("./router");
const body = require("koa-better-body");
const session = require("koa-session");
const Koa = require("koa");
const app = new Koa();
const config = require("./config");
const errorHandle = require("./libs/error");
const logger = require("./libs/log");

app.listen(config.port, () => {
  console.log("server is running");
});

app.keys = ["this is koa-session demo in koa", "dsadasdsa", 22321];
const CONFIG = {
  key: "koaTest.sess" /** (string) cookie key (default is koa.sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true /** (boolean) automatically commit headers (default true) */,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: false /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
  secure: false /** (boolean) secure cookie*/,
  sameSite:
    null /** (string) session cookie sameSite options (default null, don't set it) */,
};

app.use(session(CONFIG, app));

app.use(async (ctx, next) => {
  // ignore favicon
  if (ctx.path === "/favicon.ico") return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + " views";
  await next();
});

errorHandle(app);
logger(app);

const { db } = require("./libs/db");

app.use(async (ctx, next) => {
  ctx.db = db;
  await next();
});

app.use(
  convert(
    body({
      uploadDir: config.uploadDir,
    })
  )
);

const render = views(config.templateDir, { map: { html: "ejs" } });

app.use(render);

app.use(registerRouter());

app.use(staticCache(config.staticDir));
