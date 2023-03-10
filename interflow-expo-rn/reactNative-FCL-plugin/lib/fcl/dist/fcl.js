'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _regeneratorRuntime = require('@babel/runtime/helpers/regeneratorRuntime');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var config = require('@onflow/config');
var sdk = require('@onflow/sdk');
var utilLogger = require('@onflow/util-logger');
var utilInvariant = require('@onflow/util-invariant');
var _typeof = require('@babel/runtime/helpers/typeof');
var t$1 = require('@onflow/types');
var fetchTransport = require('node-fetch');
var utilAddress = require('@onflow/util-address');
var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var utilActor = require('@onflow/util-actor');
var rlp = require('@onflow/rlp');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var utilUid = require('@onflow/util-uid');
var require$$0 = require('buffer');
var utilTemplate = require('@onflow/util-template');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var sdk__namespace = /*#__PURE__*/_interopNamespace(sdk);
var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var t__namespace = /*#__PURE__*/_interopNamespace(t$1);
var fetchTransport__default = /*#__PURE__*/_interopDefaultLegacy(fetchTransport);
var _createForOfIteratorHelper__default = /*#__PURE__*/_interopDefaultLegacy(_createForOfIteratorHelper);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);
var rlp__namespace = /*#__PURE__*/_interopNamespace(rlp);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

function getChainIdFromAccessNode() {
  return _getChainIdFromAccessNode.apply(this, arguments);
}
/**
 * Sets the default chain id to the chain id of the access node
 * 
 * @returns {string} The chain id of the access node
 * 
 * @example
 * // returns "testnet"
 * setChainIdDefault()
 */
function _getChainIdFromAccessNode() {
  _getChainIdFromAccessNode = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee() {
    var response;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return sdk__namespace.send([sdk__namespace.getNetworkParameters()]).then(sdk__namespace.decode);
        case 2:
          response = _context.sent;
          return _context.abrupt("return", response.chainId);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getChainIdFromAccessNode.apply(this, arguments);
}
function setChainIdDefault() {
  return _setChainIdDefault.apply(this, arguments);
}

/**
 * Gets the chain ID if its set, otherwise gets the chain ID from the access node
 * 
 * @returns {string} The chain ID of the access node
 * 
 * @throws {Error} If the chain ID is not found
 * 
 * @example
 * // returns "testnet"
 * getChainId()
 */
function _setChainIdDefault() {
  _setChainIdDefault = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2() {
    var network;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getChainIdFromAccessNode();
        case 2:
          network = _context2.sent;
          config.config.put("flow.network.default", network);
          return _context2.abrupt("return", network);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _setChainIdDefault.apply(this, arguments);
}
function getChainId() {
  return _getChainId.apply(this, arguments);
}
function _getChainId() {
  _getChainId = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee3() {
    var network;
    return _regeneratorRuntime__default["default"]().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return config.config.get("flow.network.default");
        case 2:
          network = _context3.sent;
          if (network) {
            _context3.next = 19;
            break;
          }
          _context3.next = 6;
          return setChainIdDefault();
        case 6:
          network = _context3.sent;
          if (network) {
            _context3.next = 19;
            break;
          }
          _context3.next = 10;
          return config.config.get("flow.network");
        case 10:
          network = _context3.sent;
          if (!network) {
            _context3.next = 15;
            break;
          }
          utilLogger.log.deprecate({
            pkg: "FCL",
            subject: 'Using the "flow.network" configuration key for specifying the flow network',
            message: "Configuring flow.network is no longer required",
            transition: "https://github.com/onflow/flow-js-sdk/blob/master/packages/fcl/TRANSITIONS.md#0002-deprecate-flow.network-config-key"
          });
          _context3.next = 19;
          break;
        case 15:
          _context3.next = 17;
          return config.config.get("env");
        case 17:
          network = _context3.sent;
          if (network) utilLogger.log.deprecate({
            pkg: "FCL",
            subject: 'Using the "env" configuration key for specifying the flow network',
            message: "Configuring to specify flow network is no longer required",
            transition: "https://github.com/onflow/flow-js-sdk/blob/master/packages/fcl/TRANSITIONS.md#0001-deprecate-env-config-key"
          });
        case 19:
          utilInvariant.invariant(network, "Error getting chainId from access node. Please configure flow.network instead");
          return _context3.abrupt("return", network);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getChainId.apply(this, arguments);
}

var isServerSide = function isServerSide() {
  return typeof window === "undefined";
};
var SESSION_STORAGE = {
  can: !isServerSide(),
  // get: async key => JSON.parse(sessionStorage.getItem(key)),
  // put: async (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
  get: function () {
    var _get = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(key) {
      return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", console.log('get called', key));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function get(_x) {
      return _get.apply(this, arguments);
    }
    return get;
  }(),
  put: function () {
    var _put = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(key, value) {
      return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", console.log('put called', key, value));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function put(_x2, _x3) {
      return _put.apply(this, arguments);
    }
    return put;
  }()
};
config.config({
  "discovery.wallet.method.default": "IFRAME/RPC",
  "fcl.storage.default": SESSION_STORAGE
});

// this is an async function but we can't await bc it's run at top level.
// NOT guaranteed that flow.network.default is set after this call (or at startup)
setChainIdDefault();
function configLens(_x4) {
  return _configLens.apply(this, arguments);
}
function _configLens() {
  _configLens = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee3(regex) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = Object;
          _context3.t1 = Object;
          _context3.next = 4;
          return config.config().where(regex);
        case 4:
          _context3.t2 = _context3.sent;
          _context3.t3 = _context3.t1.entries.call(_context3.t1, _context3.t2).map(function (_ref) {
            var _ref2 = _slicedToArray__default["default"](_ref, 2),
              key = _ref2[0],
              value = _ref2[1];
            return [key.replace(regex, ""), value];
          });
          return _context3.abrupt("return", _context3.t0.fromEntries.call(_context3.t0, _context3.t3));
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _configLens.apply(this, arguments);
}

var VERSION = "1.4.0-alpha.1" ;

var is = function is(type) {
  return function (d) {
    return _typeof__default["default"](d) === type;
  };
};
var isRequired = function isRequired(d) {
  return d != null;
};
var isObject = is("object");
var isString = is("string");
var isFunc = is("function");
var isNumber = is("number");

function normalizeArgs(ax) {
  if (isFunc(ax)) return ax(sdk__namespace.arg, t__namespace);
  return [];
}

function httpDocumentResolver(_x) {
  return _httpDocumentResolver.apply(this, arguments);
}
function _httpDocumentResolver() {
  _httpDocumentResolver = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(_ref) {
    var url, res, document;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          url = _ref.url;
          utilInvariant.invariant(typeof url !== "undefined", "retrieve({ url }) -- url must be defined");
          _context.prev = 2;
          _context.next = 5;
          return fetchTransport__default["default"](url);
        case 5:
          res = _context.sent;
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          throw new Error("httpDocumentResolver Error: Failed to retrieve document.");
        case 11:
          if (!res.ok) {
            _context.next = 17;
            break;
          }
          _context.next = 14;
          return res.json();
        case 14:
          _context.t1 = _context.sent;
          _context.next = 18;
          break;
        case 17:
          _context.t1 = null;
        case 18:
          document = _context.t1;
          return _context.abrupt("return", document);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 8]]);
  }));
  return _httpDocumentResolver.apply(this, arguments);
}
var DOCUMENT_RESOLVERS = new Map([["http", httpDocumentResolver], ["https", httpDocumentResolver]]);
function retrieve(_x2) {
  return _retrieve.apply(this, arguments);
}
function _retrieve() {
  _retrieve = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(_ref2) {
    var url, documentResolversFromConfig, urlParts, protocol, resolver, document;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          url = _ref2.url;
          utilInvariant.invariant(typeof url !== "undefined", "retrieve({ url }) -- url must be defined");
          utilInvariant.invariant(typeof url === "string", "retrieve({ url }) -- url must be a string");
          _context2.next = 5;
          return config.config().where(/^document\.resolver\./);
        case 5:
          documentResolversFromConfig = _context2.sent;
          Object.keys(documentResolversFromConfig).map(function (key) {
            var resolverFromConfig = documentResolversFromConfig[key];
            var resolverProtocol = key.replace(/^document\.resolver\./, "");
            DOCUMENT_RESOLVERS.set(resolverProtocol, resolverFromConfig);
          });
          urlParts = /^(.*):\/\/([A-Za-z0-9\-\.]+)(:[0-9]+)?(.*)$/.exec(url);
          utilInvariant.invariant(urlParts, "Failed to parse URL");
          protocol = urlParts[1];
          utilInvariant.invariant(urlParts, "Failed to parse URL protocol");
          resolver = DOCUMENT_RESOLVERS.get(protocol);
          utilInvariant.invariant(resolver, "No resolver found for protcol=".concat(protocol));
          _context2.next = 15;
          return resolver({
            url: url
          });
        case 15:
          document = _context2.sent;
          return _context2.abrupt("return", document);
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _retrieve.apply(this, arguments);
}

function normalizeInteractionTemplate(template) {
  if (template == null) return null;
  switch (template["f_version"]) {
    case "1.0.0":
      return template;
    default:
      throw new Error("normalizeInteractionTemplate Error: Invalid InteractionTemplate");
  }
}

function deriveCadenceByNetwork(_ref) {
  var _template, _template$data;
  var network = _ref.network,
    template = _ref.template;
  sdk.invariant(network != undefined, "deriveCadenceByNetwork({ network }) -- network must be defined");
  sdk.invariant(typeof network === "string", "deriveCadenceByNetwork({ network }) -- network must be a string");
  sdk.invariant(template != undefined, "generateDependencyPin({ template }) -- template must be defined");
  sdk.invariant(_typeof__default["default"](template) === "object", "generateDependencyPin({ template }) -- template must be an object");
  sdk.invariant(template.f_type === "InteractionTemplate", "generateDependencyPin({ template }) -- template must be an InteractionTemplate");
  template = normalizeInteractionTemplate(template);
  switch (template.f_version) {
    case "1.0.0":
      var networkDependencies = Object.keys((_template = template) === null || _template === void 0 ? void 0 : (_template$data = _template.data) === null || _template$data === void 0 ? void 0 : _template$data.dependencies).map(function (dependencyPlaceholder) {
        var _template2, _template2$data, _template2$data$depen;
        var dependencyNetworkContracts = Object.values((_template2 = template) === null || _template2 === void 0 ? void 0 : (_template2$data = _template2.data) === null || _template2$data === void 0 ? void 0 : (_template2$data$depen = _template2$data.dependencies) === null || _template2$data$depen === void 0 ? void 0 : _template2$data$depen[dependencyPlaceholder]);
        sdk.invariant(dependencyNetworkContracts, "deriveCadenceByNetwork -- Could not find contracts for dependency placeholder: ".concat(dependencyPlaceholder));
        sdk.invariant(dependencyNetworkContracts.length === 0, "deriveCadenceByNetwork -- Could not find contracts for dependency placeholder: ".concat(dependencyPlaceholder));
        var dependencyContract = dependencyNetworkContracts[0];
        var dependencyContractForNetwork = dependencyContract === null || dependencyContract === void 0 ? void 0 : dependencyContract[network];
        sdk.invariant(dependencyContractForNetwork, "deriveCadenceByNetwork -- Could not find ".concat(network, " network information for dependency: ").concat(dependencyPlaceholder));
        return [dependencyPlaceholder, dependencyContractForNetwork.address];
      });
      return networkDependencies.reduce(function (cadence, _ref2) {
        var _ref3 = _slicedToArray__default["default"](_ref2, 2),
          placeholder = _ref3[0],
          address = _ref3[1];
        var regex = new RegExp("(\\b" + placeholder + "\\b)", "g");
        return cadence.replace(regex, address);
      }, template.data.cadence);
    default:
      throw new Error("deriveCadenceByNetwork Error: Unsupported template version");
  }
}

function isAndroid() {
  return typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);
}
function isSmallIOS() {
  return typeof navigator !== "undefined" && /iPhone|iPod/.test(navigator.userAgent);
}
function isLargeIOS() {
  return typeof navigator !== "undefined" && /iPad/.test(navigator.userAgent);
}
function isIOS() {
  return isSmallIOS() || isLargeIOS();
}
function isMobile() {
  return isAndroid() || isIOS();
}

function deriveDependencies(_x) {
  return _deriveDependencies.apply(this, arguments);
}
function _deriveDependencies() {
  _deriveDependencies = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(_ref) {
    var _template$data;
    var template, network, derivedDependencies, dependencyPlaceholderKeys, _i, _dependencyPlaceholde, _template$data2, dependencyPlaceholderKey, dependencyPlaceholder, dependencyPlaceholderContractsKeys, dependencyPlaceholderContract, dependency;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          template = _ref.template;
          _context.next = 3;
          return getChainId();
        case 3:
          network = _context.sent;
          utilInvariant.invariant(network, "FCL configureDependencies Error: Missing configuration value for 'flow.network'");
          derivedDependencies = {};
          _context.t0 = template["f_version"];
          _context.next = _context.t0 === "1.0.0" ? 9 : 12;
          break;
        case 9:
          dependencyPlaceholderKeys = Object.keys(template === null || template === void 0 ? void 0 : (_template$data = template.data) === null || _template$data === void 0 ? void 0 : _template$data.dependencies);
          for (_i = 0, _dependencyPlaceholde = dependencyPlaceholderKeys; _i < _dependencyPlaceholde.length; _i++) {
            dependencyPlaceholderKey = _dependencyPlaceholde[_i];
            dependencyPlaceholder = template === null || template === void 0 ? void 0 : (_template$data2 = template.data) === null || _template$data2 === void 0 ? void 0 : _template$data2.dependencies[dependencyPlaceholderKey];
            dependencyPlaceholderContractsKeys = Object.keys(dependencyPlaceholder);
            utilInvariant.invariant(dependencyPlaceholderContractsKeys.length > 0, "FCL configureDependencies Error: No contracts found in template for placeholder=".concat(dependencyPlaceholderKey));
            dependencyPlaceholderContract = dependencyPlaceholder[dependencyPlaceholderContractsKeys[0]];
            dependency = dependencyPlaceholderContract[network];
            utilInvariant.invariant(dependency, "FCL configureDependencies Error: No dependency information for placeholder=".concat(dependencyPlaceholderKey, " contract=").concat(dependencyPlaceholderContractsKeys[0], " network=").concat(network));
            utilInvariant.invariant(dependency === null || dependency === void 0 ? void 0 : dependency.address, "FCL configureDependencies Error: No address information for placeholder=".concat(dependencyPlaceholderKey, " contract=").concat(dependencyPlaceholderContractsKeys[0], " network=").concat(network));
            derivedDependencies[dependencyPlaceholderKey] = utilAddress.withPrefix(dependency === null || dependency === void 0 ? void 0 : dependency.address);
          }
          return _context.abrupt("return", derivedDependencies);
        case 12:
          throw new Error("FCL configureDependencies Error: Unsupported template version");
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _deriveDependencies.apply(this, arguments);
}

function prepTemplateOpts(_x) {
  return _prepTemplateOpts.apply(this, arguments);
}
function _prepTemplateOpts() {
  _prepTemplateOpts = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(opts) {
    var dependencies, cadence;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!isString(opts === null || opts === void 0 ? void 0 : opts.template)) {
            _context.next = 4;
            break;
          }
          _context.next = 3;
          return retrieve({
            url: opts === null || opts === void 0 ? void 0 : opts.template
          });
        case 3:
          opts.template = _context.sent;
        case 4:
          dependencies = {};
          if (!(opts !== null && opts !== void 0 && opts.template)) {
            _context.next = 10;
            break;
          }
          opts.template = normalizeInteractionTemplate(opts === null || opts === void 0 ? void 0 : opts.template);
          _context.next = 9;
          return deriveDependencies({
            template: opts.template
          });
        case 9:
          dependencies = _context.sent;
        case 10:
          _context.t0 = opts.cadence;
          if (_context.t0) {
            _context.next = 19;
            break;
          }
          _context.t1 = deriveCadenceByNetwork;
          _context.t2 = opts.template;
          _context.next = 16;
          return getChainId();
        case 16:
          _context.t3 = _context.sent;
          _context.t4 = {
            template: _context.t2,
            network: _context.t3
          };
          _context.t0 = (0, _context.t1)(_context.t4);
        case 19:
          cadence = _context.t0;
          opts.cadence = cadence;
          opts.dependencies = dependencies;
          return _context.abrupt("return", opts);
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _prepTemplateOpts.apply(this, arguments);
}

function pre(_x, _x2) {
  return _pre.apply(this, arguments);
}
function _pre() {
  _pre = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(type, opts) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // prettier-ignore
          utilInvariant.invariant(isRequired(opts), "".concat(type, "(opts) -- opts is required"));
          // prettier-ignore
          utilInvariant.invariant(isObject(opts), "".concat(type, "(opts) -- opts must be an object"));
          // prettier-ignore
          utilInvariant.invariant(!(opts.cadence && opts.template), "".concat(type, "({ template, cadence }) -- cannot pass both cadence and template"));
          // prettier-ignore
          utilInvariant.invariant(isRequired(opts.cadence || (opts === null || opts === void 0 ? void 0 : opts.template)), "".concat(type, "({ cadence }) -- cadence is required"));
          // // prettier-ignore
          utilInvariant.invariant(isString(opts.cadence) || (opts === null || opts === void 0 ? void 0 : opts.template), "".concat(type, "({ cadence }) -- cadence must be a string"));
          // prettier-ignore
          _context.t0 = utilInvariant.invariant;
          _context.t1 = opts.cadence;
          if (_context.t1) {
            _context.next = 11;
            break;
          }
          _context.next = 10;
          return sdk__namespace.config().get("flow.network");
        case 10:
          _context.t1 = _context.sent;
        case 11:
          _context.t2 = _context.t1;
          _context.t3 = "".concat(type, "(opts) -- Required value for \"flow.network\" not defined in config. See: ", "https://github.com/onflow/flow-js-sdk/blob/master/packages/fcl/src/exec/query.md#configuration");
          (0, _context.t0)(_context.t2, _context.t3);
          _context.t4 = utilInvariant.invariant;
          _context.next = 17;
          return sdk__namespace.config().get("accessNode.api");
        case 17:
          _context.t5 = _context.sent;
          _context.t6 = "".concat(type, "(opts) -- Required value for \"accessNode.api\" not defined in config. See: ", "https://github.com/onflow/flow-js-sdk/blob/master/packages/fcl/src/exec/query.md#configuration");
          (0, _context.t4)(_context.t5, _context.t6);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _pre.apply(this, arguments);
}
function preMutate(_x3) {
  return _preMutate.apply(this, arguments);
}
function _preMutate() {
  _preMutate = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(opts) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", pre("mutate", opts));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _preMutate.apply(this, arguments);
}
function preQuery(_x4) {
  return _preQuery.apply(this, arguments);
}
function _preQuery() {
  _preQuery = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee3(opts) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", pre("query", opts));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _preQuery.apply(this, arguments);
}

/** Query the Flow Blockchain
 *
 *  @arg {Object} opts         - Query Options and configuration
 *  @arg {string} opts.cadence - Cadence Script used to query Flow
 *  @arg {ArgsFn} opts.args    - Arguments passed to cadence script
 *  @arg {Object} opts.template - Interaction Template for a script
 *  @arg {number} opts.limit   - Compute Limit for Query
 *  @returns {Promise<Response>}
 *
 *  Where:
 *    @callback ArgsFn
 *    @arg {ArgFn}  arg - Argument function to define a single argument
 *    @arg {Object} t   - Cadence Types object used to define the type
 *    @returns {args[]}
 *
 *    @callback ArgFn
 *    @arg {Any}  value - the value of the argument
 *    @arg {Type} type  - the cadence type of the value
 *    @returns {arg}
 *
 *  Example:
 *    const cadence = `
 *      cadence: `
 *        pub fun main(a: Int, b: Int, c: Address): Int {
 *          log(c)
 *          return a + b
 *        }
 *    `.trim()
 *
 *    const args = (arg, t) => [
 *      arg(5, t.Int),
 *      arg(7, t.Int),
 *      arg("0xb2db43ad6bc345fec9", t.Address),
 *    ]
 *
 *    await query({ cadence, args })
 */
function query() {
  return _query.apply(this, arguments);
}
function _query() {
  _query = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2() {
    var opts,
      _args2 = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          opts = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          _context2.next = 3;
          return preQuery(opts);
        case 3:
          _context2.next = 5;
          return prepTemplateOpts(opts);
        case 5:
          opts = _context2.sent;
          return _context2.abrupt("return", sdk__namespace.config().overload(opts.dependencies || {}, /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee() {
            return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return",
                  // prettier-ignore
                  sdk__namespace.send([sdk__namespace.script(opts.cadence), sdk__namespace.args(normalizeArgs(opts.args || [])), opts.limit && typeof opts.limit === "number" && sdk__namespace.limit(opts.limit)]).then(sdk__namespace.decode));
                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }))));
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _query.apply(this, arguments);
}

function fetchServices(_x, _x2) {
  return _fetchServices.apply(this, arguments);
}
function _fetchServices() {
  _fetchServices = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(servicesURL, code) {
    var url, resp, services, _iterator, _step, service;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(servicesURL == null || code == null)) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", []);
        case 2:
          url = new URL(servicesURL);
          url.searchParams.append("code", code);
          _context.next = 6;
          return fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(function (d) {
            return d.json();
          });
        case 6:
          resp = _context.sent;
          if (!Array.isArray(resp)) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", resp);
        case 9:
          // Backwards compatibility for First-Gen Wallet Providers
          services = []; // Convert authorizations into authz services
          if (Array.isArray(resp.authorizations)) {
            _iterator = _createForOfIteratorHelper__default["default"](resp.authorizations);
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                service = _step.value;
                services.push(_objectSpread__default["default"]({
                  type: "authz",
                  keyId: resp.keyId
                }, service));
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }

          // Convert Provider info into an authn service
          if (resp.provider != null) {
            services.push(_objectSpread__default["default"]({
              type: "authn",
              id: "wallet-provider#authn"
            }, resp.provider));
          }
          return _context.abrupt("return", services);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _fetchServices.apply(this, arguments);
}

function mergeServices() {
  var sx1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var sx2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // TODO: Make this smarter
  return [].concat(_toConsumableArray__default["default"](sx1), _toConsumableArray__default["default"](sx2));
}

var SERVICE_PRAGMA = {
  f_type: "Service",
  f_vsn: "1.0.0"
};
var IDENTITY_PRAGMA = {
  f_type: "Identity",
  f_vsn: "1.0.0"
};
var USER_PRAGMA = {
  f_type: "USER",
  f_vsn: "1.0.0"
};
var POLLING_RESPONSE_PRAGMA = {
  f_type: "PollingResponse",
  f_vsn: "1.0.0"
};
var COMPOSITE_SIGNATURE_PRAGMA = {
  f_type: "CompositeSignature",
  f_vsn: "1.0.0"
};

