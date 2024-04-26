import compression from "compression";
import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import sharedsession from "express-socket.io-session";
import fs from "fs";
import { createServer } from "http";
import mongoose from "mongoose";
import multer from "multer";
import passport from "passport";
import { Strategy as googleS } from "passport-google-oauth20";
import { Strategy as kakaoS } from "passport-kakao";
import { Strategy as localS } from "passport-local";
import { Strategy as naverS } from "passport-naver-v2";
import redis from "redis";
import sirv from "sirv";
import { Server } from "socket.io";

dotenv.config({ path: "./.env", encoding: "UTF-8" });
const app = express({ xPoweredBy: false });
app.set("view engine", "ejs");
app.set("views", "src/views");
const httpServer = createServer(app);

const schemas = {};
const redisClient = redis.createClient({ url: process.env.REDIS_URI });
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error(err);
});
redisClient.connect();
mongoose.connect(process.env.MONGO_URI, {
  autoIndex: true,
  maxPoolSize: 200,
  minPoolSize: 50,
});

let models = fs.readdirSync("./src/models", { encoding: "utf-8" });
for (let key of models)
  schemas[key.replace(".js", "")] = mongoose.model(
    key.replace(".js", ""),
    (await import(`./src/models/${key}`)).default
  );
const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    maxAge: parseInt(process.env.MAX_AGE),
    secure: false,
  },
  store: new connectRedis({
    client: redisClient,
    prefix: "ssid:",
    ttl: 360000,
    scanCount: 100,
  }),
});
app.use(sessionMiddleware);
app.use(process.env.API_BASE, express.json());
app.use(process.env.API_BASE, express.raw());
app.use(process.env.API_BASE, express.text());
app.use(process.env.API_BASE, express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["get", "post", "put", "delete"],
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["Content-Type"],
    maxAge: parseInt(process.env.MAX_AGE),
  })
);
app.use(
  "/static",
  express.static("static", {
    dotfiles: "ignore",
    extensions: [],
    fallthrough: true,
    immutable: false,
    maxAge: parseInt(process.env.MAX_AGE),
    index: false,
    redirect: false,
  })
);

app.use((req, res, next) => {
  req.mongo = schemas;
  next();
});
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new localS(
    {
      usernameField: "id",
      passwordField: "pw",
      passReqToCallback: true,
    },
    async (req, id, pw, done) => {
      try {
        // 로그인 관련 기능
        done(null, undefined /** 유저 정보 */);
      } catch (e) {
        done(e);
      }
    }
  )
);
passport.use(
  "kakao",
  new kakaoS(
    {
      clientID: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK,
      passReqToCallback: true,
    },
    async (req, access, refresh, profile, done) => {
      try {
        // 로그인 관련 기능
        done(null, undefined /** 유저 정보 */);
      } catch (e) {
        done(e);
      }
    }
  )
);
passport.use(
  "naver",
  new naverS(
    {
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: process.env.NAVER_CALLBACK,
      passReqToCallback: true,
    },
    async (req, access, refresh, profile, done) => {
      try {
        // 로그인 관련 기능
        done(null, undefined /** 유저 정보 */);
      } catch (e) {
        done(e);
      }
    }
  )
);
passport.use(
  "google",
  new googleS(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      passReqToCallback: true,
    },
    async (req, access, refresh, profile, done) => {
      try {
        // 로그인 관련 기능
        done(null, undefined /** 유저 정보 */);
      } catch (e) {
        done(e);
      }
    }
  )
);

passport.serializeUser((req, data, done) => {
  // 처음 로그인시
  done(null, data);
});
passport.deserializeUser((req, data, done) => {
  // 로그인 이후 갱신시
  done(null, data);
});

