"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _Post = require("../posts/Post");
var _sequelizeTypescript = require("sequelize-typescript");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
let User = (_dec = (0, _sequelizeTypescript.Default)(_sequelizeTypescript.DataType.UUIDV4), _dec2 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec3 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec4 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec5 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec6 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec7 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec8 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec9 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.INTEGER), _dec10 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec11 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec12 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.ARRAY(_sequelizeTypescript.DataType.STRING)), _dec13 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.ARRAY(_sequelizeTypescript.DataType.STRING)), _dec14 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.ARRAY(_sequelizeTypescript.DataType.STRING)), _dec15 = (0, _sequelizeTypescript.HasMany)(() => _Post.Post), (0, _sequelizeTypescript.Table)(_class = (_class2 = class User extends _sequelizeTypescript.Model {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "id", _descriptor, this);
    _initializerDefineProperty(this, "authId", _descriptor2, this);
    _initializerDefineProperty(this, "nickname", _descriptor3, this);
    _initializerDefineProperty(this, "email", _descriptor4, this);
    _initializerDefineProperty(this, "interflowAddress", _descriptor5, this);
    _initializerDefineProperty(this, "bloctoAddress", _descriptor6, this);
    _initializerDefineProperty(this, "dapperAddress", _descriptor7, this);
    _initializerDefineProperty(this, "nftLength", _descriptor8, this);
    _initializerDefineProperty(this, "bgImage", _descriptor9, this);
    _initializerDefineProperty(this, "pfpImage", _descriptor10, this);
    _initializerDefineProperty(this, "followers", _descriptor11, this);
    _initializerDefineProperty(this, "following", _descriptor12, this);
    _initializerDefineProperty(this, "nftCollections", _descriptor13, this);
    _initializerDefineProperty(this, "userPosts", _descriptor14, this);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec, _sequelizeTypescript.PrimaryKey, _dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "authId", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nickname", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "email", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "interflowAddress", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "bloctoAddress", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "dapperAddress", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "nftLength", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "bgImage", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "pfpImage", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "followers", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "following", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "nftCollections", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "userPosts", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.User = User;