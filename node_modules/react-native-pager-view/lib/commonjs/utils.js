"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.childrenWithOverriddenStyle = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
const childrenWithOverriddenStyle = children => {
  return _react.Children.map(children, child => {
    const element = child;
    return (
      /*#__PURE__*/
      // Add a wrapper to ensure layout is calculated correctly
      _react.default.createElement(_reactNative.View, {
        style: _reactNative.StyleSheet.absoluteFill,
        collapsable: false
      }, /*#__PURE__*/_react.default.cloneElement(element, { ...element.props,
        // Override styles so that each page will fill the parent.
        style: [element.props.style, _reactNative.StyleSheet.absoluteFill]
      }))
    );
  });
};

exports.childrenWithOverriddenStyle = childrenWithOverriddenStyle;
//# sourceMappingURL=utils.js.map