// {
//   "f_type": "Service",
//   "f_vsn": "1.0.0",
//   "type": "authn",
//   "uid": "uniqueDedupeKey",
//   "endpoint": "https://rawr",
//   "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // wallets internal id for the user
//   "identity": {
//     "address": "0x____"
//   },
//   "provider": {
//     "address": "0x____",
//     "name": "Best Wallet",
//     "description": "The Best Wallet"
//     "icon": "https://",
//   }
// }
function normalizeAuthn(service) {
  if (service == null) return null;
  switch (service["f_vsn"]) {
    case "1.0.0":
      return service;
    default:
      return _objectSpread__default["default"](_objectSpread__default["default"]({}, SERVICE_PRAGMA), {}, {
        type: service.type,
        uid: service.id,
        endpoint: service.authn,
        id: service.pid,
        provider: {
          address: utilAddress.withPrefix(service.addr),
          name: service.name,
          icon: service.icon
        }
      });
  }
}

// {
//   "f_type": "service",
//   "f_vsn": "1.0.0",
//   "type": "authz",
//   "uid": "uniqueDedupeKey",
//   "endpoint": "https://rawr",
//   "method": "HTTP/POST", // HTTP/POST | IFRAME/RPC | HTTP/RPC
//   "identity": {
//      "address": "0x______",
//      "keyId": 0,
//   },
//   "data": {}, // included in body of authz request
//   "params": {}, // included as query params on endpoint url
// }
function normalizeAuthz(service) {
  if (service == null) return null;
  switch (service["f_vsn"]) {
    case "1.0.0":
      return service;
    default:
      return _objectSpread__default["default"](_objectSpread__default["default"]({}, SERVICE_PRAGMA), {}, {
        type: service.type,
        uid: service.id,
        endpoint: service.endpoint,
        method: service.method,
        identity: _objectSpread__default["default"](_objectSpread__default["default"]({}, IDENTITY_PRAGMA), {}, {
          address: utilAddress.withPrefix(service.addr),
          keyId: service.keyId
        }),
        params: service.params,
        data: service.data
      });
  }
}

// {
//   "f_type": "service",
//   "f_vsn": "1.0.0",
//   "type": "pre-authz",
//   "uid": "uniqueDedupeKey",
//   "endpoint": "https://rawr",
//   "method": "HTTP/POST", // HTTP/POST | IFRAME/RPC | HTTP/RPC
//   "identity": {
//      "address": "0x______",
//      "keyId": 0,
//   },
//   "data": {}, // included in body of pre-authz request
//   "params": {}, // included as query params on endpoint url
// }
function normalizePreAuthz(service) {
  if (service == null) return null;
  switch (service["f_vsn"]) {
    case "1.0.0":
      return service;
    default:
      return _objectSpread__default["default"](_objectSpread__default["default"]({}, SERVICE_PRAGMA), {}, {
        type: service.type,
        uid: service.id,
        endpoint: service.endpoint,
        method: service.method,
        identity: _objectSpread__default["default"](_objectSpread__default["default"]({}, IDENTITY_PRAGMA), {}, {
          address: utilAddress.withPrefix(service.addr),
          keyId: service.keyId
        }),
        params: service.params,
        data: service.data
      });
  }
}

// {
//    "f_type": "Service",
//    "f_vsn": "1.0.0",
//    "type": "frame",
//    "endpoint": "https://rawr",
//    "data": {},   // Sent to frame when ready
//    "params": {}, // include in query params on frame
// }
function normalizeFrame(service) {
  if (service == null) return null;
  switch (service["f_vsn"]) {
    case "1.0.0":
      return service;
    default:
      return _objectSpread__default["default"](_objectSpread__default["default"]({
        old: service
      }, SERVICE_PRAGMA), {}, {
        type: "frame",
        endpoint: service.endpoint,
        params: service.params || {},
        data: service.data || {}
      });
  }
}

// {
//    "f_type": "Service",
//    "f_vsn": "1.0.0",
//    "type": "back-channel-rpc",
//    "endpoint": "https://rawr",
//    "method": "HTTP/GET", // HTTP/GET | HTTP/POST
//    "data": {},           // included in body of rpc
//    "params": {},         // included as query params on endpoint url
// }
function normalizeBackChannelRpc(service) {
  if (service == null) return null;
  switch (service["f_vsn"]) {
    case "1.0.0":
      return service;
    default:
      return _objectSpread__default["default"](_objectSpread__default["default"]({}, SERVICE_PRAGMA), {}, {
        type: "back-channel-rpc",
        endpoint: service.endpoint,
        method: service.method,
        params: service.params || {},
        data: service.data || {}
      });
  }
}

// {
//   "f_type": "Service",
//   "f_vsn": "1.0.0",
//   "type": "open-id",
//   "uid": "uniqueDedupeKey",
//   "method: "data",
//   "data": {
//      "profile": {
//        "name": "Bob",
//        "family_name": "Builder",
//        "given_name": "Robert",
//        "middle_name": "the",
//        "nickname": "Bob the Builder",
//        "perferred_username": "bob",
//        "profile": "https://www.bobthebuilder.com/",
//        "picture": "https://avatars.onflow.org/avatar/bob",
//        "gender": "...",
//        "birthday": "2001-01-18",
//        "zoneinfo": "America/Vancouver",
//        "locale": "en-us",
//        "updated_at": "1614970797388"
//      },
//      "email": {
//        "email": "bob@bob.bob",
//        "email_verified": true
//      },
//      "address": {
//        "address": "One Apple Park Way, Cupertino, CA 95014, USA"
//      },
//      "phone": {
//        "phone_number": "+1 (xxx) yyy-zzzz",
//        "phone_number_verified": true
//      },
//      "social": {
//        "twitter": "@_qvvg",
//        "twitter_verified": true
//      },
//   }
// }
function normalizeOpenId(service) {
  if (service == null) return null;
  switch (service["f_vsn"]) {
    case "1.0.0":
      return service;
    default:
      return null;
  }
}

// {
//   "f_type": "Service",
//   "f_vsn": "1.0.0",
//   "type": "user-signature",
//   "uid": "uniqueDedupeKey",
//   "endpoint": "https://rawr",
//   "method": "IFRAME/RPC", // HTTP/POST | IFRAME/RPC | HTTP/RPC
//   "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // wallets internal id for the user
//   "data": {}, // included in body of user-signature request
//   "params": {}, // included as query params on endpoint url
// }
function normalizeUserSignature(service) {
  if (service == null) return null;
  switch (service["f_vsn"]) {
    case "1.0.0":
      return service;
    default:
      throw new Error("Invalid user-signature service");
  }
}

// {
//    "f_type": "Service",
//    "f_vsn": "1.0.0",
//    type: "local-view",
//    method: "VIEW/IFRAME",
//    endpoint: "https://woot.org/authz/local",
//    data: {},
//    params: {},
// }
function normalizeLocalView(resp) {
  if (resp == null) return null;
  if (resp.method == null) {
    resp = _objectSpread__default["default"](_objectSpread__default["default"]({}, resp), {}, {
      type: "local-view",
      method: "VIEW/IFRAME"
    });
  }
  switch (resp["f_vsn"]) {
    case "1.0.0":
      return resp;
    default:
      return _objectSpread__default["default"](_objectSpread__default["default"]({}, SERVICE_PRAGMA), {}, {
        type: resp.type || "local-view",
        method: resp.method,
        endpoint: resp.endpoint,
        data: resp.data || {},
        params: resp.params || {}
      });
  }
}

// {
//   "f_type": "Service",                    // Its a service!
//   "f_vsn": "1.0.0",                       // Follows the v1.0.0 spec for the service
//   "type": "account-proof",                // the type of service it is
//   "method": "DATA",                       // Its data!
//   "uid": "awesome-wallet#account-proof",  // A unique identifier for the service
//   "data": {
//     "f_type": "account-proof",
//     "f_vsn": "1.0.0",
//     "nonce": "0A1BC2FF",                  // Nonce signed by the current account-proof (minimum 32 bytes in total, i.e 64 hex characters)
//     "address": "0xUSER",                  // The user's address (8 bytes, i.e 16 hex characters)
//     "signature": CompositeSignature,      // address (sans-prefix), keyId, signature (hex)
// }

function normalizeAccountProof(service) {
  if (service == null) return null;
  switch (service["f_vsn"]) {
    case "1.0.0":
      return service;
    default:
      throw new Error("FCL Normalizer Error: Invalid account-proof service");
  }
}

// {
//   "f_type": "Service",
//   "f_vsn": "1.0.0",
//   "type": "authn-refresh",
//   "uid": "uniqueDedupeKey",
//   "endpoint": "https://rawr",
//   "method": "HTTP/POST",  // "HTTP/POST", // HTTP/POST | IFRAME/RPC | HTTP/RPC
//   "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // wallets internal id for the user
//   "data": {}, // included in body of request
//   "params": {}, // included as query params on endpoint url
// }
function normalizeAuthnRefresh(service) {
  if (service == null) return null;
  switch (service["f_vsn"]) {
    case "1.0.0":
      return service;
    default:
      throw new Error("Invalid authn-refresh service");
  }
}

var serviceNormalizers = {
  "back-channel-rpc": normalizeBackChannelRpc,
  "pre-authz": normalizePreAuthz,
  authz: normalizeAuthz,
  authn: normalizeAuthn,
  frame: normalizeFrame,
  "open-id": normalizeOpenId,
  "user-signature": normalizeUserSignature,
  "local-view": normalizeLocalView,
  "account-proof": normalizeAccountProof,
  "authn-refresh": normalizeAuthnRefresh
};
function normalizeService(service, data) {
  try {
    var normalized = serviceNormalizers[service.type](service, data);
    return normalized;
  } catch (error) {
    console.error("Unrecognized FCL Service Type [".concat(service.type, "]"), service, error);
    return service;
  }
}

function deriveCompositeId(authn) {
  return rlp__namespace.encode([authn.provider.address || authn.provider.name || "UNSPECIFIED", authn.id]).toString("hex");
}
function normalizeData(data) {
  data.addr = data.addr ? utilAddress.withPrefix(data.addr) : null;
  data.paddr = data.paddr ? utilAddress.withPrefix(data.paddr) : null;
  return data;
}
function findService(type, services) {
  return services.find(function (d) {
    return d.type === type;
  });
}
function buildUser(_x) {
  return _buildUser.apply(this, arguments);
}
function _buildUser() {
  _buildUser = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(data) {
    var services, authn;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          data = normalizeData(data);
          _context.t0 = mergeServices;
          _context.t1 = data.services || [];
          _context.next = 5;
          return fetchServices(data.hks, data.code);
        case 5:
          _context.t2 = _context.sent;
          services = (0, _context.t0)(_context.t1, _context.t2).map(function (service) {
            return normalizeService(service, data);
          });
          authn = findService("authn", services);
          return _context.abrupt("return", _objectSpread__default["default"](_objectSpread__default["default"]({}, USER_PRAGMA), {}, {
            addr: utilAddress.withPrefix(data.addr),
            cid: deriveCompositeId(authn),
            loggedIn: true,
            services: services,
            expiresAt: data.expires
          }));
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _buildUser.apply(this, arguments);
}

function serviceOfType() {
  var services = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var type = arguments.length > 1 ? arguments[1] : undefined;
  return services.find(function (service) {
    return service.type === type;
  });
}

function serviceEndpoint(service) {
  var url = new URL(service.endpoint);
  url.searchParams.append("l6n", window.location.origin);
  if (service.params != null) {
    for (var _i = 0, _Object$entries = Object.entries(service.params || {}); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray__default["default"](_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      url.searchParams.append(key, value);
    }
  }
  return url;
}

function fetchService(service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = opts.method || "POST";
  var body = method === "GET" ? undefined : JSON.stringify(opts.data || service.data || {});
  return fetch(serviceEndpoint(service), {
    method: method,
    headers: _objectSpread__default["default"](_objectSpread__default["default"](_objectSpread__default["default"]({}, service.headers || {}), opts.headers || {}), {}, {
      "Content-Type": "application/json"
    }),
    body: body
  }).then(function (d) {
    return d.json();
  });
}

// {
//    "f_type": "PollingResponse",
//    "f_vsn": "1.0.0",
//    "status": "PENDING", // PENDING | APPROVED | DECLINED | REDIRECT
//    "reason": null,      // Reason for Declining Transaction
//    "data": null,        // Return value for APPROVED
//    "updates": BackChannelRpc,
//    "local": Frame,
// }
function normalizePollingResponse(resp) {
  var _resp$status, _resp$reason;
  if (resp == null) return null;
  switch (resp["f_vsn"]) {
    case "1.0.0":
      return resp;
    default:
      return _objectSpread__default["default"](_objectSpread__default["default"]({}, POLLING_RESPONSE_PRAGMA), {}, {
        status: (_resp$status = resp.status) !== null && _resp$status !== void 0 ? _resp$status : "APPROVED",
        reason: (_resp$reason = resp.reason) !== null && _resp$reason !== void 0 ? _resp$reason : null,
        data: resp.compositeSignature || resp.data || _objectSpread__default["default"]({}, resp) || {},
        updates: normalizeBackChannelRpc(resp.authorizationUpdates),
        local: normalizeFrame((resp.local || [])[0])
      });
  }
}

var OPTIONS = {
  "HTTP/GET": "GET",
  "HTTP/POST": "POST"
};
var serviceMethod = function serviceMethod(service) {
  utilInvariant.invariant(OPTIONS[service.method], "Invalid Service Method for type back-channel-rpc", {
    service: service
  });
  return OPTIONS[service.method];
};
function poll(_x) {
  return _poll.apply(this, arguments);
}
function _poll() {
  _poll = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(service) {
    var canContinue,
      resp,
      _args = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          canContinue = _args.length > 1 && _args[1] !== undefined ? _args[1] : function () {
            return true;
          };
          utilInvariant.invariant(service, "Missing Polling Service", {
            service: service
          });
          if (canContinue()) {
            _context.next = 4;
            break;
          }
          throw new Error("Externally Halted");
        case 4:
          _context.next = 6;
          return fetchService(service, {
            method: serviceMethod(service)
          }).then(normalizePollingResponse);
        case 6:
          resp = _context.sent;
          _context.t0 = resp.status;
          _context.next = _context.t0 === "APPROVED" ? 10 : _context.t0 === "DECLINED" ? 11 : 12;
          break;
        case 10:
          return _context.abrupt("return", resp.data);
        case 11:
          throw new Error("Declined: ".concat(resp.reason || "No reason supplied."));
        case 12:
          _context.next = 14;
          return new Promise(function (r) {
            return setTimeout(r, 500);
          });
        case 14:
          return _context.abrupt("return", poll(resp.updates, canContinue));
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _poll.apply(this, arguments);
}

var FRAME = "FCL_IFRAME";
var FRAME_STYLES = "\n  position:fixed;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n  left: 0px;\n  height: 100%;\n  width: 100vw;\n  display:block;\n  background:rgba(0,0,0,0.25);\n  z-index: 2147483647;\n  box-sizing: border-box;\n  color-scheme: light;\n";
function renderFrame(src) {
  utilInvariant.invariant(!document.getElementById(FRAME), "Attempt at triggering multiple Frames", {
    src: src
  });
  var $frame = document.createElement("iframe");
  $frame.src = src;
  $frame.id = FRAME;
  $frame.allow = "usb *; hid *";
  $frame.frameBorder = "0";
  $frame.style.cssText = FRAME_STYLES;
  document.body.append($frame);
  var unmount = function unmount() {
    if (document.getElementById(FRAME)) {
      document.getElementById(FRAME).remove();
    }
  };
  return [$frame.contentWindow, unmount];
}

var POP = "FCL_POP";
var popup = null;
var previousUrl$1 = null;
function popupWindow(url, windowName, win, w, h) {
  var y = win.top.outerHeight / 2 + win.top.screenY - h / 2;
  var x = win.top.outerWidth / 2 + win.top.screenX - w / 2;
  var popup = win.open(url, windowName, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=".concat(w, ", height=").concat(h, ", top=").concat(y, ", left=").concat(x));
  if (!popup) throw new Error("Popup failed to open (was it blocked by a popup blocker?)");
  return popup;
}
function renderPop(src) {
  var _popup;
  if (popup == null || (_popup = popup) !== null && _popup !== void 0 && _popup.closed) {
    popup = popupWindow(src, POP, window, 640, 770);
  } else if (previousUrl$1 !== src) {
    popup.location.replace(src);
    popup.focus();
  } else {
    popup.focus();
  }
  previousUrl$1 = src;
  var unmount = function unmount() {
    if (popup && !popup.closed) {
      popup.close();
    }
    popup = null;
  };
  return [popup, unmount];
}

var tab$1 = null;
var previousUrl = null;
function renderTab(src) {
  var _tab;
  if (tab$1 == null || (_tab = tab$1) !== null && _tab !== void 0 && _tab.closed) {
    tab$1 = window.open(src, "_blank");
    if (!tab$1) throw new Error("Tab failed to open (was it blocked by the browser?)");
  } else if (previousUrl !== src) {
    tab$1.location.replace(src);
    tab$1.focus();
  } else {
    tab$1.focus();
  }
  previousUrl = src;
  var unmount = function unmount() {
    if (tab$1 && !tab$1.closed) {
      tab$1.close();
    }
    tab$1 = null;
  };
  return [tab$1, unmount];
}

var VIEWS = {
  "VIEW/IFRAME": renderFrame,
  "VIEW/POP": renderPop,
  "VIEW/TAB": renderTab
};
function execLocal(_x) {
  return _execLocal.apply(this, arguments);
}
function _execLocal() {
  _execLocal = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(service) {
    var opts,
      _args = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          opts = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _context.prev = 1;
          return _context.abrupt("return", VIEWS[service.method](serviceEndpoint(service), opts));
        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](1);
          console.error("execLocal({service, opts = {}})", _context.t0, {
            service: service,
            opts: opts
          });
          throw _context.t0;
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 5]]);
  }));
  return _execLocal.apply(this, arguments);
}

function execHttpPost(_x) {
  return _execHttpPost.apply(this, arguments);
}
function _execHttpPost() {
  _execHttpPost = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(_ref) {
    var service, body, config, resp, canContinue, _yield$execLocal, _yield$execLocal2, unmount, close;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          service = _ref.service, body = _ref.body, config = _ref.config, _ref.opts;
          _context.next = 3;
          return fetchService(service, {
            data: _objectSpread__default["default"]({
              fclVersion: VERSION,
              service: {
                params: service.params,
                data: service.data,
                type: service.type
              },
              config: config
            }, body)
          }).then(normalizePollingResponse);
        case 3:
          resp = _context.sent;
          if (!(resp.status === "APPROVED")) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", resp.data);
        case 8:
          if (!(resp.status === "DECLINED")) {
            _context.next = 12;
            break;
          }
          throw new Error("Declined: ".concat(resp.reason || "No reason supplied."));
        case 12:
          if (!(resp.status === "REDIRECT")) {
            _context.next = 16;
            break;
          }
          return _context.abrupt("return", resp);
        case 16:
          if (!(resp.status === "PENDING")) {
            _context.next = 28;
            break;
          }
          canContinue = true;
          _context.next = 20;
          return execLocal(normalizeLocalView(resp.local));
        case 20:
          _yield$execLocal = _context.sent;
          _yield$execLocal2 = _slicedToArray__default["default"](_yield$execLocal, 2);
          _yield$execLocal2[0];
          unmount = _yield$execLocal2[1];
          close = function close() {
            try {
              unmount();
              canContinue = false;
            } catch (error) {
              console.error("Frame Close Error", error);
            }
          };
          return _context.abrupt("return", poll(resp.updates, function () {
            return canContinue;
          }).then(function (serviceResponse) {
            close();
            return serviceResponse;
          })["catch"](function (error) {
            console.error(error);
            close();
            throw error;
          }));
        case 28:
          console.error("Auto Decline: Invalid Response", {
            service: service,
            resp: resp
          });
          throw new Error("Auto Decline: Invalid Response");
        case 30:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _execHttpPost.apply(this, arguments);
}

var CLOSE_EVENT = "FCL:VIEW:CLOSE";
var READY_EVENT = "FCL:VIEW:READY";
var RESPONSE_EVENT = "FCL:VIEW:RESPONSE";
var _ = function _(e) {
  return typeof e === "string" && e.toLowerCase();
};
var IGNORE = new Set(["monetizationstart", "monetizationpending", "monetizationprogress", "monetizationstop"]);
var deprecate = function deprecate(was, want) {
  return console.warn("DEPRECATION NOTICE", "Received ".concat(was, ", please use ").concat(want, " for this and future versions of FCL"));
};
var buildMessageHandler = function buildMessageHandler(_ref) {
  var close = _ref.close,
    send = _ref.send,
    onReady = _ref.onReady,
    onResponse = _ref.onResponse,
    onMessage = _ref.onMessage;
  return function (e) {
    try {
      if (_typeof__default["default"](e.data) !== "object") return;
      if (IGNORE.has(e.data.type)) return;
      if (_(e.data.type) === _(CLOSE_EVENT)) close();
      if (_(e.data.type) === _(READY_EVENT)) onReady(e, {
        send: send,
        close: close
      });
      if (_(e.data.type) === _(RESPONSE_EVENT)) onResponse(e, {
        send: send,
        close: close
      });
      onMessage(e, {
        send: send,
        close: close
      });

      // Backwards Compatible
      if (_(e.data.type) === _("FCL:FRAME:READY")) {
        deprecate(e.data.type, READY_EVENT);
        onReady(e, {
          send: send,
          close: close
        });
      }
      if (_(e.data.type) === _("FCL:FRAME:RESPONSE")) {
        deprecate(e.data.type, RESPONSE_EVENT);
        onResponse(e, {
          send: send,
          close: close
        });
      }
      if (_(e.data.type) === _("FCL:FRAME:CLOSE")) {
        deprecate(e.data.type, CLOSE_EVENT);
        close();
      }
      //
      if (_(e.data.type) === _("FCL::CHALLENGE::RESPONSE")) {
        deprecate(e.data.type, RESPONSE_EVENT);
        onResponse(e, {
          send: send,
          close: close
        });
      }
      if (_(e.data.type) === _("FCL::AUTHZ_READY")) {
        deprecate(e.data.type, READY_EVENT);
        onReady(e, {
          send: send,
          close: close
        });
      }
      if (_(e.data.type) === _("FCL::CHALLENGE::CANCEL")) {
        deprecate(e.data.type, CLOSE_EVENT);
        close();
      }
      if (_(e.data.type) === _("FCL::CANCEL")) {
        deprecate(e.data.type, CLOSE_EVENT);
        close();
      }
    } catch (error) {
      console.error("Frame Callback Error", error);
      close();
    }
  };
};

var noop$3 = function noop() {};
function frame(service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (service == null) return {
    send: noop$3,
    close: noop$3
  };
  var onClose = opts.onClose || noop$3;
  var onMessage = opts.onMessage || noop$3;
  var onReady = opts.onReady || noop$3;
  var onResponse = opts.onResponse || noop$3;
  var handler = buildMessageHandler({
    close: close,
    send: send,
    onReady: onReady,
    onResponse: onResponse,
    onMessage: onMessage
  });
  window.addEventListener("message", handler);
  var _renderFrame = renderFrame(serviceEndpoint(service)),
    _renderFrame2 = _slicedToArray__default["default"](_renderFrame, 2),
    $frame = _renderFrame2[0],
    unmount = _renderFrame2[1];
  return {
    send: send,
    close: close
  };
  function close() {
    try {
      window.removeEventListener("message", handler);
      unmount();
      onClose();
    } catch (error) {
      console.error("Frame Close Error", error);
    }
  }
  function send(msg) {
    try {
      $frame.postMessage(JSON.parse(JSON.stringify(msg || {})), "*");
    } catch (error) {
      console.error("Frame Send Error", msg, error);
    }
  }
}

function execIframeRPC(_ref) {
  var service = _ref.service,
    body = _ref.body,
    config = _ref.config,
    opts = _ref.opts;
  return new Promise(function (resolve, reject) {
    var id = utilUid.uid();
    var includeOlderJsonRpcCall = opts.includeOlderJsonRpcCall;
    frame(service, {
      onReady: function onReady(_, _ref2) {
        return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee() {
          var send;
          return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                send = _ref2.send;
                _context.prev = 1;
                send({
                  type: "FCL:VIEW:READY:RESPONSE",
                  fclVersion: VERSION,
                  body: body,
                  service: {
                    params: service.params,
                    data: service.data,
                    type: service.type
                  },
                  config: config
                });
                send({
                  fclVersion: VERSION,
                  type: "FCL:FRAME:READY:RESPONSE",
                  body: body,
                  service: {
                    params: service.params,
                    data: service.data,
                    type: service.type
                  },
                  config: config,
                  deprecated: {
                    message: "FCL:FRAME:READY:RESPONSE is deprecated and replaced with type: FCL:VIEW:READY:RESPONSE"
                  }
                });
                if (includeOlderJsonRpcCall) {
                  send({
                    jsonrpc: "2.0",
                    id: id,
                    method: "fcl:sign",
                    params: [body, service.params],
                    deprecated: {
                      message: "jsonrpc is deprecated and replaced with type: FCL:VIEW:READY:RESPONSE"
                    }
                  });
                }
                _context.next = 10;
                break;
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                throw _context.t0;
              case 10:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 7]]);
        }))();
      },
      onResponse: function onResponse(e, _ref3) {
        var close = _ref3.close;
        try {
          if (_typeof__default["default"](e.data) !== "object") return;
          var resp = normalizePollingResponse(e.data);
          switch (resp.status) {
            case "APPROVED":
              resolve(resp.data);
              close();
              break;
            case "DECLINED":
              reject("Declined: ".concat(resp.reason || "No reason supplied"));
              close();
              break;
            case "REDIRECT":
              resolve(resp);
              close();
              break;
            default:
              reject("Declined: No reason supplied");
              close();
              break;
          }
        } catch (error) {
          console.error("execIframeRPC onResponse error", error);
          throw error;
        }
      },
      onMessage: function onMessage(e, _ref4) {
        var close = _ref4.close;
        try {
          if (_typeof__default["default"](e.data) !== "object") return;
          if (e.data.jsonrpc !== "2.0") return;
          if (e.data.id !== id) return;
          var resp = normalizePollingResponse(e.data.result);
          switch (resp.status) {
            case "APPROVED":
              resolve(resp.data);
              close();
              break;
            case "DECLINED":
              reject("Declined: ".concat(resp.reason || "No reason supplied"));
              close();
              break;
            case "REDIRECT":
              resolve(resp);
              close();
              break;
            default:
              reject("Declined: No reason supplied");
              close();
              break;
          }
        } catch (error) {
          console.error("execIframeRPC onMessage error", error);
          throw error;
        }
      },
      onClose: function onClose() {
        reject("Declined: Externally Halted");
      }
    });
  });
}

