"use strict";

var _http = require("http");
var _app = _interopRequireDefault(require("./app"));
var _sequelize = require("./database/sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const port = process && process.env && process.env.PORT || "8080" || 3333;
(async () => {
  // await sequelize.sync({force: true});
  await _sequelize.sequelize.sync({
    force: false
  });
  (0, _http.createServer)(_app.default).listen(port, () => console.log(`Server listen on port ${port}`));
})();