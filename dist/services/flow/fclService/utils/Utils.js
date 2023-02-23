"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitList = void 0;
const splitList = (list, chunkSize) => {
  const groups = [];
  let currentGroup = [];
  for (let i = 0; i < list.length; i++) {
    const collectionID = list[i];
    if (currentGroup.length >= chunkSize) {
      groups.push([...currentGroup]);
      currentGroup = [];
    }
    currentGroup.push(collectionID);
  }
  groups.push([...currentGroup]);
  return groups;
};
exports.splitList = splitList;