var noop$2 = function noop() {};
function pop(service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (service == null) return {
    send: noop$2,
    close: noop$2
  };
  var onClose = opts.onClose || noop$2;
  var onMessage = opts.onMessage || noop$2;
  var onReady = opts.onReady || noop$2;
  var onResponse = opts.onResponse || noop$2;
  var handler = buildMessageHandler({
    close: close,
    send: send,
    onReady: onReady,
    onResponse: onResponse,
    onMessage: onMessage
  });
  window.addEventListener("message", handler);
  var _renderPop = renderPop(serviceEndpoint(service)),
    _renderPop2 = _slicedToArray__default["default"](_renderPop, 2),
    $pop = _renderPop2[0],
    unmount = _renderPop2[1];
  var timer = setInterval(function () {
    if ($pop && $pop.closed) {
      close();
    }
  }, 500);
  return {
    send: send,
    close: close
  };
  function close() {
    try {
      window.removeEventListener("message", handler);
      clearInterval(timer);
      unmount();
      onClose();
    } catch (error) {
      console.error("Popup Close Error", error);
    }
  }
  function send(msg) {
    try {
      $pop.postMessage(JSON.parse(JSON.stringify(msg || {})), "*");
    } catch (error) {
      console.error("Popup Send Error", msg, error);
    }
  }
}

function execPopRPC(_ref) {
  var service = _ref.service,
    body = _ref.body,
    config = _ref.config,
    opts = _ref.opts;
  return new Promise(function (resolve, reject) {
    var id = utilUid.uid();
    var redir = opts.redir,
      includeOlderJsonRpcCall = opts.includeOlderJsonRpcCall;
    pop(service, {
      onReady: function onReady(_, _ref2) {
        return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee() {
          var send;
          return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                send = _ref2.send;
                _context.prev = 1;
                send({
                  fclVersion: VERSION,
                  type: "FCL:VIEW:READY:RESPONSE",
                  body: body,
                  service: {
                    params: service.params,
                    data: service.data,
                    type: service.type
                  },
                  config: config
                });
                send({
                  fclVersion: VERSION,
                  type: "FCL:FRAME:READY:RESPONSE",
                  body: body,
                  service: {
                    params: service.params,
                    data: service.data,
                    type: service.type
                  },
                  config: config,
                  deprecated: {
                    message: "FCL:FRAME:READY:RESPONSE is deprecated and replaced with type: FCL:VIEW:READY:RESPONSE"
                  }
                });
                if (includeOlderJsonRpcCall) {
                  send({
                    jsonrpc: "2.0",
                    id: id,
                    method: "fcl:sign",
                    params: [body, service.params]
                  });
                }
                _context.next = 10;
                break;
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                throw _context.t0;
              case 10:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 7]]);
        }))();
      },
      onResponse: function onResponse(e, _ref3) {
        var close = _ref3.close;
        try {
          if (_typeof__default["default"](e.data) !== "object") return;
          var resp = normalizePollingResponse(e.data);
          switch (resp.status) {
            case "APPROVED":
              resolve(resp.data);
              !redir && close();
              break;
            case "DECLINED":
              reject("Declined: ".concat(resp.reason || "No reason supplied"));
              close();
              break;
            case "REDIRECT":
              resolve(resp);
              close();
              break;
            default:
              reject("Declined: No reason supplied");
              close();
              break;
          }
        } catch (error) {
          console.error("execPopRPC onResponse error", error);
          throw error;
        }
      },
      onMessage: function onMessage(e, _ref4) {
        var close = _ref4.close;
        try {
          if (_typeof__default["default"](e.data) !== "object") return;
          if (e.data.jsonrpc !== "2.0") return;
          if (e.data.id !== id) return;
          var resp = normalizePollingResponse(e.data.result);
          switch (resp.status) {
            case "APPROVED":
              resolve(resp.data);
              !redir && close();
              break;
            case "DECLINED":
              reject("Declined: ".concat(resp.reason || "No reason supplied"));
              close();
              break;
            case "REDIRECT":
              resolve(resp);
              close();
              break;
            default:
              reject("Declined: No reason supplied");
              close();
              break;
          }
        } catch (error) {
          console.error("execPopRPC onMessage error", error);
          throw error;
        }
      },
      onClose: function onClose() {
        reject("Declined: Externally Halted");
      }
    });
  });
}

var noop$1 = function noop() {};
function tab(service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (service == null) return {
    send: noop$1,
    close: noop$1
  };
  var onClose = opts.onClose || noop$1;
  var onMessage = opts.onMessage || noop$1;
  var onReady = opts.onReady || noop$1;
  var onResponse = opts.onResponse || noop$1;
  var handler = buildMessageHandler({
    close: close,
    send: send,
    onReady: onReady,
    onResponse: onResponse,
    onMessage: onMessage
  });
  window.addEventListener("message", handler);
  var _renderTab = renderTab(serviceEndpoint(service)),
    _renderTab2 = _slicedToArray__default["default"](_renderTab, 2),
    $tab = _renderTab2[0],
    unmount = _renderTab2[1];
  var timer = setInterval(function () {
    if ($tab && $tab.closed) {
      close();
    }
  }, 500);
  return {
    send: send,
    close: close
  };
  function close() {
    try {
      window.removeEventListener("message", handler);
      clearInterval(timer);
      unmount();
      onClose();
    } catch (error) {
      console.error("Tab Close Error", error);
    }
  }
  function send(msg) {
    try {
      $tab.postMessage(JSON.parse(JSON.stringify(msg || {})), "*");
    } catch (error) {
      console.error("Tab Send Error", msg, error);
    }
  }
}

function execTabRPC(_ref) {
  var service = _ref.service,
    body = _ref.body,
    config = _ref.config,
    opts = _ref.opts;
  return new Promise(function (resolve, reject) {
    var id = utilUid.uid();
    var redir = opts.redir,
      includeOlderJsonRpcCall = opts.includeOlderJsonRpcCall;
    tab(service, {
      onReady: function onReady(_, _ref2) {
        return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee() {
          var send;
          return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                send = _ref2.send;
                _context.prev = 1;
                send({
                  fclVersion: VERSION,
                  type: "FCL:VIEW:READY:RESPONSE",
                  body: body,
                  service: {
                    params: service.params,
                    data: service.data,
                    type: service.type
                  },
                  config: config
                });
                send({
                  fclVersion: VERSION,
                  type: "FCL:FRAME:READY:RESPONSE",
                  body: body,
                  service: {
                    params: service.params,
                    data: service.data,
                    type: service.type
                  },
                  config: config,
                  deprecated: {
                    message: "FCL:FRAME:READY:RESPONSE is deprecated and replaced with type: FCL:VIEW:READY:RESPONSE"
                  }
                });
                if (includeOlderJsonRpcCall) {
                  send({
                    jsonrpc: "2.0",
                    id: id,
                    method: "fcl:sign",
                    params: [body, service.params]
                  });
                }
                _context.next = 10;
                break;
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                throw _context.t0;
              case 10:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 7]]);
        }))();
      },
      onResponse: function onResponse(e, _ref3) {
        var close = _ref3.close;
        try {
          if (_typeof__default["default"](e.data) !== "object") return;
          var resp = normalizePollingResponse(e.data);
          switch (resp.status) {
            case "APPROVED":
              resolve(resp.data);
              !redir && close();
              break;
            case "DECLINED":
              reject("Declined: ".concat(resp.reason || "No reason supplied"));
              close();
              break;
            case "REDIRECT":
              resolve(resp);
              close();
              break;
            default:
              reject("Declined: No reason supplied");
              close();
              break;
          }
        } catch (error) {
          console.error("execPopRPC onResponse error", error);
          throw error;
        }
      },
      onMessage: function onMessage(e, _ref4) {
        var close = _ref4.close;
        try {
          if (_typeof__default["default"](e.data) !== "object") return;
          if (e.data.jsonrpc !== "2.0") return;
          if (e.data.id !== id) return;
          var resp = normalizePollingResponse(e.data.result);
          switch (resp.status) {
            case "APPROVED":
              resolve(resp.data);
              !redir && close();
              break;
            case "DECLINED":
              reject("Declined: ".concat(resp.reason || "No reason supplied"));
              close();
              break;
            case "REDIRECT":
              resolve(resp);
              close();
              break;
            default:
              reject("Declined: No reason supplied");
              close();
              break;
          }
        } catch (error) {
          console.error("execPopRPC onMessage error", error);
          throw error;
        }
      },
      onClose: function onClose() {
        reject("Declined: Externally Halted");
      }
    });
  });
}

var noop = function noop() {};
function extension(service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (service == null) return {
    send: noop,
    close: noop
  };
  var onClose = opts.onClose || noop;
  var onMessage = opts.onMessage || noop;
  var onReady = opts.onReady || noop;
  var onResponse = opts.onResponse || noop;
  var handler = buildMessageHandler({
    close: close,
    send: send,
    onReady: onReady,
    onResponse: onResponse,
    onMessage: onMessage
  });
  window.addEventListener("message", handler);
  send({
    service: service
  });
  return {
    send: send,
    close: close
  };
  function close() {
    try {
      window.removeEventListener("message", handler);
      onClose();
    } catch (error) {
      console.error("Ext Close Error", error);
    }
  }
  function send(msg) {
    try {
      window && window.postMessage(JSON.parse(JSON.stringify(msg || {})), "*");
    } catch (error) {
      console.error("Ext Send Error", msg, error);
    }
  }
}

function execExtRPC(_ref) {
  var service = _ref.service,
    body = _ref.body,
    config = _ref.config;
    _ref.opts;
  return new Promise(function (resolve, reject) {
    extension(service, {
      onReady: function onReady(_, _ref2) {
        return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee() {
          var send;
          return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                send = _ref2.send;
                _context.prev = 1;
                send({
                  fclVersion: VERSION,
                  type: "FCL:VIEW:READY:RESPONSE",
                  body: body,
                  service: {
                    params: service.params,
                    data: service.data,
                    type: service.type
                  },
                  config: config
                });
                _context.next = 8;
                break;
              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](1);
                throw _context.t0;
              case 8:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 5]]);
        }))();
      },
      onResponse: function onResponse(e, _ref3) {
        var close = _ref3.close;
        try {
          if (_typeof__default["default"](e.data) !== "object") return;
          var resp = normalizePollingResponse(e.data);
          switch (resp.status) {
            case "APPROVED":
              resolve(resp.data);
              close();
              break;
            case "DECLINED":
              reject("Declined: ".concat(resp.reason || "No reason supplied"));
              close();
              break;
            case "REDIRECT":
              resolve(resp);
              close();
              break;
            default:
              reject("Declined: No reason supplied");
              close();
              break;
          }
        } catch (error) {
          console.error("execExtRPC onResponse error", error);
          throw error;
        }
      },
      onClose: function onClose() {
        reject("Declined: Externally Halted");
      }
    });
  });
}

var CORE_STRATEGIES = {
  "HTTP/RPC": execHttpPost,
  "HTTP/POST": execHttpPost,
  "IFRAME/RPC": execIframeRPC,
  "POP/RPC": execPopRPC,
  "TAB/RPC": execTabRPC,
  "EXT/RPC": execExtRPC
};
var supportedPlugins = ["ServicePlugin"];
var supportedServicePlugins = ["discovery-service"];
var validateDiscoveryPlugin = function validateDiscoveryPlugin(servicePlugin) {
  var services = servicePlugin.services,
    serviceStrategy = servicePlugin.serviceStrategy;
  utilInvariant.invariant(Array.isArray(services) && services.length, "Array of Discovery Services is required");
  var _iterator = _createForOfIteratorHelper__default["default"](services),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var ds = _step.value;
      utilInvariant.invariant(isRequired(ds.f_type) && ds.f_type === "Service", "Service is required");
      utilInvariant.invariant(isRequired(ds.type) && ds.type === "authn", "Service must be type authn. Received ".concat(ds.type));
      utilInvariant.invariant(ds.method in CORE_STRATEGIES || serviceStrategy.method === ds.method, "Service method ".concat(ds.method, " is not supported"));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  utilInvariant.invariant(isRequired(serviceStrategy), "Service strategy is required");
  utilInvariant.invariant(isRequired(serviceStrategy.method) && isString(serviceStrategy.method), "Service strategy method is required");
  utilInvariant.invariant(isRequired(serviceStrategy.exec) && isFunc(serviceStrategy.exec), "Service strategy exec function is required");
  return {
    discoveryServices: services,
    serviceStrategy: serviceStrategy
  };
};
var ServiceRegistry = function ServiceRegistry() {
  var services = new Set();
  var strategies = new Map(Object.entries(CORE_STRATEGIES));
  var add = function add(servicePlugin) {
    utilInvariant.invariant(supportedServicePlugins.includes(servicePlugin.type), "Service Plugin type ".concat(servicePlugin.type, " is not supported"));
    if (servicePlugin.type === "discovery-service") {
      var _validateDiscoveryPlu = validateDiscoveryPlugin(servicePlugin),
        discoveryServices = _validateDiscoveryPlu.discoveryServices,
        serviceStrategy = _validateDiscoveryPlu.serviceStrategy;
      setServices(discoveryServices);
      if (!strategies.has(serviceStrategy.method)) {
        strategies.set(serviceStrategy.method, serviceStrategy.exec);
      } else {
        utilLogger.log({
          title: "Add Service Plugin",
          message: "Service strategy for ".concat(serviceStrategy.method, " already exists"),
          level: utilLogger.LEVELS.warn
        });
      }
    }
  };
  var setServices = function setServices(discoveryServices) {
    return services = new Set(_toConsumableArray__default["default"](discoveryServices));
  };
  var getServices = function getServices() {
    return _toConsumableArray__default["default"](services);
  };
  var getStrategy = function getStrategy(method) {
    return strategies.get(method);
  };
  var getStrategies = function getStrategies() {
    return _toConsumableArray__default["default"](strategies.keys());
  };
  return Object.freeze({
    add: add,
    getServices: getServices,
    getStrategy: getStrategy,
    getStrategies: getStrategies
  });
};
var validatePlugins = function validatePlugins(plugins) {
  var pluginsArray;
  utilInvariant.invariant(plugins, "No plugins supplied");
  if (!Array.isArray(plugins)) {
    pluginsArray = [plugins];
  } else {
    pluginsArray = _toConsumableArray__default["default"](plugins);
  }
  var _iterator2 = _createForOfIteratorHelper__default["default"](pluginsArray),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var p = _step2.value;
      utilInvariant.invariant(isRequired(p.name), "Plugin name is required");
      utilInvariant.invariant(isRequired(p.f_type), "Plugin f_type is required");
      utilInvariant.invariant(supportedPlugins.includes(p.f_type), "Plugin type ".concat(p.f_type, " is not supported"));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return pluginsArray;
};
var PluginRegistry = function PluginRegistry() {
  var pluginsMap = new Map();
  var getPlugins = function getPlugins() {
    return pluginsMap;
  };
  var add = function add(plugins) {
    var pluginsArray = validatePlugins(plugins);
    var _iterator3 = _createForOfIteratorHelper__default["default"](pluginsArray),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var p = _step3.value;
        pluginsMap.set(p.name, p);
        if (p.f_type === "ServicePlugin") {
          serviceRegistry.add(p);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  };
  return Object.freeze({
    add: add,
    getPlugins: getPlugins
  });
};
var serviceRegistry = ServiceRegistry();
var pluginRegistry = PluginRegistry();

var execStrategy = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(_ref) {
    var service, body, config, opts, strategy;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          service = _ref.service, body = _ref.body, config = _ref.config, opts = _ref.opts;
          //GET WHICH STRATEGY FN TO EXECUTE -> IF IFRAME, WILL CALL THE EXEC IFRAME STRATEGY
          strategy = serviceRegistry.getStrategy(service.method); //EXECUTE THE STRATEGY WITH THE DATA
          console.log('strategy data: ', {
            service: service,
            body: body,
            config: config,
            opts: opts
          });
          return _context.abrupt("return", strategy({
            service: service,
            body: body,
            config: config,
            opts: opts
          }));
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function execStrategy(_x) {
    return _ref2.apply(this, arguments);
  };
}();
function execStrategyData(_x2) {
  return _execStrategyData.apply(this, arguments);
}
function _execStrategyData() {
  _execStrategyData = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(_ref3) {
    var _window$location$host, _window, _window$location;
    var service, _ref3$msg, msg, _ref3$config, config, _ref3$opts, opts, execConfig;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          service = _ref3.service, _ref3$msg = _ref3.msg, msg = _ref3$msg === void 0 ? {} : _ref3$msg, _ref3$config = _ref3.config, config = _ref3$config === void 0 ? {} : _ref3$config, _ref3$opts = _ref3.opts, opts = _ref3$opts === void 0 ? {} : _ref3$opts;
          msg.data = service.data;
          _context2.next = 4;
          return configLens(/^service\./);
        case 4:
          _context2.t0 = _context2.sent;
          _context2.next = 7;
          return configLens(/^app\.detail\./);
        case 7:
          _context2.t1 = _context2.sent;
          _context2.t2 = _objectSpread__default["default"];
          _context2.t3 = _objectSpread__default["default"]({}, config.client);
          _context2.t4 = {};
          _context2.t5 = VERSION;
          _context2.t6 = (_window$location$host = (_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : _window$location.hostname) !== null && _window$location$host !== void 0 ? _window$location$host : null;
          _context2.next = 15;
          return getChainId();
        case 15:
          _context2.t7 = _context2.sent;
          _context2.t8 = {
            fclVersion: _context2.t5,
            fclLibrary: "https://github.com/onflow/fcl-js",
            hostname: _context2.t6,
            network: _context2.t7
          };
          _context2.t9 = (0, _context2.t2)(_context2.t3, _context2.t4, _context2.t8);
          execConfig = {
            services: _context2.t0,
            app: _context2.t1,
            client: _context2.t9
          };
          return _context2.abrupt("return", {
            service: service,
            body: msg,
            config: execConfig,
            opts: opts
          });
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _execStrategyData.apply(this, arguments);
}
function execService(_x3) {
  return _execService.apply(this, arguments);
}
function _execService() {
  _execService = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee3(_ref4) {
    var _window$location$host2, _window2, _window2$location;
    var service, _ref4$msg, msg, _ref4$config, config, _ref4$opts, opts, execConfig, res;
    return _regeneratorRuntime__default["default"]().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          service = _ref4.service, _ref4$msg = _ref4.msg, msg = _ref4$msg === void 0 ? {} : _ref4$msg, _ref4$config = _ref4.config, config = _ref4$config === void 0 ? {} : _ref4$config, _ref4$opts = _ref4.opts, opts = _ref4$opts === void 0 ? {} : _ref4$opts;
          msg.data = service.data;

          //CREATE THE EXEC CONFIC OBJECT
          _context3.next = 4;
          return configLens(/^service\./);
        case 4:
          _context3.t0 = _context3.sent;
          _context3.next = 7;
          return configLens(/^app\.detail\./);
        case 7:
          _context3.t1 = _context3.sent;
          _context3.t2 = _objectSpread__default["default"];
          _context3.t3 = _objectSpread__default["default"]({}, config.client);
          _context3.t4 = {};
          _context3.t5 = VERSION;
          _context3.t6 = (_window$location$host2 = (_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$location = _window2.location) === null || _window2$location === void 0 ? void 0 : _window2$location.hostname) !== null && _window$location$host2 !== void 0 ? _window$location$host2 : null;
          _context3.next = 15;
          return getChainId();
        case 15:
          _context3.t7 = _context3.sent;
          _context3.t8 = {
            fclVersion: _context3.t5,
            fclLibrary: "https://github.com/onflow/fcl-js",
            hostname: _context3.t6,
            network: _context3.t7
          };
          _context3.t9 = (0, _context3.t2)(_context3.t3, _context3.t4, _context3.t8);
          execConfig = {
            services: _context3.t0,
            app: _context3.t1,
            client: _context3.t9
          };
          _context3.prev = 19;
          _context3.next = 22;
          return execStrategy({
            service: service,
            body: msg,
            config: execConfig,
            opts: opts
          });
        case 22:
          res = _context3.sent;
          if (!(res.status === "REDIRECT")) {
            _context3.next = 30;
            break;
          }
          utilInvariant.invariant(service.type === res.data.type, "Cannot shift recursive service type in execService");
          _context3.next = 27;
          return execService({
            service: res.data,
            msg: msg,
            config: execConfig,
            opts: opts
          });
        case 27:
          return _context3.abrupt("return", _context3.sent);
        case 30:
          return _context3.abrupt("return", res);
        case 31:
          _context3.next = 37;
          break;
        case 33:
          _context3.prev = 33;
          _context3.t10 = _context3["catch"](19);
          utilLogger.log({
            title: "Error on execService ".concat(service === null || service === void 0 ? void 0 : service.type),
            message: _context3.t10,
            level: utilLogger.LEVELS.error
          });
          throw _context3.t10;
        case 37:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[19, 33]]);
  }));
  return _execService.apply(this, arguments);
}

