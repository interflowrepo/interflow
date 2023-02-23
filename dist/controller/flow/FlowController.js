"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _FlowService = _interopRequireDefault(require("app/services/flow/FlowService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class FlowController {
  async getNftsCollection(req, res) {
    const {
      id
    } = req.params;
    try {
      const nfts = await _FlowService.default.getNftCollectionFromAccount(id);
      return res.json(nfts);
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  }
}
var _default = new FlowController();
exports.default = _default;