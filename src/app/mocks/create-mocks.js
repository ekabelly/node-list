// import {randomNum, randomStr} from "../util/app-util";


const randomNum = (min = 100, max = 2000) => Math.floor(Math.random() * (max - min) + min);

const randomStr = (existingCollection, max) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < max; i++) {
    result += characters.charAt(randomNum(0, characters.length));
  }
  if (existingCollection?.has(result)) {
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

const nodesMap = {
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
      node.children = Number(nodeTypeIndex) % 2 === 0 ? children : children.map(childNode => childNode.id)
      nodesMap[nodeChildrenType] = nodeChildrenType === NodeTypes.COLUMN ?
        children : fillNodeWithChildren(children, nodeTypeOrder[Number(nodeChildrenType) - 1], nodeTypeIndex + 1);
    }
    return node;
  });
}

const createNodeCollection = () => {
  let res = []
  nodesMap[nodeTypeOrder[0]] = fillNodeWithChildren(
    createStubNodes(nodeTypeOrder[0]),
    nodeTypeOrder[Number(0) + 1],
    0
  );
  for (const nodesOfType of Object.values(nodesMap)) {
    res = [...res, ...nodesOfType];
  }
  return res;
}

const nodes = [
  // ...dbCOnnNodes,
  // ...dbConnNodeList as NodeItem[],
  // ...dbNodeItems,
  // ...schemaNodeItems,
  // ...createStubNodes(NodeTypes.DB_CONN)
  ...createNodeCollection()
]

function createStubNodes(nodeType) {
  const hasChildren = Math.random() > 0.3;
  const res = new Array(randomNum()).fill(null).map(() => ({
    id: randomStr(ids),
    name: `${nodeType}_${randomStr()}`,
    hasChildren,
    allowedUsers: ['1'],
    children: [],
    type: nodeType,
    isRoot: nodeType === NodeTypes.DB_CONN
  }));
  return res;
}

console.log(nodes);