// {
//    "f_type": "CompositeSignature",
//    "f_vsn": "1.0.0",
//    "addr": "_____",         // sans-prefix
//    "signature": "adfe1234", // hex
//    "keyId": 3,
// }
function normalizeCompositeSignature(resp) {
  if (resp == null) return null;
  switch (resp["f_vsn"]) {
    case "1.0.0":
      return resp;
    default:
      return _objectSpread__default["default"](_objectSpread__default["default"]({}, COMPOSITE_SIGNATURE_PRAGMA), {}, {
        addr: utilAddress.sansPrefix(resp.addr || resp.address),
        signature: resp.signature || resp.sig,
        keyId: resp.keyId
      });
  }
}

var makeDiscoveryServices = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee() {
    var _window;
    var extensionServices;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          extensionServices = ((_window = window) === null || _window === void 0 ? void 0 : _window.fcl_extensions) || [];
          return _context.abrupt("return", [].concat(_toConsumableArray__default["default"](extensionServices), _toConsumableArray__default["default"](serviceRegistry.getServices())));
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function makeDiscoveryServices() {
    return _ref.apply(this, arguments);
  };
}();
function getDiscoveryService(_x) {
  return _getDiscoveryService.apply(this, arguments);
}
function _getDiscoveryService() {
  _getDiscoveryService = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(service) {
    var _service$endpoint;
    var discoveryAuthnInclude, discoveryWalletMethod, method, endpoint;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return config.config.get("discovery.authn.include", []);
        case 2:
          discoveryAuthnInclude = _context2.sent;
          _context2.next = 5;
          return config.config.first(["discovery.wallet.method", "discovery.wallet.method.default"]);
        case 5:
          discoveryWalletMethod = _context2.sent;
          method = service !== null && service !== void 0 && service.method ? service.method : discoveryWalletMethod;
          if (!((_service$endpoint = service === null || service === void 0 ? void 0 : service.endpoint) !== null && _service$endpoint !== void 0)) {
            _context2.next = 11;
            break;
          }
          _context2.t0 = _service$endpoint;
          _context2.next = 14;
          break;
        case 11:
          _context2.next = 13;
          return config.config.first(["discovery.wallet", "challenge.handshake"]);
        case 13:
          _context2.t0 = _context2.sent;
        case 14:
          endpoint = _context2.t0;
          utilInvariant.invariant(endpoint, "\n    If no service is passed to \"authenticate,\" then \"discovery.wallet\" must be defined in fcl config.\n    See: \"https://docs.onflow.org/fcl/reference/api/#setting-configuration-values\"\n    ");
          return _context2.abrupt("return", _objectSpread__default["default"](_objectSpread__default["default"]({}, service), {}, {
            type: "authn",
            endpoint: endpoint,
            method: method,
            discoveryAuthnInclude: discoveryAuthnInclude
          }));
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getDiscoveryService.apply(this, arguments);
}

function getServices(_x) {
  return _getServices.apply(this, arguments);
}
function _getServices() {
  _getServices = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(_ref) {
    var _window, _window$navigator;
    var types, endpoint, include, url;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          types = _ref.types;
          _context.next = 3;
          return config.config.get("discovery.authn.endpoint");
        case 3:
          endpoint = _context.sent;
          utilInvariant.invariant(Boolean(endpoint), "\"discovery.authn.endpoint\" in config must be defined.");
          _context.next = 7;
          return config.config.get("discovery.authn.include", []);
        case 7:
          include = _context.sent;
          url = new URL(endpoint);
          _context.t0 = fetch;
          _context.t1 = url;
          _context.t2 = {
            "Content-Type": "application/json"
          };
          _context.t3 = JSON;
          _context.t4 = types;
          _context.t5 = VERSION;
          _context.t6 = include;
          _context.next = 18;
          return makeDiscoveryServices();
        case 18:
          _context.t7 = _context.sent;
          _context.t8 = serviceRegistry.getStrategies();
          _context.t9 = (_window = window) === null || _window === void 0 ? void 0 : (_window$navigator = _window.navigator) === null || _window$navigator === void 0 ? void 0 : _window$navigator.userAgent;
          _context.next = 23;
          return getChainId();
        case 23:
          _context.t10 = _context.sent;
          _context.t11 = {
            type: _context.t4,
            fclVersion: _context.t5,
            include: _context.t6,
            clientServices: _context.t7,
            supportedStrategies: _context.t8,
            userAgent: _context.t9,
            network: _context.t10
          };
          _context.t12 = _context.t3.stringify.call(_context.t3, _context.t11);
          _context.t13 = {
            method: "POST",
            headers: _context.t2,
            body: _context.t12
          };
          return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t13).then(function (d) {
            return d.json();
          }));
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getServices.apply(this, arguments);
}

var _HANDLERS$3;
var SERVICE_ACTOR_KEYS = {
  AUTHN: "authn",
  RESULTS: "results",
  SNAPSHOT: "SNAPSHOT",
  UPDATED: "UPDATED",
  UPDATE_RESULTS: "UPDATE_RESULTS"
};
var warn = function warn(fact, msg) {
  if (fact) {
    console.warn("\n      %cFCL Warning\n      ============================\n      ".concat(msg, "\n      For more info, please see the docs: https://docs.onflow.org/fcl/\n      ============================\n      "), "font-weight:bold;font-family:monospace;");
  }
};
var fetchServicesFromDiscovery = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee() {
    var services;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return getServices({
            types: [SERVICE_ACTOR_KEYS.AUTHN]
          });
        case 3:
          services = _context.sent;
          utilActor.send(SERVICE_ACTOR_KEYS.AUTHN, SERVICE_ACTOR_KEYS.UPDATE_RESULTS, {
            results: services
          });
          _context.next = 10;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          utilLogger.log({
            title: "".concat(_context.t0.name, " Error fetching Discovery API services."),
            message: _context.t0.message,
            level: utilLogger.LEVELS.error
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function fetchServicesFromDiscovery() {
    return _ref.apply(this, arguments);
  };
}();
var HANDLERS$3 = (_HANDLERS$3 = {}, _defineProperty__default["default"](_HANDLERS$3, utilActor.INIT, function () {
  var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(ctx) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          warn(typeof window === "undefined", '"fcl.discovery" is only available in the browser.');
          // If you call this before the window is loaded extensions will not be set yet

          fetchServicesFromDiscovery();
          // if (document.readyState === 'complete') {
          //   fetchServicesFromDiscovery()
          // } else {
          //   window.onload = async () => {
          //     fetchServicesFromDiscovery()
          //   }
          // }
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}()), _defineProperty__default["default"](_HANDLERS$3, SERVICE_ACTOR_KEYS.UPDATE_RESULTS, function (ctx, _letter, data) {
  ctx.merge(data);
  ctx.broadcast(SERVICE_ACTOR_KEYS.UPDATED, _objectSpread__default["default"]({}, ctx.all()));
}), _defineProperty__default["default"](_HANDLERS$3, utilActor.SUBSCRIBE, function (ctx, letter) {
  ctx.subscribe(letter.from);
  ctx.send(letter.from, SERVICE_ACTOR_KEYS.UPDATED, _objectSpread__default["default"]({}, ctx.all()));
}), _defineProperty__default["default"](_HANDLERS$3, utilActor.UNSUBSCRIBE, function (ctx, letter) {
  return ctx.unsubscribe(letter.from);
}), _defineProperty__default["default"](_HANDLERS$3, SERVICE_ACTOR_KEYS.SNAPSHOT, function () {
  var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee3(ctx, letter) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", letter.reply(_objectSpread__default["default"]({}, ctx.all())));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}()), _HANDLERS$3);
var spawnProviders = function spawnProviders() {
  return utilActor.spawn(HANDLERS$3, SERVICE_ACTOR_KEYS.AUTHN);
};
var authn = {
  subscribe: function subscribe(cb) {
    return utilActor.subscriber(SERVICE_ACTOR_KEYS.AUTHN, spawnProviders, cb);
  },
  snapshot: function snapshot() {
    return utilActor.snapshoter(SERVICE_ACTOR_KEYS.AUTHN, spawnProviders);
  },
  update: function update() {
    return fetchServicesFromDiscovery();
  }
};

var discovery = {
  authn: authn
};

var _HANDLERS$2;

/**
 * @typedef {Object} CurrentUser
 * @property {(string|null)} addr - The public address of the current user
 * @property {(string|null)} cid - A wallet specified content identifier for user metadata
 * @property {(number|null)} expiresAt - A wallet specified time-frame for a valid session
 * @property {string} f_type - A type identifier used internally by FCL
 * @property {string} f_vsn - FCL protocol version
 * @property {(boolean|null)} loggedIn - Whether or not the current user is logged in
 * @property {Array<Object>} services - A list of trusted services that express ways of interacting with the current user's identity
 */

/**
 * @typedef {Object} CompositeSignature
 * @property {string} f_type - A type identifier used internally by FCL
 * @property {string} f_vsn - FCL protocol version
 * @property {string} addr - Flow Address (sans prefix)
 * @property {number} keyId - Key ID
 * @property {string} signature - Signature as a hex string
 */

var isFn = function isFn(d) {
  return typeof d === "function";
};
var NAME = "CURRENT_USER";
var UPDATED$1 = "CURRENT_USER/UPDATED";
var SNAPSHOT = "SNAPSHOT";
var SET_CURRENT_USER = "SET_CURRENT_USER";
var DEL_CURRENT_USER = "DEL_CURRENT_USER";
var DATA = "{\n  \"f_type\": \"User\",\n  \"f_vsn\": \"1.0.0\",\n  \"addr\":null,\n  \"cid\":null,\n  \"loggedIn\":null,\n  \"expiresAt\":null,\n  \"services\":[]\n}";
var getStoredUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(storage) {
    var fallback, stored;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          fallback = JSON.parse(DATA);
          _context.next = 3;
          return storage.get(NAME);
        case 3:
          stored = _context.sent;
          if (!(stored != null && fallback["f_vsn"] !== stored["f_vsn"])) {
            _context.next = 7;
            break;
          }
          storage.removeItem(NAME);
          return _context.abrupt("return", fallback);
        case 7:
          return _context.abrupt("return", stored || fallback);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getStoredUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
var HANDLERS$2 = (_HANDLERS$2 = {}, _defineProperty__default["default"](_HANDLERS$2, utilActor.INIT, function () {
  var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(ctx) {
    var storage, user;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (typeof window === "undefined") {
            console.warn("\n        %cFCL Warning\n        ============================\n        \"currentUser\" is only available in the browser.\n        For more info, please see the docs: https://docs.onflow.org/fcl/\n        ============================\n        ", "font-weight:bold;font-family:monospace;");
          }
          ctx.merge(JSON.parse(DATA));
          _context2.next = 4;
          return config.config.first(["fcl.storage", "fcl.storage.default"]);
        case 4:
          storage = _context2.sent;
          if (!storage.can) {
            _context2.next = 10;
            break;
          }
          _context2.next = 8;
          return getStoredUser(storage);
        case 8:
          user = _context2.sent;
          if (notExpired(user)) ctx.merge(user);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}()), _defineProperty__default["default"](_HANDLERS$2, utilActor.SUBSCRIBE, function (ctx, letter) {
  ctx.subscribe(letter.from);
  ctx.send(letter.from, UPDATED$1, _objectSpread__default["default"]({}, ctx.all()));
}), _defineProperty__default["default"](_HANDLERS$2, utilActor.UNSUBSCRIBE, function (ctx, letter) {
  ctx.unsubscribe(letter.from);
}), _defineProperty__default["default"](_HANDLERS$2, SNAPSHOT, function () {
  var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee3(ctx, letter) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          letter.reply(_objectSpread__default["default"]({}, ctx.all()));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}()), _defineProperty__default["default"](_HANDLERS$2, SET_CURRENT_USER, function () {
  var _ref4 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee4(ctx, letter, data) {
    var storage;
    return _regeneratorRuntime__default["default"]().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          ctx.merge(data);
          _context4.next = 3;
          return config.config.first(["fcl.storage", "fcl.storage.default"]);
        case 3:
          storage = _context4.sent;
          if (storage.can) storage.put(NAME, ctx.all());
          ctx.broadcast(UPDATED$1, _objectSpread__default["default"]({}, ctx.all()));
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}()), _defineProperty__default["default"](_HANDLERS$2, DEL_CURRENT_USER, function () {
  var _ref5 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee5(ctx, letter) {
    var storage;
    return _regeneratorRuntime__default["default"]().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          ctx.merge(JSON.parse(DATA));
          _context5.next = 3;
          return config.config.first(["fcl.storage", "fcl.storage.default"]);
        case 3:
          storage = _context5.sent;
          if (storage.can) storage.put(NAME, ctx.all());
          ctx.broadcast(UPDATED$1, _objectSpread__default["default"]({}, ctx.all()));
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}()), _HANDLERS$2);
var spawnCurrentUser = function spawnCurrentUser() {
  return utilActor.spawn(HANDLERS$2, NAME);
};
function notExpired(user) {
  return user.expiresAt == null || user.expiresAt === 0 || user.expiresAt > Date.now();
}
function getAccountProofData() {
  return _getAccountProofData.apply(this, arguments);
}
function _getAccountProofData() {
  _getAccountProofData = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee8() {
    var accountProofDataResolver, accountProofData;
    return _regeneratorRuntime__default["default"]().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return config.config.get("fcl.accountProof.resolver");
        case 2:
          accountProofDataResolver = _context8.sent;
          if (!(accountProofDataResolver == null)) {
            _context8.next = 5;
            break;
          }
          return _context8.abrupt("return");
        case 5:
          if (isFn(accountProofDataResolver)) {
            _context8.next = 8;
            break;
          }
          utilLogger.log({
            title: "Account Proof Data Resolver must be a function",
            message: "Check fcl.accountProof.resolver configuration.\n                Expected: fcl.accountProof.resolver: async () => { ... }\n                Received: fcl.accountProof.resolver: ".concat(_typeof__default["default"](accountProofDataResolver), "\n                "),
            level: utilLogger.LEVELS.warn
          });
          return _context8.abrupt("return");
        case 8:
          _context8.next = 10;
          return accountProofDataResolver();
        case 10:
          accountProofData = _context8.sent;
          if (!(accountProofData == null)) {
            _context8.next = 13;
            break;
          }
          return _context8.abrupt("return");
        case 13:
          utilInvariant.invariant(typeof accountProofData.appIdentifier === "string", "appIdentifier must be a string");
          utilInvariant.invariant(/^[0-9a-f]+$/i.test(accountProofData.nonce), "Nonce must be a hex string");
          return _context8.abrupt("return", accountProofData);
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _getAccountProofData.apply(this, arguments);
}
var makeConfig = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee6(_ref6) {
    var discoveryAuthnInclude;
    return _regeneratorRuntime__default["default"]().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          discoveryAuthnInclude = _ref6.discoveryAuthnInclude;
          _context6.t0 = discoveryAuthnInclude;
          _context6.next = 4;
          return makeDiscoveryServices();
        case 4:
          _context6.t1 = _context6.sent;
          _context6.t2 = serviceRegistry.getStrategies();
          _context6.t3 = {
            discoveryAuthnInclude: _context6.t0,
            clientServices: _context6.t1,
            supportedStrategies: _context6.t2
          };
          return _context6.abrupt("return", {
            client: _context6.t3
          });
        case 8:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function makeConfig(_x10) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * @description - Authenticate a user
 * @param {Object} [opts] - Options
 * @param {Object} [opts.service] - Optional service to use for authentication
 * @param {Boolean} [opts.redir=false] - Optional flag to allow window to stay open after authentication
 * @returns {Promise<CurrentUser>} - User object
 */
function authenticate$1() {
  return _authenticate.apply(this, arguments);
}
function _authenticate() {
  _authenticate = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee10() {
    var _service$provider, _service$provider2;
    var _ref11,
      service,
      _ref11$redir,
      redir,
      _service$provider3,
      _args10 = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _ref11 = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : {}, service = _ref11.service, _ref11$redir = _ref11.redir, redir = _ref11$redir === void 0 ? false : _ref11$redir;
          if (!(service && !(service !== null && service !== void 0 && (_service$provider = service.provider) !== null && _service$provider !== void 0 && _service$provider.is_installed) && service !== null && service !== void 0 && (_service$provider2 = service.provider) !== null && _service$provider2 !== void 0 && _service$provider2.requires_install)) {
            _context10.next = 4;
            break;
          }
          window.location.href = service === null || service === void 0 ? void 0 : (_service$provider3 = service.provider) === null || _service$provider3 === void 0 ? void 0 : _service$provider3.install_link;
          return _context10.abrupt("return");
        case 4:
          return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref12 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee9(resolve, reject) {
              var opts, user, discoveryService, refreshService, accountProofData, response, _response;
              return _regeneratorRuntime__default["default"]().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    spawnCurrentUser();
                    opts = {
                      redir: redir
                    };
                    _context9.next = 4;
                    return snapshot();
                  case 4:
                    user = _context9.sent;
                    _context9.next = 7;
                    return getDiscoveryService(service);
                  case 7:
                    discoveryService = _context9.sent;
                    refreshService = serviceOfType(user.services, "authn-refresh");
                    if (!user.loggedIn) {
                      _context9.next = 37;
                      break;
                    }
                    if (!refreshService) {
                      _context9.next = 36;
                      break;
                    }
                    _context9.prev = 11;
                    _context9.next = 14;
                    return execService({
                      service: refreshService,
                      msg: accountProofData,
                      opts: opts
                    });
                  case 14:
                    response = _context9.sent;
                    _context9.t0 = utilActor.send;
                    _context9.t1 = NAME;
                    _context9.t2 = SET_CURRENT_USER;
                    _context9.next = 20;
                    return buildUser(response);
                  case 20:
                    _context9.t3 = _context9.sent;
                    (0, _context9.t0)(_context9.t1, _context9.t2, _context9.t3);
                    _context9.next = 27;
                    break;
                  case 24:
                    _context9.prev = 24;
                    _context9.t4 = _context9["catch"](11);
                    utilLogger.log({
                      title: "".concat(_context9.t4.name, " Could not refresh wallet authentication."),
                      message: _context9.t4.message,
                      level: utilLogger.LEVELS.error
                    });
                  case 27:
                    _context9.prev = 27;
                    _context9.t5 = resolve;
                    _context9.next = 31;
                    return snapshot();
                  case 31:
                    _context9.t6 = _context9.sent;
                    return _context9.abrupt("return", (0, _context9.t5)(_context9.t6));
                  case 34:
                    _context9.next = 37;
                    break;
                  case 36:
                    return _context9.abrupt("return", resolve(user));
                  case 37:
                    _context9.prev = 37;
                    _context9.next = 40;
                    return getAccountProofData();
                  case 40:
                    accountProofData = _context9.sent;
                    _context9.next = 47;
                    break;
                  case 43:
                    _context9.prev = 43;
                    _context9.t7 = _context9["catch"](37);
                    utilLogger.log({
                      title: "".concat(_context9.t7.name, " On Authentication: Could not resolve account proof data."),
                      message: _context9.t7.message,
                      level: utilLogger.LEVELS.error
                    });
                    return _context9.abrupt("return", reject(_context9.t7));
                  case 47:
                    _context9.prev = 47;
                    _context9.t8 = execService;
                    _context9.t9 = discoveryService;
                    _context9.t10 = accountProofData;
                    _context9.next = 53;
                    return makeConfig(discoveryService);
                  case 53:
                    _context9.t11 = _context9.sent;
                    _context9.t12 = opts;
                    _context9.t13 = {
                      service: _context9.t9,
                      msg: _context9.t10,
                      config: _context9.t11,
                      opts: _context9.t12
                    };
                    _context9.next = 58;
                    return (0, _context9.t8)(_context9.t13);
                  case 58:
                    _response = _context9.sent;
                    _context9.t14 = utilActor.send;
                    _context9.t15 = NAME;
                    _context9.t16 = SET_CURRENT_USER;
                    _context9.next = 64;
                    return buildUser(_response);
                  case 64:
                    _context9.t17 = _context9.sent;
                    (0, _context9.t14)(_context9.t15, _context9.t16, _context9.t17);
                    _context9.next = 71;
                    break;
                  case 68:
                    _context9.prev = 68;
                    _context9.t18 = _context9["catch"](47);
                    utilLogger.log({
                      title: "".concat(_context9.t18, " On Authentication"),
                      message: _context9.t18,
                      level: utilLogger.LEVELS.error
                    });
                  case 71:
                    _context9.prev = 71;
                    _context9.t19 = resolve;
                    _context9.next = 75;
                    return snapshot();
                  case 75:
                    _context9.t20 = _context9.sent;
                    (0, _context9.t19)(_context9.t20);
                    return _context9.finish(71);
                  case 78:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9, null, [[11, 24, 27, 34], [37, 43], [47, 68, 71, 78]]);
            }));
            return function (_x14, _x15) {
              return _ref12.apply(this, arguments);
            };
          }()));
        case 5:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _authenticate.apply(this, arguments);
}
function getStrategyData$1() {
  return _getStrategyData.apply(this, arguments);
}
/**
 * @description - Unauthenticate a user
 * @returns {void}
 */
function _getStrategyData() {
  _getStrategyData = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee11() {
    var _service$provider4, _service$provider5;
    var _ref13,
      service,
      _ref13$redir,
      redir,
      _service$provider6,
      opts,
      discoveryService,
      accountProofData,
      response,
      _args11 = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _ref13 = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {}, service = _ref13.service, _ref13$redir = _ref13.redir, redir = _ref13$redir === void 0 ? false : _ref13$redir;
          if (!(service && !(service !== null && service !== void 0 && (_service$provider4 = service.provider) !== null && _service$provider4 !== void 0 && _service$provider4.is_installed) && service !== null && service !== void 0 && (_service$provider5 = service.provider) !== null && _service$provider5 !== void 0 && _service$provider5.requires_install)) {
            _context11.next = 4;
            break;
          }
          window.location.href = service === null || service === void 0 ? void 0 : (_service$provider6 = service.provider) === null || _service$provider6 === void 0 ? void 0 : _service$provider6.install_link;
          return _context11.abrupt("return");
        case 4:
          spawnCurrentUser();
          opts = {
            redir: redir
          };
          _context11.next = 9;
          return getDiscoveryService(service);
        case 9:
          discoveryService = _context11.sent;
          _context11.prev = 10;
          _context11.t0 = execStrategyData;
          _context11.t1 = discoveryService;
          _context11.t2 = accountProofData;
          _context11.next = 16;
          return makeConfig(discoveryService);
        case 16:
          _context11.t3 = _context11.sent;
          _context11.t4 = opts;
          _context11.t5 = {
            service: _context11.t1,
            msg: _context11.t2,
            config: _context11.t3,
            opts: _context11.t4
          };
          _context11.next = 21;
          return (0, _context11.t0)(_context11.t5);
        case 21:
          response = _context11.sent;
          return _context11.abrupt("return", response);
        case 25:
          _context11.prev = 25;
          _context11.t6 = _context11["catch"](10);
          console.log(_context11.t6);
        case 28:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[10, 25]]);
  }));
  return _getStrategyData.apply(this, arguments);
}
function unauthenticate$1() {
  spawnCurrentUser();
  utilActor.send(NAME, DEL_CURRENT_USER);
}
var normalizePreAuthzResponse = function normalizePreAuthzResponse(authz) {
  return {
    f_type: "PreAuthzResponse",
    f_vsn: "1.0.0",
    proposer: (authz || {}).proposer,
    payer: (authz || {}).payer || [],
    authorization: (authz || {}).authorization || []
  };
};
function resolvePreAuthz(authz) {
  var resp = normalizePreAuthzResponse(authz);
  var axs = [];
  if (resp.proposer != null) axs.push(["PROPOSER", resp.proposer]);
  var _iterator = _createForOfIteratorHelper__default["default"](resp.payer || []),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var az = _step.value;
      axs.push(["PAYER", az]);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var _iterator2 = _createForOfIteratorHelper__default["default"](resp.authorization || []),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _az = _step2.value;
      axs.push(["AUTHORIZER", _az]);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  var result = axs.map(function (_ref8) {
    var _ref9 = _slicedToArray__default["default"](_ref8, 2),
      role = _ref9[0],
      az = _ref9[1];
    return {
      tempId: [az.identity.address, az.identity.keyId].join("|"),
      addr: az.identity.address,
      keyId: az.identity.keyId,
      signingFunction: function signingFunction(signable) {
        return execService({
          service: az,
          msg: signable
        });
      },
      role: {
        proposer: role === "PROPOSER",
        payer: role === "PAYER",
        authorizer: role === "AUTHORIZER"
      }
    };
  });
  return result;
}

/**
 * @description
 * Produces the needed authorization details for the current user to submit transactions to Flow
 * It defines a signing function that connects to a user's wallet provider to produce signatures to submit transactions.
 *
 * @param {Object} account - Account object
 * @returns {Promise<Object>} - Account object with signing function
 */
function authorization(_x11) {
  return _authorization.apply(this, arguments);
}
/**
 * @description
 * The callback passed to subscribe will be called when the user authenticates and un-authenticates, making it easy to update the UI accordingly.
 *
 * @param {Function} callback - Callback function
 * @returns {Function} - Unsubscribe function
 */
function _authorization() {
  _authorization = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee14(account) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          spawnCurrentUser();
          return _context14.abrupt("return", _objectSpread__default["default"](_objectSpread__default["default"]({}, account), {}, {
            tempId: "CURRENT_USER",
            resolve: function resolve(account, preSignable) {
              return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee13() {
                var user, authz, preAuthz, windowRef;
                return _regeneratorRuntime__default["default"]().wrap(function _callee13$(_context13) {
                  while (1) switch (_context13.prev = _context13.next) {
                    case 0:
                      _context13.next = 2;
                      return authenticate$1({
                        redir: true
                      });
                    case 2:
                      user = _context13.sent;
                      authz = serviceOfType(user.services, "authz");
                      preAuthz = serviceOfType(user.services, "pre-authz");
                      if (!preAuthz) {
                        _context13.next = 11;
                        break;
                      }
                      _context13.t0 = resolvePreAuthz;
                      _context13.next = 9;
                      return execService({
                        service: preAuthz,
                        msg: preSignable
                      });
                    case 9:
                      _context13.t1 = _context13.sent;
                      return _context13.abrupt("return", (0, _context13.t0)(_context13.t1));
                    case 11:
                      if (!authz) {
                        _context13.next = 14;
                        break;
                      }
                      if (isMobile() && authz.method === "WC/RPC") {
                        windowRef = window.open("", "_blank");
                      }
                      return _context13.abrupt("return", _objectSpread__default["default"](_objectSpread__default["default"]({}, account), {}, {
                        tempId: "CURRENT_USER",
                        resolve: null,
                        addr: utilAddress.sansPrefix(authz.identity.address),
                        keyId: authz.identity.keyId,
                        sequenceNum: null,
                        signature: null,
                        signingFunction: function signingFunction(signable) {
                          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee12() {
                            return _regeneratorRuntime__default["default"]().wrap(function _callee12$(_context12) {
                              while (1) switch (_context12.prev = _context12.next) {
                                case 0:
                                  _context12.t0 = normalizeCompositeSignature;
                                  _context12.next = 3;
                                  return execService({
                                    service: authz,
                                    msg: signable,
                                    opts: {
                                      includeOlderJsonRpcCall: true,
                                      windowRef: windowRef
                                    }
                                  });
                                case 3:
                                  _context12.t1 = _context12.sent;
                                  return _context12.abrupt("return", (0, _context12.t0)(_context12.t1));
                                case 5:
                                case "end":
                                  return _context12.stop();
                              }
                            }, _callee12);
                          }))();
                        }
                      }));
                    case 14:
                      throw new Error("No Authz or PreAuthz Service configured for CURRENT_USER");
                    case 15:
                    case "end":
                      return _context13.stop();
                  }
                }, _callee13);
              }))();
            }
          }));
        case 2:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return _authorization.apply(this, arguments);
}
function subscribe(callback) {
  spawnCurrentUser();
  var EXIT = "@EXIT";
  var self = utilActor.spawn( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee7(ctx) {
      var letter;
      return _regeneratorRuntime__default["default"]().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            ctx.send(NAME, utilActor.SUBSCRIBE);
          case 1:
            _context7.next = 4;
            return ctx.receive();
          case 4:
            letter = _context7.sent;
            if (!(letter.tag === EXIT)) {
              _context7.next = 8;
              break;
            }
            ctx.send(NAME, utilActor.UNSUBSCRIBE);
            return _context7.abrupt("return");
          case 8:
            callback(letter.data);
            _context7.next = 1;
            break;
          case 11:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function (_x12) {
      return _ref10.apply(this, arguments);
    };
  }());
  return function () {
    return utilActor.send(self, EXIT);
  };
}

