"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _strongErrorHandler = _interopRequireDefault(require("strong-error-handler"));
var _bodyParser = require("body-parser");
var _cors = _interopRequireDefault(require("cors"));
var _user = _interopRequireDefault(require("./routes/users/user.routes"));
var _wallet = _interopRequireDefault(require("./routes/wallets/wallet.routes"));
require("./config");
var _posts = _interopRequireDefault(require("./routes/posts/posts.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
require("dotenv").config({
  path: (process && process.env && process.env.NODE_ENV || undefined) === "test" ? "./.env.test" : "./.env"
});
class App {
  constructor() {
    this.app = (0, _express.default)();
    this.middleware();
    this.routes();
  }
  middleware() {
    this.app.use((0, _cors.default)({
      origin: ["*"]
    }));
    this.app.use((0, _bodyParser.json)());
    this.app.use((0, _bodyParser.urlencoded)({
      extended: false
    }));
    this.app.use((0, _strongErrorHandler.default)({
      debug: true
    }));
  }
  routes() {
    this.app.use(_user.default);
    this.app.use(_wallet.default);
    this.app.use(_posts.default);
    this.app.get("/healthz", (req, res) => {
      res.json({
        interflowAuth: true
      });
    });
  }
}
var _default = new App().app;
exports.default = _default;