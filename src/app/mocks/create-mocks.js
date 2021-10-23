const fs = require('fs');

// deep clone any value
const deepClone = val => JSON.parse(JSON.stringify(val));

const randomNum = (min = 1, max = 3, biggerNumbers = true) => {
  if (biggerNumbers) {
    max = Math.random() > 0.995 ? Math.ceil(Math.random() * 100) : max;
  }
  return Math.ceil(Math.random() * (max - min) + min)
};

const randomStr = (existingCollection, max = 9) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < max; i++) {
    result += characters.charAt(randomNum(0, characters.length, false));
  }
  if (existingCollection && existingCollection.has(result)) {
    return randomStr(existingCollection, max);
  }
  return result;
}

const NodeTypes = {
  DB_CONN: 'DB_CONN',
  DB: 'DB',
  SCHEMA: 'SCHEMA',
  TABLE: 'TABLE',
  COLUMN: 'COLUMN'
}

const nodesKeyVal = {
  [NodeTypes.DB_CONN]: [],
  [NodeTypes.DB]: [],
  [NodeTypes.SCHEMA]: [],
  [NodeTypes.TABLE]: [],
  [NodeTypes.COLUMN]: []
}

const nodeTypeOrder = [NodeTypes.DB_CONN, NodeTypes.DB, NodeTypes.SCHEMA, NodeTypes.TABLE, NodeTypes.COLUMN];

const ids = new Map();


const fillNodeWithChildren = (nodesList, nodeChildrenType, nodeTypeIndex) => {
  return nodesList.map(node => {
    if (node.hasChildren) {
      const children = createStubNodes(nodeChildrenType);
      node.children = children;
      if (nodeChildrenType === NodeTypes.COLUMN) {
        nodesKeyVal[nodeChildrenType] = [
          ...nodesKeyVal[nodeChildrenType],
          ...children
        ];
      } else {
        const grandchildrenNodeType = nodeTypeOrder[nodeTypeIndex + 2];
        nodesKeyVal[nodeChildrenType] = [
          ...nodesKeyVal[nodeChildrenType],
          ...fillNodeWithChildren(deepClone(children), grandchildrenNodeType, nodeTypeIndex + 1)
        ];
      }
    }
    return node;
  });
}

const createNodeCollection = () => {
  nodesKeyVal[nodeTypeOrder[0]] = fillNodeWithChildren(
    createStubNodes(nodeTypeOrder[0]),
    nodeTypeOrder[Number(0) + 1],
    0
  );
  return nodesKeyVal.DB_CONN;
}

function getAndCreateRootsNodes() {

  fs.writeFile('./node-list.mock.json', JSON.stringify({
    rootNodes: createNodeCollection(), nodeObject: createNodeListFromKeyValueObj()
  }), () => console.log('created nodes mock'));
}

function createNodeListFromKeyValueObj() {
  let nodeObject = {};
  for (const nodeType of Object.keys(nodesKeyVal)) {
    for (const nodeItem of nodesKeyVal[nodeType]) {
      nodeObject[nodeItem.id] = nodeItem;
    }
  }
  return nodeObject;
}

function createStubNodes(nodeType) {
  const min = nodeType === NodeTypes.DB_CONN ? 100 : null
  const res = new Array(randomNum(min)).fill(null).map(() => ({
    id: randomStr(ids),
    name: `${nodeType}_${randomStr()}`,
    hasChildren: nodeType !== NodeTypes.COLUMN,
    allowedUsers: ['1', ...new Array(randomNum(0, 8, false)).fill(null).map(() => randomNum(0, 8).toString())],
    children: [],
    type: nodeType,
    isRoot: nodeType === NodeTypes.DB_CONN
  }));
  return res;
}

getAndCreateRootsNodes();