/**
 * @description - Gets the current user
 * @returns {Promise<CurrentUser>} - User object
 */
function snapshot() {
  spawnCurrentUser();
  return utilActor.send(NAME, SNAPSHOT, null, {
    expectReply: true,
    timeout: 0
  });
}
function resolveArgument() {
  return _resolveArgument.apply(this, arguments);
}
function _resolveArgument() {
  _resolveArgument = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee16() {
    var _yield$authenticate, addr;
    return _regeneratorRuntime__default["default"]().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return authenticate$1();
        case 2:
          _yield$authenticate = _context16.sent;
          addr = _yield$authenticate.addr;
          return _context16.abrupt("return", sdk.arg(utilAddress.withPrefix(addr), t__namespace.Address));
        case 5:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return _resolveArgument.apply(this, arguments);
}
var makeSignable = function makeSignable(msg) {
  utilInvariant.invariant(/^[0-9a-f]+$/i.test(msg), "Message must be a hex string");
  return {
    message: msg
  };
};

/**
 * @description - A method to use allowing the user to personally sign data via FCL Compatible Wallets/Services.
 * @param {string} msg - Message to sign
 * @returns {Promise<CompositeSignature>} - Array of CompositeSignatures
 */
function signUserMessage(_x13) {
  return _signUserMessage.apply(this, arguments);
}
function _signUserMessage() {
  _signUserMessage = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee17(msg) {
    var user, signingService, response;
    return _regeneratorRuntime__default["default"]().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          spawnCurrentUser();
          _context17.next = 3;
          return authenticate$1({
            redir: true
          });
        case 3:
          user = _context17.sent;
          signingService = serviceOfType(user.services, "user-signature");
          utilInvariant.invariant(signingService, "Current user must have authorized a signing service.");
          _context17.prev = 6;
          _context17.next = 9;
          return execService({
            service: signingService,
            msg: makeSignable(msg)
          });
        case 9:
          response = _context17.sent;
          if (!Array.isArray(response)) {
            _context17.next = 14;
            break;
          }
          return _context17.abrupt("return", response.map(function (compSigs) {
            return normalizeCompositeSignature(compSigs);
          }));
        case 14:
          return _context17.abrupt("return", [normalizeCompositeSignature(response)]);
        case 15:
          _context17.next = 20;
          break;
        case 17:
          _context17.prev = 17;
          _context17.t0 = _context17["catch"](6);
          return _context17.abrupt("return", _context17.t0);
        case 20:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[6, 17]]);
  }));
  return _signUserMessage.apply(this, arguments);
}
var currentUser = function currentUser() {
  return {
    authenticate: authenticate$1,
    unauthenticate: unauthenticate$1,
    authorization: authorization,
    signUserMessage: signUserMessage,
    subscribe: subscribe,
    snapshot: snapshot,
    resolveArgument: resolveArgument,
    getStrategyData: getStrategyData$1
  };
};
currentUser.authenticate = authenticate$1;
currentUser.unauthenticate = unauthenticate$1;
currentUser.authorization = authorization;
currentUser.signUserMessage = signUserMessage;
currentUser.subscribe = subscribe;
currentUser.snapshot = snapshot;
currentUser.resolveArgument = resolveArgument;
currentUser.getStrategyData = getStrategyData$1;

/** As the current user Mutate the Flow Blockchain
 *
 *  @arg {Object} opts - Mutation Options and configuration
 *  @arg {string} opts.cadence - Cadence Transaction used to mutate Flow
 *  @arg {ArgsFn} opts.args - Arguments passed to cadence transaction
 *  @arg {Object} opts.template - Interaction Template for a transaction
 *  @arg {number} opts.limit - Compute Limit for transaction
 *  @returns {string} Transaction Id
 *
 *  Where:
 *    @callback ArgsFn
 *    @arg {ArgFn}  arg - Argument function to define a single argument
 *    @arg {Object} t   - Cadence Types object used to define the type
 *    @returns {args[]}
 *
 *    @callback ArgFn
 *    @arg {Any}  value - the value of the argument
 *    @arg {Type} type  - the cadence type of the value
 *    @returns {arg}
 *
 *  Example:
 *    fcl.mutate({
 *      cadence: `
 *        transaction(a: Int, b: Int, c: Address) {
 *          prepare(acct: AuthAccount) {
 *            log(acct)
 *            log(a)
 *            log(b)
 *            log(c)
 *          }
 *        }
 *      `,
 *      args: (arg, t) => [
 *        arg(6, t.Int),
 *        arg(7, t.Int),
 *        arg("0xba1132bc08f82fe2", t.Address),
 *      ],
 *    })
 *
 *
 *  Options:
 *    type Options = {
 *      template: InteractionTemplate | String // InteractionTemplate or url to one
 *      cadence: String!,
 *      args: (arg, t) => Array<Arg>,
 *      limit: Number,
 *      authz: AuthzFn, // will overload the trinity of signatory roles
 *      proposer: AuthzFn, // will overload the proposer signatory role
 *      payer: AuthzFn, // will overload the payer signatory role
 *      authorizations: [AuthzFn], // an array of authorization functions used as authorizations signatory roles
 *    }
 */
function mutate() {
  return _mutate.apply(this, arguments);
}
function _mutate() {
  _mutate = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2() {
    var opts,
      txid,
      authz,
      _args2 = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          opts = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          _context2.prev = 1;
          _context2.next = 4;
          return preMutate(opts);
        case 4:
          _context2.next = 6;
          return prepTemplateOpts(opts);
        case 6:
          opts = _context2.sent;
          _context2.next = 9;
          return sdk__namespace.config().get("fcl.authz", currentUser().authorization);
        case 9:
          authz = _context2.sent;
          txid = sdk__namespace.config().overload(opts.dependencies || {}, /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee() {
            return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return",
                  // prettier-ignore
                  sdk__namespace.send([sdk__namespace.transaction(opts.cadence), sdk__namespace.args(normalizeArgs(opts.args || [])), opts.limit && isNumber(opts.limit) && sdk__namespace.limit(opts.limit),
                  // opts.proposer > opts.authz > authz
                  sdk__namespace.proposer(opts.proposer || opts.authz || authz),
                  // opts.payer > opts.authz > authz
                  sdk__namespace.payer(opts.payer || opts.authz || authz),
                  // opts.authorizations > [opts.authz > authz]
                  sdk__namespace.authorizations(opts.authorizations || [opts.authz || authz])]).then(sdk__namespace.decode));
                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          })));
          return _context2.abrupt("return", txid);
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](1);
          throw _context2.t0;
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 14]]);
  }));
  return _mutate.apply(this, arguments);
}

var onMessageFromFCL = function onMessageFromFCL(messageType) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var buildData = function buildData(data) {
    var _data$body;
    if (data.deprecated) console.warn("DEPRECATION NOTICE", data.deprecated.message);
    data === null || data === void 0 ? true : (_data$body = data.body) === null || _data$body === void 0 ? true : delete _data$body.interaction;
    return data;
  };
  var internal = function internal(e) {
    var data = e.data;
    if (_typeof__default["default"](data) !== "object") return;
    if (_typeof__default["default"](data) == null) return;
    if (data.type !== messageType) return;
    cb(buildData(data));
  };
  window.addEventListener("message", internal);
  return function () {
    return window.removeEventListener("message", internal);
  };
};

var sendMsgToFCL = function sendMsgToFCL(type) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (window.location !== window.parent.location) {
    window.parent.postMessage(_objectSpread__default["default"](_objectSpread__default["default"]({}, msg), {}, {
      type: type
    }), "*");
  } else if (window.opener) {
    window.opener.postMessage(_objectSpread__default["default"](_objectSpread__default["default"]({}, msg), {}, {
      type: type
    }), "*");
  } else {
    throw new Error("Unable to communicate with parent FCL instance");
  }
};
var ready = function ready(cb) {
  onMessageFromFCL("FCL:VIEW:READY:RESPONSE", cb);
  sendMsgToFCL("FCL:VIEW:READY");
};
var close = function close() {
  sendMsgToFCL("FCL:VIEW:CLOSE");
};
var approve = function approve(data) {
  sendMsgToFCL("FCL:VIEW:RESPONSE", {
    f_type: "PollingResponse",
    f_vsn: "1.0.0",
    status: "APPROVED",
    reason: null,
    data: data
  });
};
var decline = function decline(reason) {
  sendMsgToFCL("FCL:VIEW:RESPONSE", {
    f_type: "PollingResponse",
    f_vsn: "1.0.0",
    status: "DECLINED",
    reason: reason,
    data: null
  });
};
var redirect = function redirect(data) {
  sendMsgToFCL("FCL:VIEW:RESPONSE", {
    f_type: "PollingResponse",
    f_vsn: "1.0.0",
    status: "REDIRECT",
    reason: null,
    data: data
  });
};

function CompositeSignature(addr, keyId, signature) {
  this.f_type = COMPOSITE_SIGNATURE_PRAGMA.f_type;
  this.f_vsn = COMPOSITE_SIGNATURE_PRAGMA.f_vsn;
  this.addr = utilAddress.withPrefix(addr);
  this.keyId = Number(keyId);
  this.signature = signature;
}

var rightPaddedHexBuffer = function rightPaddedHexBuffer(value, pad) {
  return rlp.Buffer.from(value.padEnd(pad * 2, "0"), "hex");
};
var leftPaddedHexBuffer = function leftPaddedHexBuffer(value, pad) {
  return rlp.Buffer.from(value.padStart(pad * 2, "0"), "hex");
};
var addressBuffer = function addressBuffer(addr) {
  return leftPaddedHexBuffer(addr, 8);
};
var nonceBuffer = function nonceBuffer(nonce) {
  return rlp.Buffer.from(nonce, "hex");
};
var encodeAccountProof = function encodeAccountProof(_ref) {
  var address = _ref.address,
    nonce = _ref.nonce,
    appIdentifier = _ref.appIdentifier;
  var includeDomainTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  utilInvariant.invariant(address, "Encode Message For Provable Authn Error: address must be defined");
  utilInvariant.invariant(nonce, "Encode Message For Provable Authn Error: nonce must be defined");
  utilInvariant.invariant(appIdentifier, "Encode Message For Provable Authn Error: appIdentifier must be defined");
  utilInvariant.invariant(nonce.length >= 64, "Encode Message For Provable Authn Error: nonce must be minimum of 32 bytes");
  var ACCOUNT_PROOF_DOMAIN_TAG = rightPaddedHexBuffer(rlp.Buffer.from("FCL-ACCOUNT-PROOF-V0.0").toString("hex"), 32);
  if (includeDomainTag) {
    return rlp.Buffer.concat([ACCOUNT_PROOF_DOMAIN_TAG, rlp.encode([appIdentifier, addressBuffer(utilAddress.sansPrefix(address)), nonceBuffer(nonce)])]).toString("hex");
  }
  return rlp.encode([appIdentifier, addressBuffer(utilAddress.sansPrefix(address)), nonceBuffer(nonce)]).toString("hex");
};

function injectExtService(service) {
  if (service.type === "authn" && service.endpoint != null) {
    if (!Array.isArray(window.fcl_extensions)) {
      window.fcl_extensions = [];
    }
    window.fcl_extensions.push(service);
  } else {
    console.warn("Authn service is required");
  }
}

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  sendMsgToFCL: sendMsgToFCL,
  ready: ready,
  close: close,
  approve: approve,
  decline: decline,
  redirect: redirect,
  onMessageFromFCL: onMessageFromFCL,
  encodeMessageFromSignable: sdk.encodeMessageFromSignable,
  CompositeSignature: CompositeSignature,
  encodeAccountProof: encodeAccountProof,
  injectExtService: injectExtService
});

var ACCOUNT_PROOF = "ACCOUNT_PROOF";
var USER_SIGNATURE = "USER_SIGNATURE";
var validateArgs = function validateArgs(args) {
  if (args.appIdentifier) {
    var appIdentifier = args.appIdentifier,
      address = args.address,
      nonce = args.nonce,
      signatures = args.signatures;
    utilInvariant.invariant(isString(appIdentifier), "verifyAccountProof({ appIdentifier }) -- appIdentifier must be a string");
    utilInvariant.invariant(isString(address) && utilAddress.sansPrefix(address).length === 16, "verifyAccountProof({ address }) -- address must be a valid address");
    utilInvariant.invariant(/^[0-9a-f]+$/i.test(nonce), "nonce must be a hex string");
    utilInvariant.invariant(Array.isArray(signatures) && signatures.every(function (sig, i, arr) {
      return sig.f_type === "CompositeSignature";
    }), "Must include an Array of CompositeSignatures to verify");
    utilInvariant.invariant(signatures.map(function (cs) {
      return cs.addr;
    }).every(function (addr, i, arr) {
      return addr === arr[0];
    }), "User signatures to be verified must be from a single account address");
    return true;
  } else {
    var message = args.message,
      _address = args.address,
      compSigs = args.compSigs;
    utilInvariant.invariant(/^[0-9a-f]+$/i.test(message), "Signed message must be a hex string");
    utilInvariant.invariant(isString(_address) && utilAddress.sansPrefix(_address).length === 16, "verifyUserSignatures({ address }) -- address must be a valid address");
    utilInvariant.invariant(Array.isArray(compSigs) && compSigs.every(function (sig, i, arr) {
      return sig.f_type === "CompositeSignature";
    }), "Must include an Array of CompositeSignatures to verify");
    utilInvariant.invariant(compSigs.map(function (cs) {
      return cs.addr;
    }).every(function (addr, i, arr) {
      return addr === arr[0];
    }), "User signatures to be verified must be from a single account address");
    return true;
  }
};

