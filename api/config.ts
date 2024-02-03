import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, "public"),
  mysql: {
    host: "localhost",
    database: "coffeeshop",
    user: "root",
    password: "1qaz@WSX29",
  },
};

export default config;
