import {NodeItem, NodeTypes} from "../models/node-item";
import {UserId} from "../models/User";
import {randomNum, randomStr} from "../util/app-util";

const nodeItemToChild = (nodeItem: NodeItem) => ({
  ...nodeItem,
  children: nodeItem.children.map(child => (child as NodeItem).id)
})

const schemaNodeItems: NodeItem[] = [
  {
    id: '1333',
    name: 'first schema',
    type: NodeTypes.SCHEMA,
    children: [],
    isRoot: false,
    allowedUsers: ['1'],
    hasChildren: true
  }, {
    id: '1332',
    name: 'second schema',
    type: NodeTypes.SCHEMA,
    children: [],
    isRoot: false,
    allowedUsers: ['1'],
    hasChildren: true
  }
]

const dbNodeItems: NodeItem[] = [
  {
    id: '111',
    name: 'first db',
    type: NodeTypes.DB,
    children: [
      schemaNodeItems[0]
    ],
    isRoot: false,
    allowedUsers: ['1', '2', '6'],
    hasChildren: true
  },
  {
    id: '12',
    name: 'second db',
    type: NodeTypes.DB,
    children: [
      schemaNodeItems[1]
    ],
    isRoot: false,
    allowedUsers: ['1', '2', '6'],
    hasChildren: true
  }, {
    id: '11',
    name: 'first db',
    type: NodeTypes.DB,
    children: [],
    isRoot: false,
    allowedUsers: ['3'],
    hasChildren: true
  }, {
    id: '13',
    name: 'third db',
    type: NodeTypes.DB,
    children: [],
    isRoot: false,
    allowedUsers: ['6'],
    hasChildren: true
  },
]

const dbCOnnNodes: NodeItem[] = [
  {
    id: '1',
    name: 'first db conn',
    type: NodeTypes.DB_CONN,
    children: [
      nodeItemToChild(dbNodeItems[0]),
      nodeItemToChild(dbNodeItems[1]),
    ],
    isRoot: true,
    allowedUsers: ['1', '2', '6'],
    hasChildren: true
  },
  {
    id: '2',
    name: 'second db conn',
    type: NodeTypes.DB_CONN,
    children: [
      nodeItemToChild(dbNodeItems[2]),
      nodeItemToChild(dbNodeItems[3])
    ],
    isRoot: true,
    allowedUsers: ['1', '6'],
    hasChildren: true
  },
  {
    id: '3',
    name: 'third db conn',
    type: NodeTypes.DB_CONN,
    children: [],
    isRoot: true,
    allowedUsers: ['1', '6'],
    hasChildren: true
  }
];

const nodesMap: Record<NodeTypes, NodeItem[]> = {
  [NodeTypes.DB_CONN]: [],
  [NodeTypes.DB]: [],
  [NodeTypes.SCHEMA]: [],
  [NodeTypes.TABLE]: [],
  [NodeTypes.COLUMN]: []
}

const nodeTypeOrder = [NodeTypes.DB_CONN, NodeTypes.DB, NodeTypes.SCHEMA, NodeTypes.TABLE, NodeTypes.COLUMN];

const ids = new Map<string, boolean>();


const fillNodeWithChildren = (nodesList: NodeItem[], nodeChildrenType: NodeTypes, nodeTypeIndex: number): NodeItem[] => {
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

const createNodeCollection = (): NodeItem[] => {
  let res: NodeItem[] = []
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

export const nodes: NodeItem[] = [
  // ...dbCOnnNodes,
  // ...dbConnNodeList as NodeItem[],
  // ...dbNodeItems,
  // ...schemaNodeItems,
  // ...createStubNodes(NodeTypes.DB_CONN)
  ...createNodeCollection()
]

function createStubNodes(nodeType: NodeTypes): NodeItem[] {
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


/**
 * auth service
 *
 * post api/auth
 *
 * body:
 *
 * @param username      {string}
 * @param password      {string}
 *
 * response:
 *
 * @param token         {JWT}
 * @param userId        {string}
 *
 *
 * nodes service
 *
 * get api/node/:id
 *
 * query param:
 *
 * @param root          {boolean}
 *
 * response:
 *
 * @param nodeId        {string}
 * @param children      {Node[] | nodeId[]}
 * @param allowedUsers  {UserId[]}
 * @param type          {NodeType: string}
 * @param isRoot        {boolean}
 *
 */