// TODO: pass in option for contract but we're connected to testnet
// log address + network -> in sync?
var getVerifySignaturesScript = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(sig, opts) {
    var verifyFunction, network, fclCryptoContract;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          verifyFunction = sig === "ACCOUNT_PROOF" ? "verifyAccountProofSignatures" : "verifyUserSignatures";
          _context.next = 3;
          return getChainId();
        case 3:
          network = _context.sent;
          utilInvariant.invariant(opts.fclCryptoContract || network === "testnet" || network === "mainnet", "${verifyFunction}({ fclCryptoContract }) -- config.flow.network must be specified (testnet || mainnet) or contract address provided via opts.fclCryptoContract");
          if (opts.fclCryptoContract) {
            fclCryptoContract = opts.fclCryptoContract;
          } else {
            fclCryptoContract = network === "testnet" ? "0x74daa6f9c7ef24b1" : "0xb4b82a1c9d21d284";
          }
          return _context.abrupt("return", "\n      import FCLCrypto from ".concat(fclCryptoContract, "\n\n      pub fun main(\n          address: Address, \n          message: String, \n          keyIndices: [Int], \n          signatures: [String]\n      ): Bool {\n        return FCLCrypto.").concat(verifyFunction, "(address: address, message: message, keyIndices: keyIndices, signatures: signatures)\n      }\n    "));
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getVerifySignaturesScript(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Verify a valid account proof signature or signatures for an account on Flow.
 *
 * @param {string} appIdentifier - A message string in hexadecimal format
 * @param {Object} accountProofData - An object consisting of address, nonce, and signatures
 * @param {string} accountProofData.address - A Flow account address
 * @param {string} accountProofData.nonce - A random string in hexadecimal format (minimum 32 bytes in total, i.e 64 hex characters)
 * @param {Object[]} accountProofData.signatures - An array of composite signatures to verify
 * @param {Object} [opts={}] - Options object
 * @param {string} opts.fclCryptoContract - An optional override Flow account address where the FCLCrypto contract is deployed
 * @return {bool}
 *
 * @example
 *
 *  const accountProofData = {
 *   address: "0x123",
 *   nonce: "F0123"
 *   signatures: [{f_type: "CompositeSignature", f_vsn: "1.0.0", addr: "0x123", keyId: 0, signature: "abc123"}],
 *  }
 *
 *  const isValid = await fcl.AppUtils.verifyAccountProof(
 *    "AwesomeAppId",
 *    accountProofData,
 *    {fclCryptoContract}
 *  )
 */

function verifyAccountProof(_x3, _x4) {
  return _verifyAccountProof.apply(this, arguments);
}

/**
 * Verify a valid signature/s for an account on Flow.
 *
 * @param {string} msg - A message string in hexadecimal format
 * @param {Array} compSigs - An array of Composite Signatures
 * @param {string} compSigs[].addr - The account address
 * @param {number} compSigs[].keyId - The account keyId
 * @param {string} compSigs[].signature - The signature to verify
 * @param {Object} [opts={}] - Options object
 * @param {string} opts.fclCryptoContract - An optional override of Flow account address where the FCLCrypto contract is deployed
 * @return {bool}
 *
 * @example
 *
 *  const isValid = await fcl.AppUtils.verifyUserSignatures(
 *    Buffer.from('FOO').toString("hex"),
 *    [{f_type: "CompositeSignature", f_vsn: "1.0.0", addr: "0x123", keyId: 0, signature: "abc123"}],
 *    {fclCryptoContract}
 *  )
 */
function _verifyAccountProof() {
  _verifyAccountProof = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(appIdentifier, _ref2) {
    var address,
      nonce,
      signatures,
      opts,
      message,
      signaturesArr,
      keyIndices,
      _iterator,
      _step,
      el,
      _args2 = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          address = _ref2.address, nonce = _ref2.nonce, signatures = _ref2.signatures;
          opts = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          validateArgs({
            appIdentifier: appIdentifier,
            address: address,
            nonce: nonce,
            signatures: signatures
          });
          message = encodeAccountProof({
            address: address,
            nonce: nonce,
            appIdentifier: appIdentifier
          }, false);
          signaturesArr = [];
          keyIndices = [];
          _iterator = _createForOfIteratorHelper__default["default"](signatures);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              el = _step.value;
              signaturesArr.push(el.signature);
              keyIndices.push(el.keyId.toString());
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          _context2.t0 = query;
          _context2.next = 11;
          return getVerifySignaturesScript(ACCOUNT_PROOF, opts);
        case 11:
          _context2.t1 = _context2.sent;
          _context2.t2 = function args(arg, t) {
            return [arg(utilAddress.withPrefix(address), t.Address), arg(message, t.String), arg(keyIndices, t.Array(t.Int)), arg(signaturesArr, t.Array(t.String))];
          };
          _context2.t3 = {
            cadence: _context2.t1,
            args: _context2.t2
          };
          return _context2.abrupt("return", (0, _context2.t0)(_context2.t3));
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _verifyAccountProof.apply(this, arguments);
}
function verifyUserSignatures$1(_x5, _x6) {
  return _verifyUserSignatures.apply(this, arguments);
}
function _verifyUserSignatures() {
  _verifyUserSignatures = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee3(message, compSigs) {
    var opts,
      address,
      signaturesArr,
      keyIndices,
      _iterator2,
      _step2,
      el,
      _args3 = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          opts = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
          address = utilAddress.withPrefix(compSigs[0].addr);
          validateArgs({
            message: message,
            address: address,
            compSigs: compSigs
          });
          signaturesArr = [];
          keyIndices = [];
          _iterator2 = _createForOfIteratorHelper__default["default"](compSigs);
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              el = _step2.value;
              signaturesArr.push(el.signature);
              keyIndices.push(el.keyId.toString());
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          _context3.t0 = query;
          _context3.next = 10;
          return getVerifySignaturesScript(USER_SIGNATURE, opts);
        case 10:
          _context3.t1 = _context3.sent;
          _context3.t2 = function args(arg, t) {
            return [arg(address, t.Address), arg(message, t.String), arg(keyIndices, t.Array(t.Int)), arg(signaturesArr, t.Array(t.String))];
          };
          _context3.t3 = {
            cadence: _context3.t1,
            args: _context3.t2
          };
          return _context3.abrupt("return", (0, _context3.t0)(_context3.t3));
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _verifyUserSignatures.apply(this, arguments);
}

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  verifyAccountProof: verifyAccountProof,
  verifyUserSignatures: verifyUserSignatures$1
});

/**
 * Verify a valid signature/s for an account on Flow.
 *
 * @deprecated since version '1.0.0-alpha.0', use AppUtils.verifyUserSignatures instead
 *
 */
var verifyUserSignatures = utilLogger.log.deprecate({
  pkg: "FCL",
  subject: "fcl.verifyUserSignatures()",
  message: "Please use fcl.AppUtils.verifyUserSignatures()",
  callback: function verifyUserSignatures(message, compSigs) {
    return verifyUserSignatures$1(message, compSigs);
  }
});

var serialize = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee() {
    var args,
      opts,
      resolveFunction,
      _args = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          args = _args.length > 0 && _args[0] !== undefined ? _args[0] : [];
          opts = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _context.next = 4;
          return sdk.config.first(["sdk.resolve"], opts.resolve || sdk.resolve);
        case 4:
          resolveFunction = _context.sent;
          if (!Array.isArray(args)) {
            _context.next = 9;
            break;
          }
          _context.next = 8;
          return sdk.pipe(sdk.interaction(), args);
        case 8:
          args = _context.sent;
        case 9:
          _context.t0 = JSON;
          _context.t1 = sdk.createSignableVoucher;
          _context.next = 13;
          return resolveFunction(args);
        case 13:
          _context.t2 = _context.sent;
          _context.t3 = (0, _context.t1)(_context.t2);
          return _context.abrupt("return", _context.t0.stringify.call(_context.t0, _context.t3, null, 2));
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function serialize() {
    return _ref.apply(this, arguments);
  };
}();

var _HANDLERS$1;
var RATE$1 = 2500;
var POLL = "POLL";
var fetchTxStatus = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(transactionId) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", sdk.send([sdk.getTransactionStatus(transactionId)]).then(sdk.decode));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchTxStatus(_x) {
    return _ref.apply(this, arguments);
  };
}();
var isExpired = function isExpired(tx) {
  return tx.status === 5;
};
var isSealed = function isSealed(tx) {
  return tx.status >= 4;
};
var isExecuted = function isExecuted(tx) {
  return tx.status >= 3;
};
var isFinalized = function isFinalized(tx) {
  return tx.status >= 2;
};
var isPending = function isPending(tx) {
  return tx.status >= 1;
};
var isUnknown = function isUnknown(tx) {
  return tx.status >= 0;
};
var isDiff = function isDiff(cur, next) {
  return JSON.stringify(cur) !== JSON.stringify(next);
};
var HANDLERS$1 = (_HANDLERS$1 = {}, _defineProperty__default["default"](_HANDLERS$1, utilActor.INIT, function () {
  var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(ctx) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          ctx.sendSelf(POLL);
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}()), _defineProperty__default["default"](_HANDLERS$1, utilActor.SUBSCRIBE, function (ctx, letter) {
  ctx.subscribe(letter.from);
  ctx.send(letter.from, utilActor.UPDATED, ctx.all());
}), _defineProperty__default["default"](_HANDLERS$1, utilActor.UNSUBSCRIBE, function (ctx, letter) {
  ctx.unsubscribe(letter.from);
}), _defineProperty__default["default"](_HANDLERS$1, utilActor.SNAPSHOT, function () {
  var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee3(ctx, letter) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          letter.reply(ctx.all());
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}()), _defineProperty__default["default"](_HANDLERS$1, POLL, function () {
  var _ref4 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee4(ctx) {
    var tx;
    return _regeneratorRuntime__default["default"]().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return fetchTxStatus(ctx.self());
        case 3:
          tx = _context4.sent;
          _context4.next = 9;
          break;
        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", ctx.fatalError(_context4.t0));
        case 9:
          if (!isSealed(tx)) setTimeout(function () {
            return ctx.sendSelf(POLL);
          }, RATE$1);
          if (isDiff(ctx.all(), tx)) ctx.broadcast(utilActor.UPDATED, tx);
          ctx.merge(tx);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 6]]);
  }));
  return function (_x5) {
    return _ref4.apply(this, arguments);
  };
}()), _HANDLERS$1);
var scoped = function scoped(transactionId) {
  if (_typeof__default["default"](transactionId) === "object") transactionId = transactionId.transactionId;
  if (transactionId == null) throw new Error("transactionId required");
  return transactionId;
};
var spawnTransaction = function spawnTransaction(transactionId) {
  return utilActor.spawn(HANDLERS$1, scoped(transactionId));
};
function transaction(transactionId) {
  function snapshot() {
    return utilActor.snapshoter(transactionId, spawnTransaction);
  }
  function subscribe(callback) {
    return utilActor.subscriber(scoped(transactionId), spawnTransaction, callback);
  }
  function once(predicate) {
    return function innerOnce() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var suppress = opts.suppress || false;
      return new Promise(function (resolve, reject) {
        var unsub = subscribe(function (txStatus, error) {
          if ((error || txStatus.statusCode) && !suppress) {
            reject(error || txStatus.errorMessage);
            unsub();
          } else if (predicate(txStatus)) {
            resolve(txStatus);
            unsub();
          }
        });
      });
    };
  }
  return {
    snapshot: snapshot,
    subscribe: subscribe,
    onceFinalized: once(isFinalized),
    onceExecuted: once(isExecuted),
    onceSealed: once(isSealed)
  };
}
transaction.isUnknown = isUnknown;
transaction.isPending = isPending;
transaction.isFinalized = isFinalized;
transaction.isExecuted = isExecuted;
transaction.isSealed = isSealed;
transaction.isExpired = isExpired;

var _HANDLERS;
var RATE = 10000;
var UPDATED = "UPDATED";
var TICK = "TICK";
var HIGH_WATER_MARK = "hwm";
var scheduleTick = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(ctx) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = setTimeout;
          _context.t1 = function () {
            return ctx.sendSelf(TICK);
          };
          _context.next = 4;
          return sdk.config().get("fcl.eventPollRate", RATE);
        case 4:
          _context.t2 = _context.sent;
          return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t2));
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function scheduleTick(_x) {
    return _ref.apply(this, arguments);
  };
}();
var HANDLERS = (_HANDLERS = {}, _defineProperty__default["default"](_HANDLERS, TICK, function () {
  var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(ctx) {
    var hwm, next, data, _iterator, _step, d;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (ctx.hasSubs()) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return");
        case 2:
          hwm = ctx.get(HIGH_WATER_MARK);
          if (!(hwm == null)) {
            _context2.next = 18;
            break;
          }
          _context2.t0 = ctx;
          _context2.t1 = HIGH_WATER_MARK;
          _context2.next = 8;
          return sdk.block();
        case 8:
          _context2.t2 = _context2.sent;
          _context2.t0.put.call(_context2.t0, _context2.t1, _context2.t2);
          _context2.t3 = ctx;
          _context2.t4 = TICK;
          _context2.next = 14;
          return scheduleTick(ctx);
        case 14:
          _context2.t5 = _context2.sent;
          _context2.t3.put.call(_context2.t3, _context2.t4, _context2.t5);
          _context2.next = 34;
          break;
        case 18:
          _context2.next = 20;
          return sdk.block();
        case 20:
          next = _context2.sent;
          ctx.put(HIGH_WATER_MARK, next);
          if (!(hwm.height < next.height)) {
            _context2.next = 28;
            break;
          }
          _context2.next = 25;
          return sdk.send([sdk.getEventsAtBlockHeightRange(ctx.self(), hwm.height + 1, next.height)]).then(sdk.decode);
        case 25:
          data = _context2.sent;
          _iterator = _createForOfIteratorHelper__default["default"](data);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              d = _step.value;
              ctx.broadcast(UPDATED, d.data);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        case 28:
          _context2.t6 = ctx;
          _context2.t7 = TICK;
          _context2.next = 32;
          return scheduleTick(ctx);
        case 32:
          _context2.t8 = _context2.sent;
          _context2.t6.put.call(_context2.t6, _context2.t7, _context2.t8);
        case 34:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}()), _defineProperty__default["default"](_HANDLERS, utilActor.SUBSCRIBE, function () {
  var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee3(ctx, letter) {
    return _regeneratorRuntime__default["default"]().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (ctx.hasSubs()) {
            _context3.next = 7;
            break;
          }
          _context3.t0 = ctx;
          _context3.t1 = TICK;
          _context3.next = 5;
          return scheduleTick(ctx);
        case 5:
          _context3.t2 = _context3.sent;
          _context3.t0.put.call(_context3.t0, _context3.t1, _context3.t2);
        case 7:
          ctx.subscribe(letter.from);
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}()), _defineProperty__default["default"](_HANDLERS, utilActor.UNSUBSCRIBE, function (ctx, letter) {
  ctx.unsubscribe(letter.from);
  if (!ctx.hasSubs()) {
    clearTimeout(ctx.get(TICK));
    ctx["delete"](TICK);
    ctx["delete"](HIGH_WATER_MARK);
  }
}), _HANDLERS);
var spawnEvents = function spawnEvents(key) {
  return utilActor.spawn(HANDLERS, key);
};
function events(key) {
  return {
    subscribe: function subscribe(callback) {
      return utilActor.subscriber(key, spawnEvents, callback);
    }
  };
}

var sha3 = {};

var sponge = {};

var permute = {};

var chi = {};

var copy = function copy(I, i) {
  return function (O, o) {
    var oi = o * 2;
    var ii = i * 2;
    O[oi] = I[ii];
    O[oi + 1] = I[ii + 1];
  };
};
var copy_1 = copy;

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var _copy = _interopRequireDefault(copy_1);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  var chi = function chi(_ref) {
    var A = _ref.A,
      C = _ref.C;
    for (var y = 0; y < 25; y += 5) {
      for (var x = 0; x < 5; x++) {
        (0, _copy["default"])(A, y + x)(C, x);
      }
      for (var _x = 0; _x < 5; _x++) {
        var xy = (y + _x) * 2;
        var x1 = (_x + 1) % 5 * 2;
        var x2 = (_x + 2) % 5 * 2;
        A[xy] ^= ~C[x1] & C[x2];
        A[xy + 1] ^= ~C[x1 + 1] & C[x2 + 1];
      }
    }
  };
  var _default = chi;
  exports["default"] = _default;
})(chi);

var iota = {};

var roundConstants = {};

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var ROUND_CONSTANTS = new Uint32Array([0, 1, 0, 32898, 2147483648, 32906, 2147483648, 2147516416, 0, 32907, 0, 2147483649, 2147483648, 2147516545, 2147483648, 32777, 0, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 2147483648, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 0, 32778, 2147483648, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 0, 2147483649, 2147483648, 2147516424]);
  var _default = ROUND_CONSTANTS;
  exports["default"] = _default;
})(roundConstants);

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var _roundConstants = _interopRequireDefault(roundConstants);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  var iota = function iota(_ref) {
    var A = _ref.A,
      roundIndex = _ref.roundIndex;
    var i = roundIndex * 2;
    A[0] ^= _roundConstants["default"][i];
    A[1] ^= _roundConstants["default"][i + 1];
  };
  var _default = iota;
  exports["default"] = _default;
})(iota);

var rhoPi = {};

var piShuffles = {};

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var PI_SHUFFLES = [10, 7, 11, 17, 18, 3, 5, 16, 8, 21, 24, 4, 15, 23, 19, 13, 12, 2, 20, 14, 22, 9, 6, 1];
  var _default = PI_SHUFFLES;
  exports["default"] = _default;
})(piShuffles);

var rhoOffsets = {};

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var RHO_OFFSETS = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 2, 14, 27, 41, 56, 8, 25, 43, 62, 18, 39, 61, 20, 44];
  var _default = RHO_OFFSETS;
  exports["default"] = _default;
})(rhoOffsets);

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var _piShuffles = _interopRequireDefault(piShuffles);
  var _rhoOffsets = _interopRequireDefault(rhoOffsets);
  var _copy = _interopRequireDefault(copy_1);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  var rhoPi = function rhoPi(_ref) {
    var A = _ref.A,
      C = _ref.C,
      W = _ref.W;
    (0, _copy["default"])(A, 1)(W, 0);
    var H = 0;
    var L = 0;
    var Wi = 0;
    var ri = 32;
    for (var i = 0; i < 24; i++) {
      var j = _piShuffles["default"][i];
      var r = _rhoOffsets["default"][i];
      (0, _copy["default"])(A, j)(C, 0);
      H = W[0];
      L = W[1];
      ri = 32 - r;
      Wi = r < 32 ? 0 : 1;
      W[Wi] = H << r | L >>> ri;
      W[(Wi + 1) % 2] = L << r | H >>> ri;
      (0, _copy["default"])(W, 0)(A, j);
      (0, _copy["default"])(C, 0)(W, 0);
    }
  };
  var _default = rhoPi;
  exports["default"] = _default;
})(rhoPi);

var theta = {};

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var _copy = _interopRequireDefault(copy_1);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  var theta = function theta(_ref) {
    var A = _ref.A,
      C = _ref.C,
      D = _ref.D,
      W = _ref.W;
    var H = 0;
    var L = 0;
    for (var x = 0; x < 5; x++) {
      var x20 = x * 2;
      var x21 = (x + 5) * 2;
      var x22 = (x + 10) * 2;
      var x23 = (x + 15) * 2;
      var x24 = (x + 20) * 2;
      C[x20] = A[x20] ^ A[x21] ^ A[x22] ^ A[x23] ^ A[x24];
      C[x20 + 1] = A[x20 + 1] ^ A[x21 + 1] ^ A[x22 + 1] ^ A[x23 + 1] ^ A[x24 + 1];
    }
    for (var _x = 0; _x < 5; _x++) {
      (0, _copy["default"])(C, (_x + 1) % 5)(W, 0);
      H = W[0];
      L = W[1];
      W[0] = H << 1 | L >>> 31;
      W[1] = L << 1 | H >>> 31;
      D[_x * 2] = C[(_x + 4) % 5 * 2] ^ W[0];
      D[_x * 2 + 1] = C[(_x + 4) % 5 * 2 + 1] ^ W[1];
      for (var y = 0; y < 25; y += 5) {
        A[(y + _x) * 2] ^= D[_x * 2];
        A[(y + _x) * 2 + 1] ^= D[_x * 2 + 1];
      }
    }
  };
  var _default = theta;
  exports["default"] = _default;
})(theta);

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var _chi = _interopRequireDefault(chi);
  var _iota = _interopRequireDefault(iota);
  var _rhoPi = _interopRequireDefault(rhoPi);
  var _theta = _interopRequireDefault(theta);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  var permute = function permute() {
    var C = new Uint32Array(10);
    var D = new Uint32Array(10);
    var W = new Uint32Array(2);
    return function (A) {
      for (var roundIndex = 0; roundIndex < 24; roundIndex++) {
        (0, _theta["default"])({
          A: A,
          C: C,
          D: D,
          W: W
        });
        (0, _rhoPi["default"])({
          A: A,
          C: C,
          W: W
        });
        (0, _chi["default"])({
          A: A,
          C: C
        });
        (0, _iota["default"])({
          A: A,
          roundIndex: roundIndex
        });
      }
      C.fill(0);
      D.fill(0);
      W.fill(0);
    };
  };
  var _default = permute;
  exports["default"] = _default;
})(permute);

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var _buffer = require$$0__default["default"];
  var _permute = _interopRequireDefault(permute);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  var xorWords = function xorWords(I, O) {
    for (var i = 0; i < I.length; i += 8) {
      var o = i / 4;
      O[o] ^= I[i + 7] << 24 | I[i + 6] << 16 | I[i + 5] << 8 | I[i + 4];
      O[o + 1] ^= I[i + 3] << 24 | I[i + 2] << 16 | I[i + 1] << 8 | I[i];
    }
    return O;
  };
  var readWords = function readWords(I, O) {
    for (var o = 0; o < O.length; o += 8) {
      var i = o / 4;
      O[o] = I[i + 1];
      O[o + 1] = I[i + 1] >>> 8;
      O[o + 2] = I[i + 1] >>> 16;
      O[o + 3] = I[i + 1] >>> 24;
      O[o + 4] = I[i];
      O[o + 5] = I[i] >>> 8;
      O[o + 6] = I[i] >>> 16;
      O[o + 7] = I[i] >>> 24;
    }
    return O;
  };
  var Sponge = function Sponge(_ref) {
    var _this = this;
    var capacity = _ref.capacity,
      padding = _ref.padding;
    var keccak = (0, _permute["default"])();
    var stateSize = 200;
    var blockSize = capacity / 8;
    var queueSize = stateSize - capacity / 4;
    var queueOffset = 0;
    var state = new Uint32Array(stateSize / 4);
    var queue = _buffer.Buffer.allocUnsafe(queueSize);
    this.absorb = function (buffer) {
      for (var i = 0; i < buffer.length; i++) {
        queue[queueOffset] = buffer[i];
        queueOffset += 1;
        if (queueOffset >= queueSize) {
          xorWords(queue, state);
          keccak(state);
          queueOffset = 0;
        }
      }
      return _this;
    };
    this.squeeze = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var output = {
        buffer: options.buffer || _buffer.Buffer.allocUnsafe(blockSize),
        padding: options.padding || padding,
        queue: _buffer.Buffer.allocUnsafe(queue.length),
        state: new Uint32Array(state.length)
      };
      queue.copy(output.queue);
      for (var i = 0; i < state.length; i++) {
        output.state[i] = state[i];
      }
      output.queue.fill(0, queueOffset);
      output.queue[queueOffset] |= output.padding;
      output.queue[queueSize - 1] |= 128;
      xorWords(output.queue, output.state);
      for (var offset = 0; offset < output.buffer.length; offset += queueSize) {
        keccak(output.state);
        readWords(output.state, output.buffer.slice(offset, offset + queueSize));
      }
      return output.buffer;
    };
    this.reset = function () {
      queue.fill(0);
      state.fill(0);
      queueOffset = 0;
      return _this;
    };
    return this;
  };
  var _default = Sponge;
  exports["default"] = _default;
})(sponge);