app.post(
  process.env.LOCAL_CALLBACK,
  passport.authenticate("local", {
    successRedirect: process.env.HOME,
    failureRedirect: process.env.LOGIN,
  })
);
app.get(
  process.env.NAVER_CALLBACK,
  passport.authenticate("naver", {
    successRedirect: process.env.HOME,
    failureRedirect: process.env.LOGIN,
  })
);
app.get(
  process.env.KAKAO_CALLBACK,
  passport.authenticate("kakao", {
    successRedirect: process.env.HOME,
    failureRedirect: process.env.LOGIN,
  })
);
app.get(
  process.env.GOOGLE_CALLBACK,
  passport.authenticate("google", {
    successRedirect: process.env.HOME,
    failureRedirect: process.env.LOGIN,
    scope: ["profile", "email"],
  })
);

const imagesUploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      let now = new Date();
      if (
        !fs.existsSync(
          `static/images/${now.getFullYear()}/${
            now.getMonth() + 1
          }/${now.getDate()}`
        )
      )
        fs.mkdirSync(
          `static/images/${now.getFullYear()}/${
            now.getMonth() + 1
          }/${now.getDate()}`,
          { recursive: true }
        );
      done(
        null,
        `static/images/${now.getFullYear()}/${
          now.getMonth() + 1
        }/${now.getDate()}`
      );
    },
    filename: (req, file, done) => {
      done(
        null,
        btoa(
          `${file.originalname}${
            process.env.COOKIE_SECRET
          }${new Date().toJSON()}`
        ).slice(0, 50) +
          file.originalname.slice(file.originalname.lastIndexOf("."))
      );
    },
  }),
});
const videosUploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      let now = new Date();
      if (
        !fs.existsSync(
          `static/videos/${now.getFullYear()}/${
            now.getMonth() + 1
          }/${now.getDate()}`
        )
      )
        fs.mkdirSync(
          `static/videos/${now.getFullYear()}/${
            now.getMonth() + 1
          }/${now.getDate()}`,
          { recursive: true }
        );
      done(
        null,
        `static/videos/${now.getFullYear()}/${
          now.getMonth() + 1
        }/${now.getDate()}`
      );
    },
    filename: (req, file, done) => {
      done(
        null,
        btoa(
          `${file.originalname}${
            process.env.COOKIE_SECRET
          }${new Date().toJSON()}`
        ).slice(0, 50) +
          file.originalname.slice(file.originalname.lastIndexOf("."))
      );
    },
  }),
});
app.post(
  process.env.API_BASE + `/upload/images`,
  imagesUploader.array("images", 50),
  (req, res, next) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    next();
  },
  async (req, res, next) => {
    try {
      const mediapath = req.files
        .map((file) => `\\${file.path}`) // 각 경로 앞에 '/' 추가
        .join(";"); // 구분자로 연결      console.log(mediapath);
      res.status(200).json({
        success: true,
        message: "이미지 및 상품 정보 업로드 완료",
        mediapath: mediapath,
      });
    } catch (error) {
      console.error("이미지 및 상품 정보 처리 중 오류 발생:", error);
      res.status(500).json({
        success: false,
        error: "이미지 및 상품 정보 처리 중 오류 발생",
      });
    }
  }
);
app.post(
  process.env.API_BASE + `/upload/videos`,
  videosUploader.array("videos", 10),
  (req, res, next) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    next();
  },
  async (req, res, next) => {
    try {
      const mediapath = req.files.map((file) => file.path).join(";"); // 경로를 구분자로 연결하여 하나의 문자열로 만듦
      res.status(200).json({
        success: true,
        message: "이미지 및 상품 정보 업로드 완료",
        mediapath: mediapath,
      });
    } catch (error) {
      console.error("이미지 및 상품 정보 처리 중 오류 발생:", error);
      res.status(500).json({
        success: false,
        error: "이미지 및 상품 정보 처리 중 오류 발생",
      });
    }
  }
);

const templateBuild =
  process.env.TYPE == "dev"
    ? undefined
    : fs.readFileSync("./dist/client/index.html", { encoding: "utf-8" });
