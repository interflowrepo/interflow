"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.account = void 0;
var _sequelizeTypescript = require("sequelize-typescript");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
let account = (_dec = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec2 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec3 = (0, _sequelizeTypescript.AllowNull)(true), _dec4 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.DATE), _dec5 = (0, _sequelizeTypescript.AllowNull)(true), _dec6 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.DATE), _dec7 = (0, _sequelizeTypescript.AllowNull)(true), _dec8 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.DATE), _dec9 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), (0, _sequelizeTypescript.Table)(_class = (_class2 = class account extends _sequelizeTypescript.Model {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "address", _descriptor, this);
    _initializerDefineProperty(this, "type", _descriptor2, this);
    _initializerDefineProperty(this, "created_at", _descriptor3, this);
    _initializerDefineProperty(this, "updated_at", _descriptor4, this);
    _initializerDefineProperty(this, "deleted_at", _descriptor5, this);
    _initializerDefineProperty(this, "interflow_user_id", _descriptor6, this);
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "address", [_sequelizeTypescript.PrimaryKey, _dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec3, _dec4, _sequelizeTypescript.CreatedAt], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec5, _dec6, _sequelizeTypescript.UpdatedAt], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "deleted_at", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "interflow_user_id", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.account = account;