(function (exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = exports.SHAKE = exports.SHA3Hash = exports.SHA3 = exports.Keccak = void 0;
  var _buffer = require$$0__default["default"];
  var _sponge = _interopRequireDefault(sponge);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  var createHash = function createHash(_ref) {
    var allowedSizes = _ref.allowedSizes,
      defaultSize = _ref.defaultSize,
      padding = _ref.padding;
    return function Hash() {
      var _this = this;
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSize;
      if (!this || this.constructor !== Hash) {
        return new Hash(size);
      }
      if (allowedSizes && !allowedSizes.includes(size)) {
        throw new Error("Unsupported hash length");
      }
      var sponge = new _sponge["default"]({
        capacity: size
      });
      this.update = function (input) {
        var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
        if (_buffer.Buffer.isBuffer(input)) {
          sponge.absorb(input);
          return _this;
        }
        if (typeof input === "string") {
          return _this.update(_buffer.Buffer.from(input, encoding));
        }
        throw new TypeError("Not a string or buffer");
      };
      this.digest = function () {
        var formatOrOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "binary";
        var options = typeof formatOrOptions === "string" ? {
          format: formatOrOptions
        } : formatOrOptions;
        var buffer = sponge.squeeze({
          buffer: options.buffer,
          padding: options.padding || padding
        });
        if (options.format && options.format !== "binary") {
          return buffer.toString(options.format);
        }
        return buffer;
      };
      this.reset = function () {
        sponge.reset();
        return _this;
      };
      return this;
    };
  };
  var Keccak = createHash({
    allowedSizes: [224, 256, 384, 512],
    defaultSize: 512,
    padding: 1
  });
  exports.Keccak = Keccak;
  var SHA3 = createHash({
    allowedSizes: [224, 256, 384, 512],
    defaultSize: 512,
    padding: 6
  });
  exports.SHA3 = SHA3;
  var SHAKE = createHash({
    allowedSizes: [128, 256],
    defaultSize: 256,
    padding: 31
  });
  exports.SHAKE = SHAKE;
  var SHA3Hash = Keccak;
  exports.SHA3Hash = SHA3Hash;
  SHA3.SHA3Hash = SHA3Hash;
  var _default = SHA3;
  exports["default"] = _default;
})(sha3);

function genHash(_x) {
  return _genHash.apply(this, arguments);
}
function _genHash() {
  _genHash = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(utf8String) {
    var sha;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          sha = new sha3.SHA3(256);
          sha.update(rlp.Buffer.from(utf8String, "utf8"));
          return _context.abrupt("return", sha.digest("hex"));
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _genHash.apply(this, arguments);
}

function generateTemplateId(_x) {
  return _generateTemplateId.apply(this, arguments);
}
function _generateTemplateId() {
  _generateTemplateId = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee9(_ref) {
    var template, templateData, messages, dependencies, _arguments, encodedHex;
    return _regeneratorRuntime__default["default"]().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          template = _ref.template;
          sdk.invariant(template != undefined, "generateTemplateId({ template }) -- template must be defined");
          sdk.invariant(_typeof__default["default"](template) === "object", "generateTemplateId({ template }) -- template must be an object");
          sdk.invariant(typeof template.f_type === "InteractionTemplate", "generateTemplateId({ template }) -- template object must be an InteractionTemplate");
          template = normalizeInteractionTemplate(template);
          _context9.t0 = template.f_version;
          _context9.next = _context9.t0 === "1.0.0" ? 8 : 40;
          break;
        case 8:
          templateData = template.data;
          _context9.next = 11;
          return Promise.all(Object.keys(templateData.messages).map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(messageKey) {
              var _templateData$message, _templateData$message2;
              return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return genHash(messageKey);
                  case 2:
                    _context2.t0 = _context2.sent;
                    _context2.next = 5;
                    return Promise.all(Object.keys((_templateData$message = templateData.messages) === null || _templateData$message === void 0 ? void 0 : (_templateData$message2 = _templateData$message[messageKey]) === null || _templateData$message2 === void 0 ? void 0 : _templateData$message2.i18n).map( /*#__PURE__*/function () {
                      var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(i18nkeylanguage) {
                        var _templateData$message3, _templateData$message4, _templateData$message5;
                        return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
                          while (1) switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return genHash(i18nkeylanguage);
                            case 2:
                              _context.t0 = _context.sent;
                              _context.next = 5;
                              return genHash((_templateData$message3 = templateData.messages) === null || _templateData$message3 === void 0 ? void 0 : (_templateData$message4 = _templateData$message3[messageKey]) === null || _templateData$message4 === void 0 ? void 0 : (_templateData$message5 = _templateData$message4.i18n) === null || _templateData$message5 === void 0 ? void 0 : _templateData$message5[i18nkeylanguage]);
                            case 5:
                              _context.t1 = _context.sent;
                              return _context.abrupt("return", [_context.t0, _context.t1]);
                            case 7:
                            case "end":
                              return _context.stop();
                          }
                        }, _callee);
                      }));
                      return function (_x3) {
                        return _ref3.apply(this, arguments);
                      };
                    }()));
                  case 5:
                    _context2.t1 = _context2.sent;
                    return _context2.abrupt("return", [_context2.t0, _context2.t1]);
                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 11:
          messages = _context9.sent;
          _context9.next = 14;
          return Promise.all(Object.keys(templateData === null || templateData === void 0 ? void 0 : templateData.dependencies).map( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee5(dependencyAddressPlaceholder) {
              var _templateData$depende;
              return _regeneratorRuntime__default["default"]().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return genHash(dependencyAddressPlaceholder);
                  case 2:
                    _context5.t0 = _context5.sent;
                    _context5.next = 5;
                    return Promise.all(Object.keys(templateData === null || templateData === void 0 ? void 0 : (_templateData$depende = templateData.dependencies) === null || _templateData$depende === void 0 ? void 0 : _templateData$depende[dependencyAddressPlaceholder]).map( /*#__PURE__*/function () {
                      var _ref5 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee4(dependencyContract) {
                        var _templateData$depende2, _templateData$depende3;
                        return _regeneratorRuntime__default["default"]().wrap(function _callee4$(_context4) {
                          while (1) switch (_context4.prev = _context4.next) {
                            case 0:
                              _context4.next = 2;
                              return genHash(dependencyContract);
                            case 2:
                              _context4.t0 = _context4.sent;
                              _context4.next = 5;
                              return Promise.all(Object.keys(templateData === null || templateData === void 0 ? void 0 : (_templateData$depende2 = templateData.dependencies) === null || _templateData$depende2 === void 0 ? void 0 : (_templateData$depende3 = _templateData$depende2[dependencyAddressPlaceholder]) === null || _templateData$depende3 === void 0 ? void 0 : _templateData$depende3[dependencyContract]).map( /*#__PURE__*/function () {
                                var _ref6 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee3(dependencyContractNetwork) {
                                  var _templateData$depende4, _templateData$depende5, _templateData$depende6, _templateData$depende7, _templateData$depende8, _templateData$depende9, _templateData$depende10, _templateData$depende11, _templateData$depende12, _templateData$depende13, _templateData$depende14, _templateData$depende15, _templateData$depende16, _templateData$depende17, _templateData$depende18;
                                  return _regeneratorRuntime__default["default"]().wrap(function _callee3$(_context3) {
                                    while (1) switch (_context3.prev = _context3.next) {
                                      case 0:
                                        _context3.next = 2;
                                        return genHash(dependencyContractNetwork);
                                      case 2:
                                        _context3.t0 = _context3.sent;
                                        _context3.next = 5;
                                        return genHash(templateData === null || templateData === void 0 ? void 0 : (_templateData$depende4 = templateData.dependencies) === null || _templateData$depende4 === void 0 ? void 0 : (_templateData$depende5 = _templateData$depende4[dependencyAddressPlaceholder]) === null || _templateData$depende5 === void 0 ? void 0 : (_templateData$depende6 = _templateData$depende5[dependencyContract]) === null || _templateData$depende6 === void 0 ? void 0 : _templateData$depende6[dependencyContractNetwork].address);
                                      case 5:
                                        _context3.t1 = _context3.sent;
                                        _context3.next = 8;
                                        return genHash(templateData === null || templateData === void 0 ? void 0 : (_templateData$depende7 = templateData.dependencies) === null || _templateData$depende7 === void 0 ? void 0 : (_templateData$depende8 = _templateData$depende7[dependencyAddressPlaceholder]) === null || _templateData$depende8 === void 0 ? void 0 : (_templateData$depende9 = _templateData$depende8[dependencyContract]) === null || _templateData$depende9 === void 0 ? void 0 : _templateData$depende9[dependencyContractNetwork].contract);
                                      case 8:
                                        _context3.t2 = _context3.sent;
                                        _context3.next = 11;
                                        return genHash(templateData === null || templateData === void 0 ? void 0 : (_templateData$depende10 = templateData.dependencies) === null || _templateData$depende10 === void 0 ? void 0 : (_templateData$depende11 = _templateData$depende10[dependencyAddressPlaceholder]) === null || _templateData$depende11 === void 0 ? void 0 : (_templateData$depende12 = _templateData$depende11[dependencyContract]) === null || _templateData$depende12 === void 0 ? void 0 : _templateData$depende12[dependencyContractNetwork].fq_address);
                                      case 11:
                                        _context3.t3 = _context3.sent;
                                        _context3.next = 14;
                                        return genHash(templateData === null || templateData === void 0 ? void 0 : (_templateData$depende13 = templateData.dependencies) === null || _templateData$depende13 === void 0 ? void 0 : (_templateData$depende14 = _templateData$depende13[dependencyAddressPlaceholder]) === null || _templateData$depende14 === void 0 ? void 0 : (_templateData$depende15 = _templateData$depende14[dependencyContract]) === null || _templateData$depende15 === void 0 ? void 0 : _templateData$depende15[dependencyContractNetwork].pin);
                                      case 14:
                                        _context3.t4 = _context3.sent;
                                        _context3.next = 17;
                                        return genHash(String(templateData === null || templateData === void 0 ? void 0 : (_templateData$depende16 = templateData.dependencies) === null || _templateData$depende16 === void 0 ? void 0 : (_templateData$depende17 = _templateData$depende16[dependencyAddressPlaceholder]) === null || _templateData$depende17 === void 0 ? void 0 : (_templateData$depende18 = _templateData$depende17[dependencyContract]) === null || _templateData$depende18 === void 0 ? void 0 : _templateData$depende18[dependencyContractNetwork].pin_block_height));
                                      case 17:
                                        _context3.t5 = _context3.sent;
                                        _context3.t6 = [_context3.t1, _context3.t2, _context3.t3, _context3.t4, _context3.t5];
                                        return _context3.abrupt("return", [_context3.t0, _context3.t6]);
                                      case 20:
                                      case "end":
                                        return _context3.stop();
                                    }
                                  }, _callee3);
                                }));
                                return function (_x6) {
                                  return _ref6.apply(this, arguments);
                                };
                              }()));
                            case 5:
                              _context4.t1 = _context4.sent;
                              return _context4.abrupt("return", [_context4.t0, _context4.t1]);
                            case 7:
                            case "end":
                              return _context4.stop();
                          }
                        }, _callee4);
                      }));
                      return function (_x5) {
                        return _ref5.apply(this, arguments);
                      };
                    }()));
                  case 5:
                    _context5.t1 = _context5.sent;
                    return _context5.abrupt("return", [_context5.t0, _context5.t1]);
                  case 7:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function (_x4) {
              return _ref4.apply(this, arguments);
            };
          }()));
        case 14:
          dependencies = _context9.sent;
          _context9.next = 17;
          return Promise.all(Object.keys(templateData === null || templateData === void 0 ? void 0 : templateData["arguments"]).map( /*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee8(argumentLabel) {
              var _templateData$argumen, _templateData$argumen2, _templateData$argumen3, _templateData$argumen4;
              return _regeneratorRuntime__default["default"]().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return genHash(argumentLabel);
                  case 2:
                    _context8.t0 = _context8.sent;
                    _context8.next = 5;
                    return genHash(String(templateData === null || templateData === void 0 ? void 0 : (_templateData$argumen = templateData["arguments"]) === null || _templateData$argumen === void 0 ? void 0 : _templateData$argumen[argumentLabel].index));
                  case 5:
                    _context8.t1 = _context8.sent;
                    _context8.next = 8;
                    return genHash(templateData === null || templateData === void 0 ? void 0 : (_templateData$argumen2 = templateData["arguments"]) === null || _templateData$argumen2 === void 0 ? void 0 : _templateData$argumen2[argumentLabel].type);
                  case 8:
                    _context8.t2 = _context8.sent;
                    _context8.next = 11;
                    return genHash((templateData === null || templateData === void 0 ? void 0 : (_templateData$argumen3 = templateData["arguments"]) === null || _templateData$argumen3 === void 0 ? void 0 : _templateData$argumen3[argumentLabel].balance) || "");
                  case 11:
                    _context8.t3 = _context8.sent;
                    _context8.next = 14;
                    return Promise.all(Object.keys(templateData === null || templateData === void 0 ? void 0 : (_templateData$argumen4 = templateData["arguments"]) === null || _templateData$argumen4 === void 0 ? void 0 : _templateData$argumen4[argumentLabel].messages).map( /*#__PURE__*/function () {
                      var _ref8 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee7(argumentMessageKey) {
                        var _templateData$argumen5, _templateData$argumen6;
                        return _regeneratorRuntime__default["default"]().wrap(function _callee7$(_context7) {
                          while (1) switch (_context7.prev = _context7.next) {
                            case 0:
                              _context7.next = 2;
                              return genHash(argumentMessageKey);
                            case 2:
                              _context7.t0 = _context7.sent;
                              _context7.next = 5;
                              return Promise.all(Object.keys(templateData === null || templateData === void 0 ? void 0 : (_templateData$argumen5 = templateData["arguments"]) === null || _templateData$argumen5 === void 0 ? void 0 : (_templateData$argumen6 = _templateData$argumen5[argumentLabel].messages) === null || _templateData$argumen6 === void 0 ? void 0 : _templateData$argumen6[argumentMessageKey].i18n).map( /*#__PURE__*/function () {
                                var _ref9 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee6(i18nkeylanguage) {
                                  var _templateData$argumen7, _templateData$argumen8, _templateData$argumen9;
                                  return _regeneratorRuntime__default["default"]().wrap(function _callee6$(_context6) {
                                    while (1) switch (_context6.prev = _context6.next) {
                                      case 0:
                                        _context6.next = 2;
                                        return genHash(i18nkeylanguage);
                                      case 2:
                                        _context6.t0 = _context6.sent;
                                        _context6.next = 5;
                                        return genHash(templateData === null || templateData === void 0 ? void 0 : (_templateData$argumen7 = templateData["arguments"]) === null || _templateData$argumen7 === void 0 ? void 0 : (_templateData$argumen8 = _templateData$argumen7[argumentLabel].messages) === null || _templateData$argumen8 === void 0 ? void 0 : (_templateData$argumen9 = _templateData$argumen8[argumentMessageKey].i18n) === null || _templateData$argumen9 === void 0 ? void 0 : _templateData$argumen9[i18nkeylanguage]);
                                      case 5:
                                        _context6.t1 = _context6.sent;
                                        return _context6.abrupt("return", [_context6.t0, _context6.t1]);
                                      case 7:
                                      case "end":
                                        return _context6.stop();
                                    }
                                  }, _callee6);
                                }));
                                return function (_x9) {
                                  return _ref9.apply(this, arguments);
                                };
                              }()));
                            case 5:
                              _context7.t1 = _context7.sent;
                              return _context7.abrupt("return", [_context7.t0, _context7.t1]);
                            case 7:
                            case "end":
                              return _context7.stop();
                          }
                        }, _callee7);
                      }));
                      return function (_x8) {
                        return _ref8.apply(this, arguments);
                      };
                    }()));
                  case 14:
                    _context8.t4 = _context8.sent;
                    _context8.t5 = [_context8.t1, _context8.t2, _context8.t3, _context8.t4];
                    return _context8.abrupt("return", [_context8.t0, _context8.t5]);
                  case 17:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return function (_x7) {
              return _ref7.apply(this, arguments);
            };
          }()));
        case 17:
          _arguments = _context9.sent;
          _context9.t1 = rlp.encode;
          _context9.next = 21;
          return genHash("InteractionTemplate");
        case 21:
          _context9.t2 = _context9.sent;
          _context9.next = 24;
          return genHash("1.0.0");
        case 24:
          _context9.t3 = _context9.sent;
          _context9.next = 27;
          return genHash(templateData === null || templateData === void 0 ? void 0 : templateData.type);
        case 27:
          _context9.t4 = _context9.sent;
          _context9.next = 30;
          return genHash(templateData === null || templateData === void 0 ? void 0 : templateData["interface"]);
        case 30:
          _context9.t5 = _context9.sent;
          _context9.t6 = messages;
          _context9.next = 34;
          return genHash(templateData === null || templateData === void 0 ? void 0 : templateData.cadence);
        case 34:
          _context9.t7 = _context9.sent;
          _context9.t8 = dependencies;
          _context9.t9 = _arguments;
          _context9.t10 = [_context9.t2, _context9.t3, _context9.t4, _context9.t5, _context9.t6, _context9.t7, _context9.t8, _context9.t9];
          encodedHex = (0, _context9.t1)(_context9.t10).toString("hex");
          return _context9.abrupt("return", genHash(encodedHex));
        case 40:
          throw new Error("generateTemplateId Error: Unsupported template version");
        case 41:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _generateTemplateId.apply(this, arguments);
}

