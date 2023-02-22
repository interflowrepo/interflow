export const splitList = (list, chunkSize) => {
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
