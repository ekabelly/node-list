const fs = require('fs');


const randomNum = (min = 1, max = 30, biggerNumbers = true) => {
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
        const childrenNodeType = nodeTypeOrder[nodeTypeIndex + 2];
        nodesKeyVal[nodeChildrenType] = [
          ...nodesKeyVal[nodeChildrenType],
          ...fillNodeWithChildren(JSON.parse(JSON.stringify(children)), childrenNodeType, nodeTypeIndex + 1)
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
    rootNodes: createNodeCollection(), nodeList: createNodeListFromKeyValueObj()
  }), console.log)
}

function createNodeListFromKeyValueObj() {
  let nodeList = [];
  for (const nodeType of Object.keys(nodesKeyVal)) {
    nodeList = [
      ...nodeList,
      ...nodesKeyVal[nodeType]
    ]
  }
  return nodeList;
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