function getInteractionTemplateAudits(_x) {
  return _getInteractionTemplateAudits.apply(this, arguments);
}
function _getInteractionTemplateAudits() {
  _getInteractionTemplateAudits = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(_ref) {
    var template,
      auditors,
      opts,
      recomputedTemplateID,
      _auditors,
      FlowInteractionAuditContract,
      fclNetwork,
      audits,
      _args = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          template = _ref.template, auditors = _ref.auditors;
          opts = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          sdk.invariant(template != undefined, "getInteractionTemplateAudits({ template }) -- template must be defined");
          template = normalizeInteractionTemplate(template);
          sdk.invariant(template.f_type === "InteractionTemplate", "getInteractionTemplateAudits({ template }) -- template must be an InteractionTemplate");

          // Recompute ID to be sure it matches
          _context.next = 7;
          return generateTemplateId({
            template: template
          });
        case 7:
          recomputedTemplateID = _context.sent;
          if (!(recomputedTemplateID !== template.id)) {
            _context.next = 11;
            break;
          }
          utilLogger.log({
            title: "getInteractionTemplateAudits Debug Error",
            message: "Could not recompute and match template ID\n                computed: ".concat(recomputedTemplateID, "\n                template: ").concat(template.id, "\n            "),
            level: utilLogger.LEVELS.debug
          });
          throw new Error("getInteractionTemplateAudits Error: Could not recompute and match template ID");
        case 11:
          _context.t0 = template.f_version;
          _context.next = _context.t0 === "1.0.0" ? 14 : 33;
          break;
        case 14:
          _context.t1 = auditors;
          if (_context.t1) {
            _context.next = 19;
            break;
          }
          _context.next = 18;
          return sdk.config().get("flow.auditors");
        case 18:
          _context.t1 = _context.sent;
        case 19:
          _auditors = _context.t1;
          sdk.invariant(_auditors, "getInteractionTemplateAudits Error: Required configuration for 'fcl.auditors' is not set");
          sdk.invariant(Array.isArray(_auditors), "getInteractionTemplateAudits Error: Required configuration for 'fcl.auditors' is not an array");
          FlowInteractionAuditContract = opts.flowInteractionAuditContract;
          if (FlowInteractionAuditContract) {
            _context.next = 29;
            break;
          }
          _context.next = 26;
          return getChainId();
        case 26:
          fclNetwork = _context.sent;
          sdk.invariant(fclNetwork === "mainnet" || fclNetwork === "testnet", "getInteractionTemplateAudits Error: Unable to determine address for FlowInteractionTemplateAudit contract. Set configuration for 'fcl.network' to 'mainnet' or 'testnet'");
          if (fclNetwork === "mainnet") {
            FlowInteractionAuditContract = "0xfd100e39d50a13e6";
          } else {
            FlowInteractionAuditContract = "0xf78bfc12d0a786dc";
          }
        case 29:
          _context.next = 31;
          return query({
            cadence: "\n        import FlowInteractionTemplateAudit from ".concat(FlowInteractionAuditContract, "\n        pub fun main(templateId: String, auditors: [Address]): {Address:Bool} {\n          return FlowInteractionTemplateAudit.getHasTemplateBeenAuditedByAuditors(templateId: templateId, auditors: auditors)\n        }\n        "),
            args: function args(arg, t) {
              return [arg(recomputedTemplateID, t.String), arg(_auditors, t.Array(t.Address))];
            }
          });
        case 31:
          audits = _context.sent;
          return _context.abrupt("return", audits);
        case 33:
          throw new Error("getInteractionTemplateAudits Error: Unsupported template version");
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getInteractionTemplateAudits.apply(this, arguments);
}

function generateImport(_ref) {
  var contractName = _ref.contractName,
    address = _ref.address;
  return {
    contractName: contractName,
    address: address,
    contract: ""
  };
}

function findImports(cadence) {
  var imports = [];
  var importsReg = /import ((\w|,| )+)* from 0x\w+/g;
  var fileImports = cadence.match(importsReg) || [];
  var _iterator = _createForOfIteratorHelper__default["default"](fileImports),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var fileImport = _step.value;
      var importLineReg = /import ((\w+|, |)*) from (0x\w+)/g;
      var importLine = importLineReg.exec(fileImport);
      var contractsReg = /((?:\w+)+),?/g;
      var contracts = importLine[1].match(contractsReg) || [];
      var _iterator2 = _createForOfIteratorHelper__default["default"](contracts),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var contract = _step2.value;
          imports.push(generateImport({
            address: importLine[3],
            contractName: contract.replace(/,/g, "")
          }));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return imports;
}

function generateDependencyPin(_x) {
  return _generateDependencyPin.apply(this, arguments);
}
function _generateDependencyPin() {
  _generateDependencyPin = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(_ref) {
    var address,
      contractName,
      blockHeight,
      opts,
      horizon,
      _i,
      _horizon,
      _account$contracts,
      horizonImport,
      account,
      contractImports,
      contractHashes,
      contractHashesJoined,
      _args = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          address = _ref.address, contractName = _ref.contractName, blockHeight = _ref.blockHeight;
          opts = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          sdk.invariant(address != undefined, "generateDependencyPin({ address }) -- address must be defined");
          sdk.invariant(contractName != undefined, "generateDependencyPin({ contractName }) -- contractName must be defined");
          sdk.invariant(blockHeight != undefined, "generateDependencyPin({ blockHeight }) -- blockHeight must be defined");
          sdk.invariant(typeof address === "string", "generateDependencyPin({ address }) -- address must be a string");
          sdk.invariant(typeof contractName === "string", "generateDependencyPin({ contractName }) -- contractName must be a string");
          sdk.invariant(typeof blockHeight === "number", "generateDependencyPin({ blockHeight }) -- blockHeight must be a number");
          horizon = [generateImport({
            contractName: contractName,
            address: address
          })];
          _i = 0, _horizon = horizon;
        case 10:
          if (!(_i < _horizon.length)) {
            _context.next = 33;
            break;
          }
          horizonImport = _horizon[_i];
          _context.t0 = sdk.send;
          _context.t1 = sdk.getAccount;
          _context.next = 16;
          return sdk.config().get(horizonImport.address, horizonImport.address);
        case 16:
          _context.t2 = _context.sent;
          _context.t3 = (0, _context.t1)(_context.t2);
          _context.t4 = sdk.atBlockHeight(blockHeight);
          _context.t5 = [_context.t3, _context.t4];
          _context.t6 = opts;
          _context.next = 23;
          return (0, _context.t0)(_context.t5, _context.t6).then(sdk.decode);
        case 23:
          account = _context.sent;
          horizonImport.contract = (_account$contracts = account.contracts) === null || _account$contracts === void 0 ? void 0 : _account$contracts[horizonImport.contractName];
          if (horizonImport.contract) {
            _context.next = 28;
            break;
          }
          console.error("Did not find expected contract", horizonImport, account);
          throw new Error("Did not find expected contract");
        case 28:
          contractImports = findImports(horizonImport.contract);
          horizon.push.apply(horizon, _toConsumableArray__default["default"](contractImports));
        case 30:
          _i++;
          _context.next = 10;
          break;
        case 33:
          contractHashes = horizon.map(function (iport) {
            return genHash(iport.contract);
          });
          contractHashesJoined = contractHashes.join("");
          return _context.abrupt("return", genHash(contractHashesJoined));
        case 36:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _generateDependencyPin.apply(this, arguments);
}
function generateDependencyPinAtLatestSealedBlock(_x2) {
  return _generateDependencyPinAtLatestSealedBlock.apply(this, arguments);
}
function _generateDependencyPinAtLatestSealedBlock() {
  _generateDependencyPinAtLatestSealedBlock = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(_ref2) {
    var address,
      contractName,
      opts,
      latestSealedBlock,
      latestSealedBlockHeight,
      _args2 = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          address = _ref2.address, contractName = _ref2.contractName;
          opts = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          _context2.next = 4;
          return sdk.block({
            sealed: true
          }, opts);
        case 4:
          latestSealedBlock = _context2.sent;
          latestSealedBlockHeight = latestSealedBlock === null || latestSealedBlock === void 0 ? void 0 : latestSealedBlock.height;
          return _context2.abrupt("return", generateDependencyPin({
            address: address,
            contractName: contractName,
            blockHeight: latestSealedBlockHeight
          }, opts));
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _generateDependencyPinAtLatestSealedBlock.apply(this, arguments);
}

function normalizeInteractionTemplateInterface(templateInterface) {
  if (templateInterface == null) return null;
  switch (templateInterface["f_version"]) {
    case "1.0.0":
      return templateInterface;
    default:
      throw new Error("normalizeInteractionTemplateInterface Error: Invalid InteractionTemplateInterface");
  }
}

function generateTemplateInterfaceId(_x) {
  return _generateTemplateInterfaceId.apply(this, arguments);
}
function _generateTemplateInterfaceId() {
  _generateTemplateInterfaceId = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(_ref) {
    var templateInterface, interfaceData, encodedHex;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          templateInterface = _ref.templateInterface;
          sdk.invariant(templateInterface != undefined, "generateTemplateInterfaceId({ templateInterface }) -- templateInterface must be defined");
          sdk.invariant(_typeof__default["default"](templateInterface) === "object", "generateTemplateInterfaceId({ templateInterface }) -- templateInterface must be an object");
          sdk.invariant(typeof templateInterface.f_type === "InteractionTemplateInterface", "generateTemplateInterfaceId({ templateInterface }) -- templateInterface object must be an InteractionTemplate");
          templateInterface = normalizeInteractionTemplateInterface(templateInterface);
          _context2.t0 = templateInterface.f_version;
          _context2.next = _context2.t0 === "1.0.0" ? 8 : 25;
          break;
        case 8:
          interfaceData = templateInterface.data;
          _context2.t1 = rlp.encode;
          _context2.next = 12;
          return genHash("InteractionTemplateInterface");
        case 12:
          _context2.t2 = _context2.sent;
          _context2.next = 15;
          return genHash("1.0.0");
        case 15:
          _context2.t3 = _context2.sent;
          _context2.next = 18;
          return genHash(interfaceData.flip);
        case 18:
          _context2.t4 = _context2.sent;
          _context2.next = 21;
          return Promise.all(Object.keys(interfaceData.arguments).map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(argumentLabel) {
              return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return genHash(argumentLabel);
                  case 2:
                    _context.t0 = _context.sent;
                    _context.next = 5;
                    return genHash(String(interfaceData.arguments[argumentLabel].index));
                  case 5:
                    _context.t1 = _context.sent;
                    _context.next = 8;
                    return genHash(interfaceData.arguments[argumentLabel].type);
                  case 8:
                    _context.t2 = _context.sent;
                    return _context.abrupt("return", [_context.t0, _context.t1, _context.t2]);
                  case 10:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 21:
          _context2.t5 = _context2.sent;
          _context2.t6 = [_context2.t2, _context2.t3, _context2.t4, _context2.t5];
          encodedHex = (0, _context2.t1)(_context2.t6).toString("hex");
          return _context2.abrupt("return", genHash(encodedHex));
        case 25:
          throw new Error("generateTemplateInterfaceId Error: Unsupported templateInterface version");
        case 26:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _generateTemplateInterfaceId.apply(this, arguments);
}

function verifyDependencyPinsSame(_x) {
  return _verifyDependencyPinsSame.apply(this, arguments);
}
function _verifyDependencyPinsSame() {
  _verifyDependencyPinsSame = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee(_ref) {
    var template,
      blockHeight,
      network,
      opts,
      templateDependenciesPlaceholderKeys,
      _i,
      _templateDependencies,
      templateDependencyPlaceholderKey,
      templateDependencyPlaceholder,
      templateDependencyPlaceholderContractNames,
      _i2,
      _templateDependencyPl,
      templateDependencyPlaceholderContractName,
      templateDependencyPlaceholderContractNetworks,
      templateDependency,
      pin,
      _args = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          template = _ref.template, blockHeight = _ref.blockHeight, network = _ref.network;
          opts = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          sdk.invariant(template != undefined, "generateDependencyPin({ template }) -- template must be defined");
          sdk.invariant(_typeof__default["default"](template) === "object", "generateDependencyPin({ template }) -- template must be an object");
          sdk.invariant(template.f_type === "InteractionTemplate", "generateDependencyPin({ template }) -- template must be an InteractionTemplate");
          template = normalizeInteractionTemplate(template);
          sdk.invariant(network != undefined, "generateDependencyPin({ network }) network must be defined");
          sdk.invariant(blockHeight != undefined, "generateDependencyPin({ blockHeight }) blockHeight must be defined");
          sdk.invariant(typeof blockHeight === "number", "generateDependencyPin({ blockHeight }) blockHeight must be a number");
          _context.t0 = template.f_version;
          _context.next = _context.t0 === "1.0.0" ? 12 : 38;
          break;
        case 12:
          templateDependenciesPlaceholderKeys = Object.keys(template.data.dependencies);
          _i = 0, _templateDependencies = templateDependenciesPlaceholderKeys;
        case 14:
          if (!(_i < _templateDependencies.length)) {
            _context.next = 37;
            break;
          }
          templateDependencyPlaceholderKey = _templateDependencies[_i];
          templateDependencyPlaceholder = template.data.dependencies[templateDependencyPlaceholderKey];
          templateDependencyPlaceholderContractNames = Object.keys(templateDependencyPlaceholder);
          _i2 = 0, _templateDependencyPl = templateDependencyPlaceholderContractNames;
        case 19:
          if (!(_i2 < _templateDependencyPl.length)) {
            _context.next = 34;
            break;
          }
          templateDependencyPlaceholderContractName = _templateDependencyPl[_i2];
          templateDependencyPlaceholderContractNetworks = template.data.dependencies[templateDependencyPlaceholderKey][templateDependencyPlaceholderContractName];
          templateDependency = templateDependencyPlaceholderContractNetworks[network];
          if (!(typeof templateDependency === "undefined")) {
            _context.next = 25;
            break;
          }
          return _context.abrupt("continue", 31);
        case 25:
          _context.next = 27;
          return generateDependencyPin({
            address: templateDependency.address,
            contractName: templateDependency.contract,
            blockHeight: blockHeight
          }, opts);
        case 27:
          pin = _context.sent;
          if (!(pin !== templateDependency.pin)) {
            _context.next = 31;
            break;
          }
          utilLogger.log({
            title: "verifyDependencyPinsSame Debug Error",
            message: "Could not recompute and match dependency pin.\n                                address: ".concat(templateDependency.address, " | contract: ").concat(templateDependency.contract, "\n                                computed: ").concat(pin, "\n                                template: ").concat(templateDependency.pin, "\n                            "),
            level: utilLogger.LEVELS.debug
          });
          return _context.abrupt("return", false);
        case 31:
          _i2++;
          _context.next = 19;
          break;
        case 34:
          _i++;
          _context.next = 14;
          break;
        case 37:
          return _context.abrupt("return", true);
        case 38:
          throw new Error("verifyDependencyPinsSame Error: Unsupported template version");
        case 39:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _verifyDependencyPinsSame.apply(this, arguments);
}
function verifyDependencyPinsSameAtLatestSealedBlock(_x2) {
  return _verifyDependencyPinsSameAtLatestSealedBlock.apply(this, arguments);
}
function _verifyDependencyPinsSameAtLatestSealedBlock() {
  _verifyDependencyPinsSameAtLatestSealedBlock = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"]().mark(function _callee2(_ref2) {
    var template,
      network,
      opts,
      latestSealedBlock,
      latestSealedBlockHeight,
      _args2 = arguments;
    return _regeneratorRuntime__default["default"]().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          template = _ref2.template, network = _ref2.network;
          opts = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          _context2.next = 4;
          return sdk.block({
            sealed: true
          });
        case 4:
          latestSealedBlock = _context2.sent;
          latestSealedBlockHeight = latestSealedBlock === null || latestSealedBlock === void 0 ? void 0 : latestSealedBlock.height;
          return _context2.abrupt("return", verifyDependencyPinsSame({
            template: template,
            network: network,
            blockHeight: latestSealedBlockHeight
          }, opts));
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _verifyDependencyPinsSameAtLatestSealedBlock.apply(this, arguments);
}

function getTemplateMessage(_ref) {
  var _template$data, _messages$messageKey, _messages$messageKey$;
  var _ref$localization = _ref.localization,
    localization = _ref$localization === void 0 ? "en-US" : _ref$localization,
    messageKey = _ref.messageKey,
    template = _ref.template;
  sdk.invariant(messageKey, "getTemplateMessage({ messageKey }) -- messageKey must be defined");
  sdk.invariant(typeof messageKey === "string", "getTemplateMessage({ messageKey }) -- messageKey must be a string");
  sdk.invariant(localization, "getTemplateMessage({ localization }) -- localization must be defined");
  sdk.invariant(typeof localization === "string", "getTemplateMessage({ localization }) -- localization must be a string");
  sdk.invariant(template != undefined, "getTemplateMessage({ template }) -- template must be defined");
  sdk.invariant(_typeof__default["default"](template) === "object", "getTemplateMessage({ template }) -- template must be an object");
  sdk.invariant(typeof template.f_type === "InteractionTemplate", "getTemplateMessage({ template }) -- template object must be an InteractionTemplate");
  var messages = template === null || template === void 0 ? void 0 : (_template$data = template.data) === null || _template$data === void 0 ? void 0 : _template$data.messages;
  return messages === null || messages === void 0 ? void 0 : (_messages$messageKey = messages[messageKey]) === null || _messages$messageKey === void 0 ? void 0 : (_messages$messageKey$ = _messages$messageKey.i18n) === null || _messages$messageKey$ === void 0 ? void 0 : _messages$messageKey$[localization];
}

function getTemplateArgumentMessage(_ref) {
  var _template$data, _args$argumentLabel, _args$argumentLabel$m, _args$argumentLabel$m2, _args$argumentLabel$m3;
  var _ref$localization = _ref.localization,
    localization = _ref$localization === void 0 ? "en-US" : _ref$localization,
    argumentLabel = _ref.argumentLabel,
    messageKey = _ref.messageKey,
    template = _ref.template;
  sdk.invariant(messageKey, "getTemplateArgumentMessage({ messageKey }) -- messageKey must be defined");
  sdk.invariant(typeof messageKey === "string", "getTemplateArgumentMessage({ messageKey }) -- messageKey must be a string");
  sdk.invariant(argumentLabel, "getTemplateArgumentMessage({ argumentLabel }) -- argumentLabel must be defined");
  sdk.invariant(typeof messageKey === "string", "getTemplateArgumentMessage({ argumentLabel }) -- argumentLabel must be a string");
  sdk.invariant(localization, "getTemplateArgumentMessage({ localization }) -- localization must be defined");
  sdk.invariant(typeof localization === "string", "getTemplateArgumentMessage({ localization }) -- localization must be a string");
  sdk.invariant(template != undefined, "getTemplateArgumentMessage({ template }) -- template must be defined");
  sdk.invariant(_typeof__default["default"](template) === "object", "getTemplateArgumentMessage({ template }) -- template must be an object");
  sdk.invariant(typeof template.f_type === "InteractionTemplate", "getTemplateArgumentMessage({ template }) -- template object must be an InteractionTemplate");
  var args = template === null || template === void 0 ? void 0 : (_template$data = template.data) === null || _template$data === void 0 ? void 0 : _template$data.arguments;
  return args === null || args === void 0 ? void 0 : (_args$argumentLabel = args[argumentLabel]) === null || _args$argumentLabel === void 0 ? void 0 : (_args$argumentLabel$m = _args$argumentLabel.messages) === null || _args$argumentLabel$m === void 0 ? void 0 : (_args$argumentLabel$m2 = _args$argumentLabel$m[messageKey]) === null || _args$argumentLabel$m2 === void 0 ? void 0 : (_args$argumentLabel$m3 = _args$argumentLabel$m2.i18n) === null || _args$argumentLabel$m3 === void 0 ? void 0 : _args$argumentLabel$m3[localization];
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getInteractionTemplateAudits: getInteractionTemplateAudits,
  generateDependencyPin: generateDependencyPin,
  generateDependencyPinAtLatestSealedBlock: generateDependencyPinAtLatestSealedBlock,
  generateTemplateId: generateTemplateId,
  generateTemplateInterfaceId: generateTemplateInterfaceId,
  verifyDependencyPinsSame: verifyDependencyPinsSame,
  verifyDependencyPinsSameAtLatestSealedBlock: verifyDependencyPinsSameAtLatestSealedBlock,
  deriveCadenceByNetwork: deriveCadenceByNetwork,
  getTemplateMessage: getTemplateMessage,
  getTemplateArgumentMessage: getTemplateArgumentMessage
});

var authenticate = function authenticate() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return currentUser().authenticate(opts);
};
var unauthenticate = function unauthenticate() {
  return currentUser().unauthenticate();
};
var reauthenticate = function reauthenticate() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  currentUser().unauthenticate();
  return currentUser().authenticate(opts);
};
var signUp = function signUp() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return currentUser().authenticate(opts);
};
var logIn = function logIn() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return currentUser().authenticate(opts);
};
var getStrategyData = function getStrategyData() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return currentUser().getStrategyData(opts);
};
var authz = currentUser().authorization;
var t = t__namespace;

Object.defineProperty(exports, 'config', {
  enumerable: true,
  get: function () { return config.config; }
});
Object.defineProperty(exports, 'TestUtils', {
  enumerable: true,
  get: function () { return sdk.TestUtils; }
});
Object.defineProperty(exports, 'account', {
  enumerable: true,
  get: function () { return sdk.account; }
});
Object.defineProperty(exports, 'arg', {
  enumerable: true,
  get: function () { return sdk.arg; }
});
Object.defineProperty(exports, 'args', {
  enumerable: true,
  get: function () { return sdk.args; }
});
Object.defineProperty(exports, 'atBlockHeight', {
  enumerable: true,
  get: function () { return sdk.atBlockHeight; }
});
Object.defineProperty(exports, 'atBlockId', {
  enumerable: true,
  get: function () { return sdk.atBlockId; }
});
Object.defineProperty(exports, 'authorization', {
  enumerable: true,
  get: function () { return sdk.authorization; }
});
Object.defineProperty(exports, 'authorizations', {
  enumerable: true,
  get: function () { return sdk.authorizations; }
});
Object.defineProperty(exports, 'block', {
  enumerable: true,
  get: function () { return sdk.block; }
});
Object.defineProperty(exports, 'build', {
  enumerable: true,
  get: function () { return sdk.build; }
});
Object.defineProperty(exports, 'createSignableVoucher', {
  enumerable: true,
  get: function () { return sdk.createSignableVoucher; }
});
Object.defineProperty(exports, 'decode', {
  enumerable: true,
  get: function () { return sdk.decode; }
});
Object.defineProperty(exports, 'getAccount', {
  enumerable: true,
  get: function () { return sdk.getAccount; }
});
Object.defineProperty(exports, 'getBlock', {
  enumerable: true,
  get: function () { return sdk.getBlock; }
});
Object.defineProperty(exports, 'getBlockHeader', {
  enumerable: true,
  get: function () { return sdk.getBlockHeader; }
});
Object.defineProperty(exports, 'getCollection', {
  enumerable: true,
  get: function () { return sdk.getCollection; }
});
Object.defineProperty(exports, 'getEvents', {
  enumerable: true,
  get: function () { return sdk.getEvents; }
});
Object.defineProperty(exports, 'getEventsAtBlockHeightRange', {
  enumerable: true,
  get: function () { return sdk.getEventsAtBlockHeightRange; }
});
Object.defineProperty(exports, 'getEventsAtBlockIds', {
  enumerable: true,
  get: function () { return sdk.getEventsAtBlockIds; }
});
Object.defineProperty(exports, 'getNetworkParameters', {
  enumerable: true,
  get: function () { return sdk.getNetworkParameters; }
});
Object.defineProperty(exports, 'getTransaction', {
  enumerable: true,
  get: function () { return sdk.getTransaction; }
});
Object.defineProperty(exports, 'getTransactionStatus', {
  enumerable: true,
  get: function () { return sdk.getTransactionStatus; }
});
Object.defineProperty(exports, 'invariant', {
  enumerable: true,
  get: function () { return sdk.invariant; }
});
Object.defineProperty(exports, 'isBad', {
  enumerable: true,
  get: function () { return sdk.isBad; }
});
Object.defineProperty(exports, 'isOk', {
  enumerable: true,
  get: function () { return sdk.isOk; }
});
Object.defineProperty(exports, 'limit', {
  enumerable: true,
  get: function () { return sdk.limit; }
});
Object.defineProperty(exports, 'param', {
  enumerable: true,
  get: function () { return sdk.param; }
});
Object.defineProperty(exports, 'params', {
  enumerable: true,
  get: function () { return sdk.params; }
});
Object.defineProperty(exports, 'payer', {
  enumerable: true,
  get: function () { return sdk.payer; }
});
Object.defineProperty(exports, 'ping', {
  enumerable: true,
  get: function () { return sdk.ping; }
});
Object.defineProperty(exports, 'pipe', {
  enumerable: true,
  get: function () { return sdk.pipe; }
});
Object.defineProperty(exports, 'proposer', {
  enumerable: true,
  get: function () { return sdk.proposer; }
});
Object.defineProperty(exports, 'ref', {
  enumerable: true,
  get: function () { return sdk.ref; }
});
Object.defineProperty(exports, 'script', {
  enumerable: true,
  get: function () { return sdk.script; }
});
Object.defineProperty(exports, 'send', {
  enumerable: true,
  get: function () { return sdk.send; }
});
Object.defineProperty(exports, 'transaction', {
  enumerable: true,
  get: function () { return sdk.transaction; }
});
Object.defineProperty(exports, 'validator', {
  enumerable: true,
  get: function () { return sdk.validator; }
});
Object.defineProperty(exports, 'voucherIntercept', {
  enumerable: true,
  get: function () { return sdk.voucherIntercept; }
});
Object.defineProperty(exports, 'voucherToTxId', {
  enumerable: true,
  get: function () { return sdk.voucherToTxId; }
});
Object.defineProperty(exports, 'why', {
  enumerable: true,
  get: function () { return sdk.why; }
});
Object.defineProperty(exports, 'display', {
  enumerable: true,
  get: function () { return utilAddress.display; }
});
Object.defineProperty(exports, 'sansPrefix', {
  enumerable: true,
  get: function () { return utilAddress.sansPrefix; }
});
Object.defineProperty(exports, 'withPrefix', {
  enumerable: true,
  get: function () { return utilAddress.withPrefix; }
});
Object.defineProperty(exports, 'cadence', {
  enumerable: true,
  get: function () { return utilTemplate.template; }
});
Object.defineProperty(exports, 'cdc', {
  enumerable: true,
  get: function () { return utilTemplate.template; }
});
exports.AppUtils = index$1;
exports.InteractionTemplateUtils = index;
exports.VERSION = VERSION;
exports.WalletUtils = index$2;
exports.authenticate = authenticate;
exports.authz = authz;
exports.currentUser = currentUser;
exports.discovery = discovery;
exports.events = events;
exports.getChainId = getChainId;
exports.getStrategyData = getStrategyData;
exports.logIn = logIn;
exports.mutate = mutate;
exports.pluginRegistry = pluginRegistry;
exports.query = query;
exports.reauthenticate = reauthenticate;
exports.serialize = serialize;
exports.signUp = signUp;
exports.t = t;
exports.tx = transaction;
exports.unauthenticate = unauthenticate;
exports.verifyUserSignatures = verifyUserSignatures;
//# sourceMappingURL=fcl.js.map