const ssrManifest =
  process.env.TYPE == "dev"
    ? undefined
    : fs.readFileSync("./dist/client/.vite/ssr-manifest.json", {
        encoding: "utf-8",
      });
const renderBuild =
  process.env.TYPE == "dev"
    ? undefined
    : (await import("./dist/server/index-server.js")).render;
const vite =
  process.env.TYPE != "dev"
    ? undefined
    : await (
        await import("vite")
      ).createServer({
        server: {
          middlewareMode: true,
          watch: {
            usePolling: true,
            interval: 100,
          },
        },
        appType: "custom",
        base: process.env.APP_BASE,
      });

if (process.env.TYPE == "dev") {
  app.use(process.env.APP_BASE, vite.middlewares);
} else {
  app.use(compression());
  app.use(sirv("./dist/client", { extensions: [] }));
}

app.use(process.env.APP_BASE, async (req, res, next) => {
  try {
    const url = req.originalUrl;
    let template =
      process.env.TYPE == "dev"
        ? await vite.transformIndexHtml(
            url,
            fs.readFileSync("./index.html", { encoding: "utf-8" })
          )
        : templateBuild;

    let render =
      process.env.TYPE == "dev"
        ? (await vite.ssrLoadModule("./src/index-server.jsx")).render
        : renderBuild;
    res
      .status(200)
      .set({ "Content-Type": "text/html" })
      .send(
        template.replace(
          process.env.CONTAINER_HOLDER,
          (await render(url, ssrManifest)).html
        )
      );
  } catch (e) {
    next(new Error(e));
  }
});

let postLogics = fs.readdirSync("./src/logic/post", { encoding: "utf-8" });
let getLogics = fs.readdirSync("./src/logic/get", { encoding: "utf-8" });
for (let key of postLogics) {
  app.post(
    process.env.API_BASE + `/${key.replace(".js", "")}`,
    (await import(`./src/logic/post/${key}`)).default
  );
}
for (let key of getLogics) {
  app.get(
    process.env.API_BASE + `/${key.replace(".js", "")}`,
    (await import(`./src/logic/get/${key}`)).default
  );
}

app.use((req, res, next) => {
  res.redirect(process.env.APP_BASE);
});

app.use((err, req, res, next) => {
  if (err.message == "react") {
    setTimeout(() => {
      res.redirect(process.env.APP_BASE);
    }, 100);
  } else {
    // res.render("error404");
    res.send(err.stack);
  }
});

const io = new Server(httpServer, {
  cors: {
    origin: `*`,
    methods: ["get", "post"],
  },
});
io.use(
  sharedsession(sessionMiddleware, {
    autoSave: true,
  })
);
httpServer.listen(process.env.CHAT, () => {});
io.on("connection", (socket) => {
  socket.on("join_room", (room) => {
    socket.join(room);
  });
  // 축구
  socket.on("s_chat", (data) => {
    const { room, user, chat } = data;
    if (room && user && chat) {
      io.to(room).emit("s_chat", {
        user: user,
        room: room,
        message: chat,
        sender: socket.id,
      });
    }
  });
  // 축구
  // 야구
  socket.on("b_chat", (data) => {
    const { room, user, chat } = data;
    if (room && user && chat) {
      io.to(room).emit("b_chat", {
        user: user,
        room: room,
        message: chat,
        sender: socket.id,
      });
    }
  });
  // 야구
  // 롤
  socket.on("l_chat", (data) => {
    const { room, user, chat } = data;
    if (room && user && chat) {
      io.to(room).emit("l_chat", {
        user: user,
        room: room,
        message: chat,
        sender: socket.id,
      });
    }
  });
  // 롤
  // 사회
  socket.on("c_chat", (data) => {
    const { room, user, chat } = data;
    if (room && user && chat) {
      io.to(room).emit("c_chat", {
        user: user,
        room: room,
        message: chat,
        sender: socket.id,
      });
    }
  });
  // 사회

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("error", (err) => {
    console.error(err);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Port ${process.env.PORT} server open!`);
});
