"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;
var _sequelizeTypescript = require("sequelize-typescript");
var _User = require("../models/users/User");
var _Account = require("../models/Wallet/Account");
var _Post = require("../models/posts/Post");
const dbDialect = process && process.env && process.env.DB_DIALECT || "postgres";
const db = process && process.env && process.env.DB || undefined;
const dbUser = process && process.env && process.env.DB_USER || "mzvohdma";
const dbPassword = process && process.env && process.env.DB_PASSWORD || "IKI9Z36GsXGVBVXxhtxcnJc5f4FsTPxj";
const dbHost = process && process.env && process.env.DB_HOST || "trumpet.db.elephantsql.com";
const dbPort = parseInt(process && process.env && process.env.DB_PORT || "5432");
const sequelize = new _sequelizeTypescript.Sequelize(db, dbUser, dbPassword, {
  dialect: dbDialect,
  host: dbHost,
  port: dbPort,
  models: [_User.User, _Account.account, _Post.Post],
  repositoryMode: true,
  dialectOptions: {
    ssl: (process && process.env && process.env.DB_ENABLE_SSL || "false") == 'true' && {
      require: true,
      rejectUnauthorized: false
    }
  }
});
exports.sequelize = sequelize;